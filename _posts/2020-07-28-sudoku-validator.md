---
layout: post
title: Walidacja sudoku
date: 2020-07-28
category: [programowanie, php, python, "bitwy programowania"]
author: Edyta Jozdowska
tags: [php, python ]
excerpt: Dwa skrypty na walidację sudoku napisane w pythonie i php oraz omówienie różnic między nimi.
published: true
---
# Sudoku - na czym polega
Sudoku według [Wikipedii](https://pl.wikipedia.org/wiki/Sudoku){:target="_blank"} jest łamigłóką, w której zadaniem jest wypełnienie diagramu 9 × 9 w taki sposób, aby w każdym wierszu, w każdej kolumnie i w każdym z dziewięciu pogrubionych kwadratów 3 × 3 znalazło się po jednej cyfrze od 1 do 9. 

Wbrew pozorom nie jest to takie łatwe - sama gra nie pociąga mnie zbytnio, ale zadanie jakie ostatnio wykonywałam właśnie na sudoku - już tak :smile:.

Zadaniem było sprawdzenie czy podany ciąg liczb - spełnia reguły gry - czyli w wierszu i kolumnie są cyfry od 1...9 oraz czy w subgridzie 3 x 3 są cyfry  od 1...9.

Danymi wejściowymi był ciąg znaków reprezentujący wypełniony już diagram. Po 9 znaków w każdym wierszu. Powtarzany 9 razy:
```bash
# INPUT:

1 2 3 4 5 6 7 8 9
4 5 6 7 8 9 1 2 3
7 8 9 1 2 3 4 5 6
9 1 2 3 4 5 6 7 8
3 4 5 6 7 8 9 1 2
6 7 8 9 1 2 3 4 5
8 9 1 2 3 4 5 6 7
2 3 4 5 6 7 8 9 1
5 6 7 8 9 1 2 3 4

# OUTPUT

true - dla poprawnie wypełnionego sudoku, 
false - gdy jest chociaż jeden błąd w wypełnionym diagramie

```
Powyższy diagram jest poprawnie wypełnionym sudoku. 

# Logika dla walidacji
Musimy się zastanowić wpierw nad tym w jaki sposób należy sprawdzić wiersze, potem kolumny, a potem poddiagram wielkości 3x3. 

Jak dla mnie najprostszym rozwiązaniem jakie ciśnie się od razu do głowy, to sprawdzić czy w wierszu występują duplikaty - jeśli któraś z liczb się powtórzyła, tzn. że diagram jest wypełniony niepoprawnie już w pierwszy  kroku sprawdzania. 

W `py` jak i w `js` mamy do dyspozycji specjalny typ danych zwany **Set** - jest to obiekt, który przetrzymuje w sobie **TYLKO UNIKALNE WARTOŚCI**. 

Przyjżyjmy się przykładowi. Załóżmy, że mamy listę / tablicę przypisaną do zmiennej **tablica**. Chcemy z niej otrzymać **set**:

```py
tablica = [1, 2, 1, 2]
set_z_tablica = set(tablica)

print(set_z_tablica)

# OUTPUT:
# {1, 2}
```
Tak sety nam się w walidacji sudoku przydadzą. Zobaczmy pierwszy wiersz naszych danych wejściowych:
```py
wiersz = [1, 2, 3, 4, 5, 6, 7, 8, 9]
print(set(wiersz))
# OUTPUT:
# {1, 2, 3, 4, 5, 6, 7, 8, 9}
```
No tak ale w taki sposób porównywanie jest bez sensu. Jeśli w naszym **set-cie** przekształconym z wiersza długość elementów będzie **równa 9** to znaczy, że wiersz jest wypełniony prawidłowo. Jeśli, któraś liczba się powtórzy, **set** będzie krószy, bo zduplikowana wartość wystąpi jedynie raz:
```py
wiersz = [8, 9, 1, 2, 3, 4, 5, 6,7]
print(len(set(wiersz)))

# OUTPUT:
# 9 
```
Ok. Wspomniałam, że w `py` i w `js` i pewnie w jeszcze kilku innych językach programowania są **set-y**,a  co z `php`.

Otórz w `php` też wstępują **set-y**, ale potrzebna jest do tego [dodatkowa biblioteka](https://www.php.net/manual/en/class.ds-set.php){:target="_blank"}. Jednak nie będzie ona dostępna wszędzie. Na szczęściw mamy dwie inne możliwości jesli chodzi o `php`. Albo wykorzystamy `array_unique()` albo `array_flip()`. 

```php
<?php

$tablica = [1,2,1,2];
print_r(array_unique($tablica));

/* 
OUTPUT: 
Array
(
    [0] => 1
    [1] => 2
)
*/
```
`array_unique()` działa dość intuicyjnie - tworzy nową tablicę, ze zmiennej, tylko z unikalnymi wartościami.
`array_flip()` natomiast jest ciekawszym rozwiązaniem - zamienia on wartości na klucze i klucze na wartości. Wiemy, że w tablicy klucz nie mogą się powtarzać. Stąd, jeśli klucz się powtórzy - wartość zostanie nadpisana. Zobaczmy jak działa to w praktyce:
```php
<?php
$tablica = [1, 2, 1, 2];
print_r(array_flip($tablica));

/*
OUTPUT:
Array
(
    [1] => 2
    [2] => 3
)
*/
```



