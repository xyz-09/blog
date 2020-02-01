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
    - [1.1.Przykład](#11przyk%c5%82ad)
  - [.1.PHP](#1php)
  - [.2.Python](#2python)
  - [.3.Ruby](#3ruby)
  - [.4.Javascript](#4javascript)
  - [.5.Porównanie długości kodu](#5por%c3%b3wnanie-d%c5%82ugo%c5%9bci-kodu)
  - [.6.Math](#6math)
  - [.7.Debugowanie i wyświetlanie](#7debugowanie-i-wy%c5%9bwietlanie)
{:class='content_list'}
<!-- /TOC -->


Dzisiaj przystąpiłam do zadania, które brzmiało: 
> "W dowolnym języku programowania wykonaj digital root dla liczby plus 5 testów sprawdzających kod". 

Tak wiem, dziwne mam rozrywki :smile:  
Kodowanie było na czas więc nie przypadło mi to do gustu, jednak sam temat mnie zainteresował.

# 1.Digital Root
Wpierw należałoby się zapoznać z teorią. Co to digital root?  
**Digital root**: jest to suma poszczególnych cyfr, które składają się na daną liczbę, do momentu, gdy otrzymamy cyfrę od 0 do 9.  
Całkiem dobrze tematyka digital root wyjaśniona jest na [Wolfram Math World](http://mathworld.wolfram.com/DigitalRoot.html). Możesz też skoczyć [do przykładów w tym poście](./#11przykład).

Zawody przegrałam :smile: . Na tym jednak nie poprzestałam. Ponieważ sam temat mnie zainteresował, zaczęłam się bawić. W&nbsp;piątkowy wieczór należy się trochę rozrywki każdemu :joy:

Napisałam trzy skrypty. Jeden w `js`, drugi w `php` i trzeci w `py`. Do tego posta dołączę jeszcze 4 w `ruby` dla porównania *(ten w ruby został ułożony przez osobę, która zawody wygrała)*. Ogólnie w tych zawodach chodzi o to, by ułożyć w&nbsp;mniej niż 15 minut kod, który będzie jak najkrótszy. Liczy się czas, ale ważniejsza jest długość kodu.  
**I ta idea, ułożyć jak najkrótszy kod mi właśnie przyświecała.**

Popatrzmy jakie kroki trzeba wykonać do obliczenia **digital root**:

{:.center}
{%
    include image.html 
    src="/images/blog_images/digital_root/diagram.jpg" 
    caption="Rysunek 1. Schemat blokowy obliczania digital root"
%}
   
### 1.1.Przykład
```
//digital_root(941); // 9 + 4 + 2 = 14, 1 + 4 = 5
//digital_root(132189); // 1 + 3 + 2 + 1 + 8 + 9 = 24, 2 + 4 = 6
//digital_root(493193); // 4 + 9 + 3 + 1 + 9 + 3 = 29, 2 + 9 = 11, 1 + 1 = 2
```
Znamy już kroki przystąpmy do kodowania.  
W zawodach daną wejściową był string i tego typu będę się trzymać w każdym kodzie.

## .1.PHP

Wpierw kod w `php`: 

```php
$n = '941'; //input
while (strlen($n) > 1) //loop until one digit
  $n = array_sum(str_split($n)); //the magic sum
echo $n; //output
```
Całkiem fajnie prawda :smile:  
W `php` mamy gotową już funkcję, która wykona za nas całą operację na elementach tablicy `array_sum` [^1] .  
Dodatkowo `php` jak widać ma gdzieś typy zmiennych [^2] :rofl:. Zmienna `$n` jest stringiem, ale skoro chce je sumować to traktuje poszczególne elementy tablicy jako liczby. I tak do momentu aż zmienna `$n` będzie jednocyfrowa. 
Na wyjściu mamy też liczbę, można ją zamienić do stringa np. poprzez dołączenie pustego ciągu znaków `.''`.

## .2.Python 
To teraz `py`

```python
n='941'
while len(n) > 1:
  n = str(sum([int(i) for i in n]))
print(n)
```
Nie jest zbyt podobnie :rofl:  
Tutaj już interujemy po poszczególnych znakach/cyfrach zamieniając ich typ na int, a zwracając na wyjściu typ string.  
Do&nbsp;sumowania elementów zastosowana jest konstrukcja, za którą uwielbiam Python'a. Składnia `x for x in list if cond` jest jedną z najlepszych z jakimi się spotkałam :yum: [^3]. Niestety nie działa z `while`.

## .3.Ruby
Teraz porównanie z `Ruby`
```rb
n = gets
while n.length > 1
    n = n.chars.map(&:to_i).sum.to_s
end
p n.to_i
```
W tym kodzie mogę podziwiać prostotę i przejrzystość. Nie znam `Ruby` zbyt dobrze, jednak ten kod do mnie przemawia, jak bym czytała książkę: `n.znaki.mapuj/interuj(zamień na integer).sumuj.konwerutj_do_stringa`

## .4.Javascript
```js
let n = '941'
while(n.length > 1)
    n = n.split``.reduce((a, b) => a * 1 + b * 1 + '')
console.log(n)
```
W tym kodzie zdecydowałam się na `reduce` z tego względu, że na wejściu ma wynik poprzedniej operacji i aktualną wartość przy interacji, domyślnie na początku wchodzi z indeksem [0] i indeksem [1]. Wynikową reduce jest jedna liczba.  

Powyższy kod stosuje pewne osobliwości języka `js`[^2]. Zresztą w `php` można podobnie[^2].  
Ja nazywam je *hakami*, ale świadczą one bardziej o słabym typowaniu zmiennych, ponieważ konwersja w `js` i w `php` stringa na liczbę może odbywać się poprzez `string*1`, co w niektórych sytuacjach może prowadzić do błędów w&nbsp;przetwarzaniu kodu.  
Dostępna jest w `js` funkcja `parseInt(string)`, z której powinno się korzystać, w `php` zaś np. cast do typu zmiennej `(int)string`. Ale, to tak na marginesie.  
Konwersja zaś liczby na string w powyższym kodzie odbywa się poprzez `+''` gdzie jest dostępna funkcja `toSring(int)`, ale ile to znaków więcej :sweat_smile:.  
Nie zmienia to faktu, że np. w `Python` wykonanie podobnej operacji, czyli dodanie do liczby znaku, będzie skutkowało błędem:
>TypeError: unsupported operand type(s) for +: 'int' and 'str'  
{:class="error"}

## .5.Porównanie długości kodu
Zobaczmy w takim razie wyniki długości kodu *(potraktowałam wszelkie odstępy pomiędzy znakami używane dla czytelności, jako zbędne - i dostanę za to pewnie od przyjaciela po głowie, że to nie po pythonowsku :relaxed: :grin:)*:
```js
//PYTHON=>47
console.log("Python", 
`while len(n)>1:n=str(sum([int(i) for i in n]))`.length)

//PHP => 48
console.log("PHP", 
`while(strlen($n)>1)
$n=array_sum(str_split($n));`.length)

//RUBY =>51
console.log("Ruby", 
`while n.length>1
n=n.chars.map(&:to_i).sum.to_s end`.length)

//JS=>54
console.log("Javascript", 
`while(n.length>1)
n=n.split"".reduce((a,b)=>a*1+b*1+'')`.length)
//split`` powyżej powinno wyglądać tak, ale wolałam wstawić cudzysłów niż slashe
```

**And the winner is: Python :1st_place_medal: :1st_place_medal: :1st_place_medal:**   
Wpierw wydawało mi się, że wygra `Ruby` lub `php`, jednak odnosząc się do uwagi w appendindex [^3], `Python` wygrywa o jeden znak.  
I wydawało by się, że już nic z tego tematu nie można wyciągnąć więcej. Otóż, dokładnie, wydawałoby się. 

## .6.Math
Drążąc temat znalazłam **równanie matematyczne**, które w bardzo prosty i krótki sposób oblicza digital root. Całą teorię można przeczytać, wraz z warunkami na [Wolfram Math World](http://mathworld.wolfram.com/DigitalRoot.html).
```Math
//math, obliczenie digital root
1+(n-1)%9
```
Nie na darmo się mówi już od starożytności, że Matematyka jest królową wszystkich nauk.  
Krócej już się na pewno nie da :heart_eyes:  



## .7.Debugowanie i wyświetlanie
Używając wzoru matematycznego `Ruby` akurat obejmie prym, jeśli do długości kodu wliczymy również wyświetlenie wyniku, dzięki skróconej opcji `p` na `print`  :joy: 

Może należałoby się zastanowić, aby wprowadzić w innych językach jakieś skróty :thinking: 
Zauważcie:
- **PHP**: `var_dump`, `print_r`, `printf`, `echo`.
- **Python**:  `print`,
- **Javascript**: `console.log` - co jest najdłuższe, najbardziej wkurzające i wielu z nas układa sobie funkcję log do stososowania w swoim kodzie.
- A **Ruby** , `p`, po prostu `p`. I to `p` chciałabym zobaczyć we wszystkich językach tutaj wymienionych :stuck_out_tongue:

```rb
p 1+(n-1)%9.to_i
```

**Notatki:**

[^1]: [Dokumentacja PHP - array_sum](https://www.php.net/manual/en/function.array-sum.php)
[^2]: Języki `js` i `php` właśnie poprzez te osobliwości traktowane są jako słabotypowane, przez co  niektórzy zajmujący się kodem uważają je jako języki gorsze.

[^3]: Stringi w pythonie są traktowane wewnętrznie jako lista charów. Można się do nich odnosić i interować poprzez index. Test: `a = 'tekst' print(*a) #result: t e k s t`

