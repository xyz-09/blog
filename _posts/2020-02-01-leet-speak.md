---
layout: post
title: Leet speak
date: 2020-02-01 10:17
category:  ['bitwy programowania', 'php', 'js', 'python']
author: Edyta Jozdowska
tags: [python, js, php, battle]
excerpt: 
---
Jak wspominałam we wpisie [Digital root](../digital_root) biorę udział w zawodach programowania na czas i długość kodu. Przyznam, że z&nbsp;czasem jest u mnie kiepsko, muszę się dobrze zastanowić co mam zrobić i jak to zrobić, a sekundy, niestety, lecą.  

Po bitwie jednak kopiuję sobie wszystko i na spokojnie analizuję swój kod, kod innych, jak też myślę, w jaki sposób faktycznie można by było dane zadanie rozwiązać najmniejszą ilością znaków w&nbsp;językach jakie znam i które lubię: `js`, `php` i `python`. Fantastyczny sposób na, wydawałoby się, mało wymagającym kodzie, by szlifować swoje umiejętności.

W jednej z bitew był do napisania kod, który przekształci zwykły string na tzw. [Leet speak = 1337 5p34k](https://pl.wikipedia.org/wiki/Leet_speak){:tagret="_blank"} w podstawowej formie, czyli litery zamieni na odpowiadające im cyfry.
W samym zadaniu nie brałam udziału, ale swój kod i tak napisałam :rofl: 

# Leet speak lub inaczej 1337 5p34k
Rozpatrzmy jak w podstawowej formie będzie wyglądała zamiana:  
'O' => '0'  
'L' => '1'  
'Z' => '2'  
'E' => '3'  
'A' => '4'  
'S' => '5'  
'G' => '6'  
'T' => '7'  
'B' => '8'  
'Q' => '9'  
Uważna osoba spostrzegła zapewne, że cyfry zostały tak dobrane aby przypominać odpowiadające im litery. 
W zadaniu miały zostać zamienione zarówno litery pisane drukowanymi literami jak i małymi.

## Kod PHP
Zacznijmy od kodu `php`
```php
$s="heLlo wOrlD, my Name is Edith";
echo str_ireplace(str_split('olzeasgtbg'),str_split('0123456789'), $s);

// OUTPUT: h3110 w0r1D, my N4m3 i5 3di7h
```
Sam kod wygląda bardzo prosto prawda :smile:.  
Weź ciąg znaków, zamień go na tablicę i dla poszczególnych liter wstaw cyfry. Zastosowana funkcja `str_ireplcae()`[^1], jest wersją funkcji `str_replace()`, jednak jest określaną jako *case-insesitive*. Co można przetłumaczyć, że w tym wypadku nie będzie rozróżniała, czy zamienia dużą, czy małą literę. Dla niej i jedna, i druga jest taka sama.  
Funkcje w `php` oznaczone jako case-insesitive należy używać z głową, bo można otrzymać niespodziewane wyniki!




## Python
Kolej na Pythona:
```python
import string
s = "heLlo wOrlD, my Name is Edith"
a = 'olzeasgtbg'
print(s.translate(str.maketrans(a + a.upper(),'0123456789' * 2)))

# OUTPUT: h3110 w0r1D, my N4m3 i5 3di7h
```
Zabiegi jak `a+a.upper()` oraz `'0123456789'*2` mają za zadanie skrócenie kodu. Obliczenia wykorzystują funckję `maketrans()` należącą do stringa. Ważne przy jej użyciu, jeśli podajemy jedynie dwa argumenty: znaki jakie mają być zamienione i znaki na jakie mają być zamienione - **ważne jest aby oba argumenty miały taką samą długość**. Stąd podwoiłam ciąg `0123...` aby było zamieniane też dla znaków dużych. Kod ten nie należy jednak do przejrzystych, chociaż gdyby się uprzeć, to będzie czytelny :sweat_smile:


## JS
No to został mi jedynie Javascript:
```javascript
const s = "heLlo wOrlD, my Name is Edith";

console.log('olzeasgtbg'.split``.reduce((a, b, i) => 
  a.replace(new RegExp(b, "ig"), '0123456789'.split``[i])
,s))

// OUTPUT: h3110 w0r1D, my N4m3 i5 3di7h
```
**Uwagi!!** powyższy kod został skrócony do jak najmniejszej ilości znaków, Nie jest on wydajny!!! Split dla '0123...' jest wykonywany za każdą interacją, należałoby go przypisać w zmienną poza funkcją reduce, ale to już co najmniej 2 znaki więcej. 


Albo jak kto woli w starym stylu:
```javascript
// OLD Fashion Way
let s = "heLlo wOrlD, my Name is Edith";
m = 'olzeasgtbg'.split``;

for (let i=0;i<m.length;i++){
  s=s.replace(new RegExp(m[i], "ig"), i+'');
}

console.log(s)
// OUTPUT: h3110 w0r1D, my N4m3 i5 3di7h
```

To sprawdzamy długość:
```javascript
// PHP => 70
console.log(`echo str_ireplace(str_split('olzeasgtbg'),
str_split('0123456789'),$s);`.length)

// PYTHON => 76
console.log(`a='olzeasgtbg' 
print(s.translate(str.maketrans(a+a.upper(),'0123456789'*2)))`.length)

//Javascript odlway => 93
console.log(`m='olzeasgtbg'.split``;
for(let i=0;i<m.length;i++){
s=s.replace(new RegExp(m[i],"ig"),i+'');
}`.length)

//Javascript ES6 => 108
console.log(`console.log('olzeasgtbg'.split"".reduce((a,b,i)=>
a.replace(new RegExp(b,"ig"),'0123456789'.split""[i])
,s))`.length)
```
W tym zestawieniu wygrywa, jak dla mnie **PHP :1st_place_medal: :1st_place_medal: :1st_place_medal:**, ale tylko dlatego przoduje przed pythonem, ponieważ nie trzeba nic powtarzać, ani stosować hacków.


[^1]: `str_ireplace()` w [dokumentacji PHP](https://www.php.net/manual/en/function.str-ireplace.php){:target="_blank"}



