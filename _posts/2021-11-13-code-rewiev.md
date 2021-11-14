---
layout: post
title: Code rewiev
date: 2021-11-13 12:31
category: [frontend, inne]
author: Edyta Jozdowska
tags: [js]
tags: [frontend, "code-rewiev"]
excerpt: Biorę na tapet obcy kod i zastanawiam się jak można go zmienić by był lepszy. 
published: true
---


# Code rewiev - czyli co tutaj jest nie tak

Do postu na ten temat natchnął mnie niedziałający kod, który ostatnio dostałam do zdebugowania. Dotyczył on prostej walidacji formularza. Postanowiłam wskazać, co w tym kodzie jest moim zdaniem "nie tak". Na marginesie chciałabym zaznaczyć, że to moja subiektywna opinia, każdy może mieć inną. Na końcu tego wpisu zamieszczę swoją wersję i przeprowadzę porównanie, w tym wydajnościowe.

Wracając do tematu. Jak otworzyłam pliki, poprawiłam co nie działało, wczytałam się w jego sens. Moją pierwszą myślą było - PKP Intercity :smile: I tu spieszę z wyjaśnieniem, że pewien czas temu na wykopie pojawił się post odnośnie jakości kodu formularza do zamawiania biletów. W skrócie - nie było litości dla twórców :wink:

## Pierwszy kod
Kod jaki otrzymałam wyglądał mniej więcej tak - oczywiście na potrzeby posta pozmieniałam nazwy zmiennych i odnośników do pól formularza:

```javascript
function sprawdz_pola() {
  var bledne_dane = false;

  var wybor_ = $("#select1").val();
  if (wybor_ == "000") {
    var haslo_ = $("#haslo").val();
  } else {
    var haslo_ = wybor_;
  }
  var poleNumerowane1_ = parseFloat($("#poleNumerowane1").val()) || 0;
  var poleNumerowane2_ = parseFloat($("#poleNumerowane2").val()) || 0;
  var poleNumerowane3_ = parseFloat($("#poleNumerowane3").val()) || 0;
  if (poleNumerowane1_ == 0) {
    $("#poleNumerowane1")
      .parent()
      .parent()
      .removeClass("has-success")
      .addClass("has-error");
    bledne_dane = true;
  } else {
    $("#poleNumerowane1")
      .parent()
      .parent()
      .removeClass("has-error")
      .addClass("has-success");
  }
  if (poleNumerowane2_ == 0) {
    $("#poleNumerowane2")
      .parent()
      .parent()
      .removeClass("has-success")
      .addClass("has-error");
    bledne_dane = true;
  } else {
    $("#poleNumerowane2")
      .parent()
      .parent()
      .removeClass("has-error")
      .addClass("has-success");
  }
  if (poleNumerowane3_ == 0) {
    $("#poleNumerowane3")
      .parent()
      .parent()
      .removeClass("has-success")
      .addClass("has-error");
    bledne_dane = true;
  } else {
    $("#poleNumerowane3")
      .parent()
      .parent()
      .removeClass("has-error")
      .addClass("has-success");
  }
  if (haslo_.length < 33) {
    $("#haslo")
      .parent()
      .parent()
      .removeClass("has-success")
      .addClass("has-error");
    bledne_dane = true;
  } else {
    $("#haslo")
      .parent()
      .parent()
      .removeClass("has-error")
      .addClass("has-success");
  }
  if (bledne_dane) {
    return false;
  } else {
    return true;
  }
}
```

## Zarzuty

No więc co w nim jest nie tak?:

0. Nazwy zmiennych są po polsku :wink:

1. Powtarzające się `$("#poleNumerowaneX")` - wpierw znalezienie danego pola i odwołanie się do wartości [linijki od 10-12], potem znów znalezienie danego pola i dodanie lub usunięcie klasy. Czyli dla 1 pola formularza szukamy go dwuktornie, co przy 3 polach daje nam wyszukiwanie pola 6 razy, przy 6 - 12 razy itp.
   To nie jest dobre rozwiązanie.<br/>
   <span class="error">Tak być nie powinno</span>

   ```javascript
   var pole1 = $("#poleNumerowane1").val();
   $("#poleNumerowane1").doSomething();
   ```

   <span class="success">Bardziej poprawnie</span>

   ```javascript
   var pole1 = $("#poleNumerowane1");
   var val = pole1.val();
   pole1.doSomething();
   ```

   Mniejsza ilość odniesień do DOM.

   W drugim rozwiązaniu mam zastrzeżenie odnośnie wprowadzenie dodatkowej zmiennej dla wartości - jednak tutaj wszystko zależy, jak dalej rozplanujemy swój kod - jeśli poprawnie, wręcz tego przypisania moglibyśmy uniknąć.

2. Dla każdej wartości oddzielna funkcja `if`, `else` - co w tym złego, przecież to czytelne. Być może przy 3 polach nic wielkiego, ale załóżmy, że nasz formularz w przyszłości się rozrośnie - trzeba zatem dodać kolejne `if`, `else`, znów dla każdego pola - przy tym powtórzyć kroki: znajdź pole, sprawdź wartość, dodaj/odejmij `class`.

3. Odwoływanie się `.parent().parent()` - jest to mocne usztywnienie kodu. Zazwyczaj szukamy określonego elementu po klasie, bo tak mamy zdefiniowany css, lepiej jest użyć `closest()`<br/>
   <span class="error">Tak być nie powinno</span>

   ```javascript
   $("#poleNumerowane1").parent().parent().doSomething();
   ```

   <span class="success">Bardziej poprawnie</span>

   ```javascript
   $("#poleNumerowane1").closest(".form-group").doSomething();
   ```

4. Na końcu znów dodatkowy, zupełnie zbędny `if`, `else` by sprawdzić zmienną `bledne_dane` i zwrócić odpowiedni wynik.

## Mój kod
Jak ja bym to przepisała?

```javascript
const markIsValid = function (field, isValid) {
  isValid = ~~isValid;
  let classes = ["has-error", "has-success"];
  field
    .closest(".form-group")
    .removeClass(classes[~~!isValid])
    .addClass(classes[isValid]);
  return isValid;
};

function formValid() {
  let validateFields = ["#poleNumerowane1", "#poleNumerowane2", "#poleNumerowane3"];
  let validationErrors = [0];

  for (let i = 0; i < validateFields.length; i++) {
    var el = $(validateFields[i]);
    validationErrors[i] = markIsValid(el, (parseFloat(el.val()) || 0) > 0));
  }

  //custom validation
  let password = $("#haslo");
  validationErrors.push(markIsValid(password, password.val().length > 10));

  return validationErrors.indexOf(0) < 0;
}
```

**Pierwszym** moim założeniem jest, że nie lubię się powtarzać. Jeśli mam napisać dwa lub więcej razy tą samą linijkę, zastanawiam się jak to zmienić. Dlatego też wprowadziłam funkcję `markIsValid`, która doda mi odpowiednią klasę by pokazać użytkownikowi, że w tym miejscu ma błąd i **definiuję ją tylko raz**. Jej wynikiem jest wynik warunku do sprawdzenia.

Użyteczność tej funkcji jest powtarzalna przekazując pole do sprawdzenia i warunek jaki już na wejściu funkcji jest sprawdzany.

Dalej następuje, podwójne zaprzeczenie zmiennej poprzez `~~zmienna` - daje to o tyle, że wartości Boolean są przekształcane na liczby **0** i **1**. Można też do tego użyć `*1`. W ten sposób jesteśmy pewni, że typ zmiennej jest liczbowy, co posłuży mi do wskazania indeksu w tablicy.

Już od pewnego czasu dla zwykłego, **pojedynczego** `if`, `else` stosuje zapis tabeli - jakoś bardziej mi odpowiada. Można by było oczywiście napisać:

```javascript
if (isValid === true) {
  field.closest(".form-group").removeClass("has-error").addClass("has-success");
} else {
  field.closest(".form-group").removeClass("has-success").addClass("has-error");
}
```

Tyle, że tego jest dużo więcej, a tak:

```javascript
isValid = ~~isValid;
let classes = ["has-error", "has-success"];

field.closest(".form-group").removeClass(classes[!isValid]).addClass(classes[isValid]);
```

Co oznacza mniej więcej tyle - usuń klasę przeciwną, a nadaj klasę w zależności, czy warunek jest spełniony **1** lub niespełniony **0**. Co do czytelności - można dyskutować. Dla mnie pierwszy jak i drugi kod jest czytelny, przy czym drugi jest krótszy.

**Drugie** - zmiana nazwy funkcji sprawdzającej poprawność formularza. Nie jestem fanką pisania kodu w języku polskim - przeplatanie naturalnych instrukcji języka programowania, które są w angielskim z polskimi nazwami - kłuje mnie w oczy.

**Trzecia zmiana** - wprowadzenie tablicy z polami, jakie należy sprawdzić. W ten sposób dodanie pola lub 10 pól do sprawdzenia odbędzie się tylko w tej linijce. Można by było jeszcze bardziej zmienić kod, tak by nie trzeba było nic dopisywać, jednakże wymagało by to zmiany samego formularza by zaznaczyć, które pola nie mogą być buste lub o wartości 0 - nie chcę ruszać samego formularza, więc zostaję przy tym rozwiązaniu.

Następnie, przez wszystkie elementy jakie mam zwalidować puszczam wcześniej utworzoną funkcję `markIsValid`, z warunkiem czy pole jest **puste** i czy ma wartość **0**.

**Dalej** jest customowa walidacja dla pola `password`, gdyż jako jedyne musi mieć określoną długość . Wynik tej walidacji dodaję do zmiennej `validationErrors`.

**Na koniec** sprawdzam wartości błędów. Jeśli, którekolwiek z pól nie przeszło walidacji, w tablicy znajdę wartość **0**, bez znaczenia na jakim miejscu, jeśli nie znajdę **0**, czyli indeks będzie **-1** - cały formularz jest poprawny.

## Porównanie

Pomiar | Mój kod | Pierwszy kod
ilość lini kodu | 25 | 74
Przejrzystość | 8 (0-10) | 10 (0-10)

Przyznałam swojemu kodowi przejrzystość na poziomie **8** jedynie dlatego, gdyż zdaję sobie sprawę, że np. junior mógłby mieć z nim pewien problem - zwłaszcza w funkcji `markIsValid`.

## Pomiar czasu wykonywania kodu
Mój kod jest krótszy, bardziej rozszerzalny i ma bardziej uniwersalne zastosowanie, ale czy w wykonaniu jest szybszy?

 Od razu napiszę, że szybkość kodu uzależniona jest od zastosowanych w nim funkcji. np. Zamiast konstrukfji `for (let i = 0; i < ValidateFields.length; i++) {}` użyłabym `map()` - mój kod byłby wolniejszy - z uwagi na fakt, że `map()` jest wolniejszy od zwykłego `for`.

 Mierzenie wydajności przeprowadziłam na dwóch przeglądarkach: 
 * **Chrome - wersja 95.0.4638.69 (Oficjalna wersja) (64-bitowa)**  dla systemu linux
 * **Firefox - 78.15.0esr (64-bit)** dla systemu linux

 Próby przeprowadzałam w oknie incognito, za każdym razem odświeżając okno i wykonując ten sam kod w pętli **10000** razy.



Oto wyniki:

 L.p. | Chrome - mój kod|Chrome - pierwszy kod | Firefox - mój kod | Firefox - pierwszy kod
-|-
1 | 502.70000000018626 ms| 501.5 ms| 2664 ms|2656 ms
2 | 501.6000000005588 ms | 502.20000000018626 ms| 2694 ms| 2625 ms
3 | 506.80000000074506 ms | 507.3999999994412 ms |2702 ms |2725 ms
4 | 517.4000000003725  ms | 514.8999999994412 ms | 2723 ms | 2662 ms
5 | 505.80000000074506 ms | 518.5 ms | 2708 ms | 2730 ms
**Średnia** | **506.86000000052155 ms** | **508.89999999981376 ms** | **2698.2 ms** | **2679.6 ms** 
**WYNIK** | różnica:<br/>2.039999999292206 ms ✔️ | ❌ |  ❌ | różnica<br/>18.59999999999991 ms ✔️

Jak widać różnica między wydajnością obu jest znikoma. Podczas pomiaru korzystałam z `performance.now();`. Zaskoczył mnie czas wykonywania kodów w FF. 

Pewnie dałoby się przepisać ten kod jeszcze inaczej - ale na chwile obecną, mój kod mnie satysfakcjonuje - zobaczymy, czy będzie tak samo za rok :smile:.