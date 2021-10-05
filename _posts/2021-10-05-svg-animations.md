---
layout: post
title: Animacje svg
date: 2021-10-05
category: [frontend, inne]
author: Edyta Jozdowska
tags: [frontend, sass, animations]
excerpt:
published: true
---

Dawno nie pisałam. Spowodowane jest to wieloma zmianami u mnie. Kilka współprac w trakcie - przez co brakuje czasu.<br/>
Jednakże, jestem bardzo zadowolona z ostatniego zlecenia, dlatego też postanowiłam napisać o nim, ku pamięci.

Polegało ono między innymi na wykonaniu animacji svg. Nie jest to nic niezwykłego - obecnie bardzo często na stronach widujemy takie elementy. Pisałam już o nich w poście ["SVG i css"](../svg-i-css/). Jednak w takiej formie - ja wykonywałam je po raz pierwszy :smile:

# Animacje svg

Animacja miała być na zdarzenie hover myszki i wyglądać między innymi w taki sposób:

{:.center}
{%
    include image.html
    src="/images/blog_images/svg/svg-animation.gif"
    caption="Animacje svg"
%}

## Przygotowanie pliku vectorowego

Pierwszą częścią takich animacji jest przygotowanie sobie pliku vectorowego. Do tego celu korzystam z **inkscape** - podczas zapisywania wybieram opcję **czysty svg**.
W wyniku otrzymuję taki plik xml:

```xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   width="139.89301"
   height="118.598"
   viewBox="0 0 37.013357 31.379055"
   version="1.1"
   id="svg8">
  <defs
     id="defs2" />
  <metadata
     id="metadata5">
    <rdf:RDF>
      <cc:Work
         rdf:about="">
        <dc:format>image/svg+xml</dc:format>
        <dc:type
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
        <dc:title></dc:title>
      </cc:Work>
    </rdf:RDF>
  </metadata>
  <path
     id="Rectangle_11"
     d="M -9.9e-7,31.379054 V -6.3470066e-5 H 31.379117 V 31.379054 Z"
     style="fill:#99dde2;stroke-width:0.84015954" />
  <path
     id="Rectangle_49"
     d="M 25.39887,31.379054 V 19.764689 h 11.614365 v 11.614365 z"
     style="fill:#bcedf0;stroke-width:0.84015954" />
</svg>
```

Usuwam co jest niepotrzebne, czyli

- wszystkie id
- dane meta
- definicje

I otrzymuję taki plik, już po wyczyszczeniu:

```xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg width="139.89301" height="118.598" viewBox="0 0 37.013357 31.379055">
  <path
    d="M -9.9e-7,31.379054 V -6.3470066e-5 H 31.379117 V 31.379054 Z"
    style="fill:#99dde2;stroke-width:0.84015954" />
  <path
    d="M 25.39887,31.379054 V 19.764689 h 11.614365 v 11.614365 z"
    style="fill:#bcedf0;stroke-width:0.84015954" />
</svg>

```

Jest to grafika svg, zostawiam więc domyślne `width` i `height` oraz co jest najważniejsze `viewBox`, który określa nam obszar naszego obrazu. 


{:class="info"}
Zawierając plik `svg` w kodzie mamy wpływ na wielkość wyświetlanego obrazu poprzez css - w końcu jest to grafika skalowalana - stąd `width` i `height` dla naszego obrazu ma jedynie zastosowanie do poprawnego i pełnego wyświetlenia svg - te wartości są relatywne do wszystkich znaczników zawartych w `<svg></svg>`. Jeśli zajdzie potrzeba, że obraz ma być większy, możemy targetować w niego css'em - mając pewność, że wszystkie elementy wewnątrz wyświetlą się poprawnie. Takie przynajmniej jest moje zdanie, wynikające z doświadczenia.

Wracając do tematu. Wyrenderowany przez przeglądarkę obraz wygląda tak (nie zamieszczam znacznika `<?xml>`):
<svg width="139.89301" height="118.598" viewBox="0 0 37.013357 31.379055">
<path 
    d="M -9.9e-7,31.379054 V -6.3470066e-5 H 31.379117 V 31.379054 Z" 
    style="fill:#99dde2;stroke-width:0.84015954" />
<path 
    d="M 25.39887,31.379054 V 19.764689 h 11.614365 v 11.614365 z" 
    style="fill:#bcedf0;stroke-width:0.84015954" />
</svg>

Jeśli mamy zamieszczony plik svg bezpośrednio w kodzie naszej strony, możemy wpływać na niego poprzez naszego css - dzięki czemu dostępne mamy wszystkie triggery `css` np. `:hover` lub `:active`, mamy też możliwość określania kolorów i zachowania poszczególnych elementów obrazu - dzięki czemu możemy skorzystać z animacji css.

Przykład trywialny - zmieńmy kolor naszego kwadratu (dużego) na inny podczas nakierowywania na niego myszką. Wystarczy dodać odpowiednie klasy do naszych znaczników `<path/>`, oraz ustawić `transitions`

{:class="w50"}

```xml
<svg
    class="square"
    width="139.89301" height="118.598"
    viewBox="0 0 37.013357 31.379055">
    <path
        class="bigSquare"
        d="M -9.9e-7,31.379054 V -6.3470066e-5 H 31.379117 V 31.379054 Z"
        style="stroke-width:0.84015954" />
    <path
        class="smallSquare"
        d="M 25.39887,31.379054 V 19.764689 h 11.614365 v 11.614365 z"
        style="stroke-width:0.84015954" />
  </svg>
```

{:class="w50"}

```sass
.square
    path
        transition: all .2s linear
<<<<<<< HEAD
        &.bigSquare  fill: #99dde2
        &.smallSquare  fill: #bcedf0
=======
        &.bigSquare  
            fill: #99dde2
        &.smallSquare  
            fill: #bcedf0
>>>>>>> 7b90ec6... new post

    &:hover
        path.bigSquare
            fill: red
        path.smallSquare
            fill:pink

<<<<<<< HEAD


=======
>>>>>>> 7b90ec6... new post
```

Wynikiem powyższego - jak najedziemy kursorem na obraz - duży kwadrat zmieni swój kolor na czerwony, a mały na różowy.

{% include _posts/_examples/svg-animatios1-hover-simple.html %}

W ten sposób możemy zrobić prawie każdą animację jaką oferuje nam css.

Zatem odwzorujmy gifa z początku artykułu. Potrzebujemy do tego kilka obrazów svg. Ich kolory określę bezpośrednio w css - tak aby mieć jak największą elastyczność przy późniejszych, ewentualnych zmianach.

Sama animacja polega na tym, że duży kwadrat obraca się wokół własnej osi o 90 stopni, natomiast mały kwadrat obracając się wokół własnej osi, zmienia swoją pozycję. Muszę przyznać, że jedynym elementem, jaki sprawił mi tutaj trudność było ustawienie css'a w taki sposób by zachować oś obrotu. Bez odpowiedniego ustawienia, obroty elementów wykonywane były w dość dziwny sposób. Krótkie wyszukiwanie w google i natrafiłam na dwa znaczniki `transform-origin` i `transform-box`.

- `transform-origin` [^1] - odpowia za punkt w jakim "przypięta" zostanie animacja. Zresztą, bardzo fajnie jest to zobrazowane w dokumentacji:
<iframe class="interactive" height="390" style="width:100%" src="https://interactive-examples.mdn.mozilla.net/pages/css/transform-origin.html" title="MDN Web Docs Interactive Example" loading="lazy"></iframe>

- `transform-box` zaś definiuje "kontener", do którego będzie miała zastosowanie opcja `transform` i `transofrm-origin` - przyjmuje ona wartości **content-box**, **border-box**, **fill-box**, **stroke-box** i **view-box**. Probowałam jedynie **content-box** i **fill-box**. Ta druga odnośi się, jak jej nazwa wskazuje do wypełnienia, w przypadku przykładu - do kwadratu.

Teoria ogarnięta, można przystąpić do pisania css'a. Ja preferuję `ssas'a` z uwagi na jego przejżystość :smile:

```sass
.animated-icon
    position: relative
    width: 150px
    height: 150px

    &.smaller
        width: 80px
        height: 80px
    svg
        overflow: visible
        position: absolute
        transition: all .2s
        width: 100%
        height: 100%
        left: 0
        right: 0
        margin: auto
        top: 0
        path,g
            transition: all .2s
            transform-box: fill-box
            transform-origin: center center

```

To pierwsza część kodu.

Jedyne co wymaga tutaj wyjaśnienia to `overflow`. Domyślnie svg ma ustawiony overflow na hidden, czyli wszystko co wystaje schowaj. Ponieważ w niektórych przypadkach, animacja może wychodzić "poza obszar" widzialny svg - warto ją ustawić właśnie na `visible`, inaczej element może zostać ucięty w którymś momencie.

Druga rzecz - to ustawienie svg na absoluta. Ponieważ rodzic naszej ikony `.animated-icon` jest **relatywny** - **absolut**, będzie relatywny do kontenera przetrzymywanego przez rodzica, czyli do wymiarów `.animated-icon`.

Kolejnie należy określić zachowanie naszych ikona na zdareznie `:hover`

```sass
.animated-icon
    &:hover
        .bigSquare
            transform: translateX(15%)
            transform: rotate(90deg)
        .smallSquare
            transform-box: fill-box
            transform-origin: center
            transform: translateX(-70%) rotate(720deg)
```

Dodajemy kolor na każdą naszą ikonę

```sass
.square
    .bigSquare
        fill: #99dde2

.blue .smallSquare
    fill: #26509b

.green .smallSquare
    fill: #55b555

.light-blue .smallSquare
    fill: #789ad9

.yellow .smallSquare
    fill: #ffed83

.orange .smallSquare
    fill: #f0783c

.purple .smallSquare
    fill: #ab3070
```

i finalnie mamy taki oto kod:

```xml
<div class="animated-icon blue">
<svg width="139.89301" height="118.598" viewBox="0 0 37.013357 31.379055">
    <path class="bigSquare" d="M -9.9e-7,31.379054 V -6.3470066e-5 H 31.379117 V 31.379054 Z" style="stroke-width:0.84015954" />
    <path class="smallSquare" d="M 25.39887,31.379054 V 19.764689 h 11.614365 v 11.614365 z" style="stroke-width:0.84015954" />
  </svg>
</div>
<div class="animated-icon green">
<svg width="139.89301" height="118.598" viewBox="0 0 37.013357 31.379055">
    <path class="bigSquare" d="M -9.9e-7,31.379054 V -6.3470066e-5 H 31.379117 V 31.379054 Z" style="stroke-width:0.84015954" />
    <path class="smallSquare" d="M 25.39887,31.379054 V 19.764689 h 11.614365 v 11.614365 z" style="stroke-width:0.84015954" />
  </svg>
</div>
<div class="animated-icon light-blue">
<svg width="139.89301" height="118.598" viewBox="0 0 37.013357 31.379055">
    <path class="bigSquare" d="M -9.9e-7,31.379054 V -6.3470066e-5 H 31.379117 V 31.379054 Z" style="stroke-width:0.84015954" />
    <path class="smallSquare" d="M 25.39887,31.379054 V 19.764689 h 11.614365 v 11.614365 z" style="stroke-width:0.84015954" />
  </svg>
</div>
<div class="animated-icon yellow">
<svg width="139.89301" height="118.598" viewBox="0 0 37.013357 31.379055">
    <path class="bigSquare" d="M -9.9e-7,31.379054 V -6.3470066e-5 H 31.379117 V 31.379054 Z" style="stroke-width:0.84015954" />
    <path class="smallSquare" d="M 25.39887,31.379054 V 19.764689 h 11.614365 v 11.614365 z" style="stroke-width:0.84015954" />
  </svg>
</div>
<div class="animated-icon orange">
<svg width="139.89301" height="118.598" viewBox="0 0 37.013357 31.379055">
    <path class="bigSquare" d="M -9.9e-7,31.379054 V -6.3470066e-5 H 31.379117 V 31.379054 Z" style="stroke-width:0.84015954" />
    <path class="smallSquare" d="M 25.39887,31.379054 V 19.764689 h 11.614365 v 11.614365 z" style="stroke-width:0.84015954" />
  </svg>
</div>
<div class="animated-icon purple">
<svg width="139.89301" height="118.598" viewBox="0 0 37.013357 31.379055">
    <path class="bigSquare" d="M -9.9e-7,31.379054 V -6.3470066e-5 H 31.379117 V 31.379054 Z" style="stroke-width:0.84015954" />
    <path class="smallSquare" d="M 25.39887,31.379054 V 19.764689 h 11.614365 v 11.614365 z" style="stroke-width:0.84015954" />
  </svg>
</div>
```

{% include _posts/_examples/svg-animations2-hover-simple.html %}

Całkiem fajne - prawda :smile:

Poniżej jeszcze kilka przykładów wraz z kodem. Tym razem będą animowane trójkąty.


```xml
<!-- trójkąty -->
<svg version="1.1" viewBox="0 0 37.013357 31.379055" height="118.598" width="139.89301">
    <path d="M 17.639845,0.89933856 0,31.379054 h 35.219678 z"
        style="fill:#f0d63c;fill-opacity:1;stroke:none;stroke-width:0.6168707px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" />
    <path d="M 22.391046,9.1342653 9.0599184,31.379054 H 35.219678 Z"
        style="fill:#f03c3c;fill-opacity:1;stroke:none;stroke-width:0.6168707px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" />
    <path d="m 26.450358,16.166349 -8.829075,15.212705 17.598395,-0.0054 z"
        style="fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.6168707px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" />
    <path 
        class="hide fly-in-right" d="m 24.745189,11.8482 -11.378048,19.520644 23.461887,0.01021 z"
        style="fill:#789ad9;fill-opacity:1;stroke:none;stroke-width:0.81052744px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" />
</svg>
```

## Animowane flagi

{% include _posts/_examples/svg-animations3-hover-simple.html %}

Podam jedynie kod sass odpowiedzialny za animację poszczególnych elementów:
```sass
svg
    .hide
        opacity: 0

    .fly-in-top
        transform-box: border-box
        transform: rotate(50deg) translate(10%, -120%)
        transform-origin: right center
    .fly-in-right
        transform: translateX(120%)
        transform-origin: right center
    .fly-in-left
        transform: translateX(-120%)
        transform-origin: left center
    .fade-in-up
        transform: translateY(-50%)
    .from-center
        transform-origin: bottom center
        transform: scale(.6) translateY(35%)
    .rotate
        transform: translate(8%, 0)

    &:hover
        .hide
            opacity: 1
        .fly-in-top
            transform: rotate(0deg) translateX(0)
        .fly-in-right
            transform: translateX(0)
            transition-timing-function: cubic-bezier(.18,.89,.32,1.28)
        .fade-in-up
            transform: translateY(0)
        .move-x
            transform: translateX(-10%)
        .fly-in-left
            transform: translateX(0)
        .from-center
            transform: scale(1) translateY(0%)
        .rotate
            transform: rotate(120deg) translate(10%, -32%)
```

Połączenie css'a i svg do animacji daje parawdę dużo możliwości. Ciekawy efekt opisałam jakiś czas temu w poście ["SVG i css"](../svg-i-css/)

[^1]: `transform-origin` [Dokumenatcja MDN Web Docs ](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin){:target="_blank"}