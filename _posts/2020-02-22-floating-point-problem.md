---
layout: post
title: Floating-point problem
date: 2020-02-22 10:21
category: [programowanie] 
author: Edyta Jozdowska
tags: [js,php]
excerpt: Problem precyzyjności liczb zapisanych jako floating-point.
published: true
---
- [Duże liczby w JS / PHP](#du%c5%bce-liczby-w-js--php)
- [Dlaczego tak się dzieje?](#dlaczego-tak-si%c4%99-dzieje)
- [Floating-point precision](#floating-point-precision)
{:class='content_list'}

Ten post został zainspirowany błędem na jaki natknęłam się rozwiązując zadanie odnośnie ["HappyNumbers"](../happy-numbers/). Zachęcam do przeczytania bo są to naprawdę fajne liczby i zasługują na swoje miano wesołych :wink:.

Rozwiązując wyżej wspomniane  zadanie w `js` i w `php` natknęłam się na błąd, który uniemożliwiał mi przejście wszystkich testów  sprawdzających poprawność kodu.  
Otóż liczby, które powinny być wesołe były niewesołe. Byłam pewna, że kod jest poprawny, działał w `pythonie`, skąd więc rozbieżność? 

## Duże liczby w JS / PHP
Spróbujmy wyświelić liczbę **16525534153749833** w `js` jako liczbę. Rezultatem będzie: **16525534153749832** :thinking:. Jakim cudem?  
To samo się dzieje dla liczby: **2712939616709395196 ≠ 2712939616709395000** oraz dla liczby  
 **9244681613480703 ≠ 9244681613480704**. **9999999999999999** ≠ **10000000000000000**  
 Wyświetlane jest zupełnie inna liczba niż podawana. 

>Wniosek: **Istnieją liczby, które podawane typem jako liczby nie są możliwe do wyświetlenia / użycia** np. w przeglądarce.
{:.summary}

Stąd do mojego algorytmu trafiały nie te liczby. Zapisując powyższe jako stringi, nie ma problemu. Poniżej pen z przykładami:

<iframe height="380" style="width: 100%;" scrolling="no" title="yLNVpzL" src="https://codepen.io/ejo/embed/yLNVpzL?height=265&theme-id=default&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/ejo/pen/yLNVpzL'>yLNVpzL</a> by ejo
  (<a href='https://codepen.io/ejo'>@ejo</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>
Zobaczmy `php`
```php
var_dump(679927533571841532898);

// float(6.7992753357184E+20)
```

## Dlaczego tak się dzieje?

Zobaczmy dokumentację: 
>In JavaScript, Number is a numeric data type in the double-precision 64-bit floating point format (IEEE 754). In other programming languages different numeric types can exist, for examples: Integers, Floats, Doubles, or Bignums [^1].


Przekładając na polski. Liczby w `js` nie rozróżniają typów liczb np. `short`, `long`, `floating-point`, `integer` itp., jak większość języków programowania. **PODAWANE SĄ ZAWSZE** jako 64-bitowy `floating-point`.  

Oznacza to, że niektórych liczb całkowitych nie jesteśmy w stanie przedstawić w typie liczby bez utraty ich precyzji, stąd **9999999999999999** ≠ **10000000000000000**. 

W `php` natomiast według dokumentacji:
>If PHP encounters a number beyond the bounds of the integer type, it will be interpreted as a float instead. [^2].

Co oznacza, że jeśli `php` napotka liczbę, która przekracza granicę liczby całkowitej w jakiej może być zapisana, zostanie ona zinterpretowana jako liczba zmiennoprzecinkowa. Tak właśnie się stało dla liczby **679927533571841532898** lub **1646476620141690717724578**. Liczby te są po prostu za duże.
```php
var_dump(1646476620141690717724578);
//float(6.7992753357184E+20)
```
## Floating-point precision
Temat precyzyjności `floating-point` bardziej jest znany do wykonywania obliczeń z liczbami po przecinku np:  0.1 + 0.2
```js
0.1 + 0.2 => 0.30000000000000004
```
Czy to w `py`, czy w `js` czy `php`. 

Baaaardzo dokładnie jest na ten temat napisane [What every computer Scientist should know about floating-point arithmetic.](https://docs.oracle.com/cd/E19957-01/806-3568/ncg_goldberg.html){:target="_blank"}

Ta nieprecyzyjność jest mi znana. Jednak nie odniosłabym jej nigdy do problemu reprezentacji liczby całkowitej :smile:.<br/><br/>

[^1]:[Dokumentacja JS - Numbers](https://developer.mozilla.org/en-US/docs/Glossary/Number){:target="_blank"}
[^2]:[Dokumentacja php - Integers](https://www.php.net/manual/en/language.types.integer.php){:target="_blank"}