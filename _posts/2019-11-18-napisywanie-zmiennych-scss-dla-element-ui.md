---
layout: post
title: Nadpisywanie scss dla Elements UI
date: 2019-11-18 11:39
category: ["scss", "vue", "js"]
author: Edyta Jozdowska
tags: ["scss", "vue", "npm", "frontend", "js", "javascript"]
excerpt: Nadpisywanie zmiennych zdkelarowanych w Elements UI dla Vue i import styli tylko pojedynczych komponentów.
---

Pisząc ostatni projekt zdecydowałam się na użycie gotowego już komponentu dla Vue [Elements UI](https://element.eleme.io/#/en-US).
Jest on bardzo wygodny do szybkiego zrobienia app z wykorzystaniem już napisanych komponentów i stylów. _Ma jednak poważną wadę_. Zresztą dotyczy to większości zpredefiniowanych elementów.

Według dokumenatcji powinniśmy zaimplementować style Element UI w naszym projekcie poprzez:

```js
//NIE DODAWAJ TEJ LINII
import "element-ui/lib/theme-chalk/index.css";
```

Importujemy więc do naszego projektu już skompilowane style z `.scss` do `.css`. Nadpisywanie tak zaimplementowanego pliku jest dość pracochłonne. By wprowadzić poważniejsze zmiany, musimy nadpisać styl elementów zwykłym kodem `css`.
Co więc możemy zrobić innego?

Pierwsza i naważniejsza rzecz - **NIE DODAWAĆ** do naszego projektu całego `index.css`, tak jak podają w instrukcji. **Zamiast tego** możemy ułożyć własny import, w dodatku tylko z tymi stylami, jakich komponentów używamy. Własna implementacja będzie miała wpływ na zmniejszenie wielkości importowanych plików, co uważam za plus.

Z całego Element UI korzystam we wspomnianym na wstępie projekcie jedynie z **column, card, button, messageBox, alert, dialog** i jedynie te style chciałabym zaimplementować - (optymalizacja zawsze na pierwszym miejscu).

W dodatku chciałabym zmienić `breakpoints` (punkty łamania układu i zachowywania elementów, w zależności od wielkości urządzenia, na jakim są wyświetlane) dla mojej app. No kto widział aby xs ustawiać na wartość **768px**.

Po krótkim researchu w necie, wielu próbach, w końcu się udało. Należało zrobić mniej więcej tak:

## Trochę teori scss i budowy package'a Element UI

Jak to w node wszystkie package z jakich korzysta nasz projekt znajdziemy w folderze `node_modules`. Każdy, kto miał choć chwilę styczności z Node i npm o tym wie.

W tym folderze też znajdziemy `src` dla Element UI. Bezpośrednia ścieżka to: `node_modules\element-ui\packages\theme-chalk\src\`. Tutaj są wszystkie pliki, które nas interesują.

Przeglądając plik ze zmiennymi - ponieważ to on był dla mnie najważniejszy - czyli `node_modules\element-ui\packages\theme-chalk\src\common\var.scss` zauważyłam, że wszystkie zmienne są określone jako `!deafult`. Co to oznacza w `scss`?

W [dokumentacji sass'a](https://sass-lang.com/documentation#variable_defaults_) możemy przeczytać,

> You can assign to variables if they aren’t already assigned by adding the !default flag to the end of the value. This means that if the variable has already been assigned to, it won’t be re-assigned, but if it doesn’t have a value yet, it will be given one.

Czyli zmienna zdefiniowana jako `!deafult` będzie wykorzystywana, wtedy i tylko wtedy gdy wcześniej nie zostanie zdefiniowana zmienna "zwykła" o tej samej nazwie.
Czyli, jeżli mamy zmienną w naszych plikach scss zdefiniowaną jako:

```scss
$bg: #000;
```

A następnie dodamy:

```scss
$bg: #ff0 !default;
```

To nasz element któremu nadamy kolor tła w ten sposób:

```scss
.div {
  background-color: $bg; //będzie miał tło czarne, a nie żółte
}
```

Będzie zakolorowany na czarno, a nie na żółto.

W momencie jeśli usuniemy deklarację tła jako `#000` nasz element zakoloruje się na żółto.

Będzie on żółty również wtedy, gdy zmienimy kolejność, czyli wpierw zdefiniujemy zmienną jako `!default`, użyjemy jej przypisując do elementu `.div`, a następnie zdefiniujemy jako zwykłą zmienną - naturalny cykl. Dopiero nadpisując ponownie przypisanie tła do elementu znów zakoloruje nam go na `#000`.

### Uzbrojeni w podstawową wiedzę możemy zabrać się do zadania.

## Import wybranych tylko styli `scss` dla Element UI

1. W naszym głównym pliku ze stylami nazwijmy go jako `base.scss` definiujemy zmienną z czcionką o wartości `~element-ui/packages/theme-chalk/src/fonts`, inaczej wyskoczy nam błąd:

```
Can't resolve './fonts/element-icons.ttf'
```

Następnie deklarujemy wszystkie te zmienne, jakie chcemy nadpisać.  
Dla mnie były to `breakpointy`. Oczywiście w tym fragmencie, kolejność deklaracj nie ma znaczenia.

```scss
$--sm: 350px;
$--md: 450px;
$--lg: 1200px;
$--xl: 1920px;
$--font-path:"~element-ui/packages/theme-chalk/src/fonts";
.
.
.
```

2. Importujemy pliki `.scss` Element UI zaczynając od `base.scss`. Pamiętajmy, że wszytskie powyżej zdeklarowane zmienne zostaną nadpisane naszymi wartościami. Jak jakiejś nie zdefioniowaliśmy zostanie użyta zmienna domyślna określona przez autorów Element UI.

```scss
@import "~element-ui/packages/theme-chalk/src/base.scss";
//dalej wszystkie style tych komponentów, jakie wykorzystujemy
@import "~element-ui/packages/theme-chalk/src/card";
@import "~element-ui/packages/theme-chalk/src/col.scss";
@import "~element-ui/packages/theme-chalk/src/dialog.scss";
@import "~element-ui/packages/theme-chalk/src/message-box.scss";
@import "~element-ui/packages/theme-chalk/src/alert.scss";
@import "~element-ui/packages/theme-chalk/src/card.scss";
@import "~element-ui/packages/theme-chalk/src/button.scss";
```

3. No i jak to z `.scss` bywa, nasz plik `base.scss` importujemy do głównego pliku projektu `App.vue` poprzez:

```vue
<style lang="scss">
//ścieżka do naszego base 
@import "@/scss/base.scss";
</style>
```
