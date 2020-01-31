---
layout: post
title: Digital root
date: 2020-01-31 19:18
category: ['programowanie', inne, 'php', 'js', 'python']
author: 
tags: [math,python,js,ruby]
excerpt: Porównanie kodu dla digital root. Ot, przy piątku należy się każdemu z nas wytchnienie od codziennych spraw. Ja sobie pograłam. Oczywiście w gry z programowania.
---

<!-- TOC -->

- [1.Digital Root](#1digital-root)
  - [1.1.PHP](#11php)
  - [1.2.Python](#12python)
  - [1.3.Ruby](#13ruby)
  - [1.4.Javascript](#14javascript)
  - [1.5.Porównanie długości kodu](#15por%c3%b3wnanie-d%c5%82ugo%c5%9bci-kodu)
  - [1.6.Math](#16math)
{:class='content_list'}
<!-- /TOC -->

# 1.Digital Root
Dzisiaj przystąpiłam do zadania, które brzmiało: "W dowolnym języku programowania wykonaj digital root dla liczby plus 5 testów sprawdzających kod". Tak wiem, dziwne mam rozrywki :smile:  
Kodowanie było na czas więc nie przypadło mi to do gustu, jednak sam temat mnie zainteresował.

Wpierw należałoby się zapoznać z teorią. Co to digital root?  
**Digital root** jest to suma poszczególnych cyfr, które składają się na daną liczbę, do momentu, gdy otrzymamy cyfrę od 0 do 9. 

Całkiem dobrze tematyka digital root wyjaśniona jest na [Wolfram Math World](http://mathworld.wolfram.com/DigitalRoot.html).  

Zawody przegrałam :smile: . Na tym jednak nie poprzestałam. Ponieważ sam temat mnie zainteresował bardziej, zaczęłam się bawić.

Ułożyłam trzy kody jeden w `js`, `php` i jeden w `py`, dołożę jeszcze 4 w `ruby` dla porównania *(ten w ruby został ułożony przez osobę, która zawody wygrała)*. Ogólnie w tych zawodach chodzi o to, by ułożyć w mniej niż 15 minut kod, który będzie jak najkrótszy. Liczy się czas, ale ważniejsza jest długość kodu. I ta idea, ułożyć jak najkrótszy kod mi właśnie przyświecała.

Popatrzmy jakie kroki trzeba wykonać do obliczenia **digital root**:
1. Wpierw zsumować wszystkie cyfry
2. Jeśli wynik jest większy niż 2 cyfry, sumujemy je dalej
3. Jeśli wynik jest znów dwu lub więcej cyfrowy, sumujemy poszczególne cyfry
4. ...
5. i tak aż dostaniemy jedną cyfrę w zakresie <0-9>
   
Przykład:

```
//digital_root(941); // 9 + 4 + 2 = 14, 1 + 4 = 5
//digital_root(132189); // 1 + 3 + 2 + 1 + 8 + 9 = 24, 2 + 4 = 6
//digital_root(493193); // 4 + 9 + 3 + 1 + 9 + 3 = 29, 2 + 9 = 11, 1 + 1 = 2
```

## 1.1.PHP
Znamy już kroki przystąpmy do kodowania wpierw kod w `php`. W zawodach daną wejściową był string i tego typy danych będę się trzymać w każdym kodzie.

```php
$n = '941'; //input
while (strlen($n) > 1) //loop until one digit
  $n = (string)array_sum(str_split($n)); //the magic sum
print_r($n); //output
```
Całkiem fajnie prawda :smile: 

## 1.2.Python 
To teraz `py`:

```python
n='941'
while len(list(n)) > 1:
  n = str(sum([int(i) for i in list(n)]))
print(n)
```
Nie jest zbyt podobnie :rofl:  
Za to lubię Python'a. Składnia `x for x in list` jest jedną z najlepszych z jakimi się spotkałam :yum:

## 1.3.Ruby
Teraz porównanie z `Ruby`
```rb
n = gets
while n.length > 1
    n = n.chars.map(&:to_i).sum.to_s
end
p n.to_i
```
Ze wszystkich języków wyżej wymienionych `Ruby` jest najkrótsze. Nie pobije go nawet `js` z hakami :joy:

## 1.4.Javascript
```js
let n = '941'
while(n.length > 1)
    n = n.split``.reduce((a, b) => a * 1 + b * 1 + '')
console.log(n)
```
A dlaczego piszę z hakami, ponieważ konwersja w `js` stringa na liczbę odbywa się poprzez `*1` gdzie w języku dostępna jest funkcja `parseInt`, natomiast z powrotem na string poprzez `+''` gdzie jest dostępna funkcja `toSring()`, ale ile to znaków więcej :sweat_smile:

## 1.5.Porównanie długości kodu
Zobaczmy w takim razie wyniki długości kodu *(potraktowałam wszelkie odstępy pomiędzy znakami używane dla czytelności, jako zbędne - i dostanę za to pewnie od przyjaciela po głowie, że to nie po pythonowsku :relaxed: :grin:)*:
```js
//RUBY =>51
console.log("Ruby", 
`while n.length>1
n=n.chars.map(&:to_i).sum.to_s end`.length)

//JS=>54
console.log("Javascript", 
`while(n.length>1)
n=n.split"".reduce((a,b)=>a*1+b*1+'')`.length)

//PHP => 55
console.log("PHP", 
`while(strlen($n)>1)
$n=(string)array_sum(str_split($n));`.length);

//PYTHON=>63
console.log("Python", 
`while len(list(n))>1:
    n=str(sum([int(i) for i in list(n)]))`.length)
```


I wydawało by się, że już nic z tego tematu nie można wyciągnąć więcej. Otóż, dokładnie, wydawałoby się. 

## 1.6.Math
Drążąc temat i docierając do teorii znalazłam **równanie matematyczne**, które w bardzo prosty i krótki sposób oblicza digital root.
```Math
//math
1+(n-1)%9
```
Krócej już się na pewno nie da :heart_eyes:  
I bez dwóch zdań, używając jedynie wzoru matematycznego `Ruby` i tak wygra w tym zestawieniu :joy: 
```rb
p 1+(n-1)%9.to_i
```