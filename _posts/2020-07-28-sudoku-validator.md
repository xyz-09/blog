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
## Sudoku - na czym polega
Sudoku według [Wikipedii](https://pl.wikipedia.org/wiki/Sudoku){:target="_blank"} jest łamigłóką, w której zadaniem jest wypełnienie diagramu 9 × 9 w taki sposób, aby w każdym wierszu, w każdej kolumnie i w każdym z dziewięciu pogrubionych kwadratów 3 × 3 znalazło się po jednej cyfrze od 1 do 9. 

Wbrew pozorom nie jest to takie łatwe - sama gra nie pociąga mnie zbytnio, ale zadanie jakie ostatnio wykonywałam właśnie na sudoku - już tak :smile:.

Zadaniem było sprawdzenie, czy podany ciąg liczb - spełnia reguły gry - czyli w wierszu i kolumnie są cyfry od 1...9 oraz czy w subgridzie 3 x 3 są cyfry  od 1...9.

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

## Logika dla walidacji
Musimy się zastanowić wpierw nad tym, w jaki sposób sprawdzić wiersze, potem kolumny, a potem poddiagram wielkości 3 x 3. 

Jak dla mnie, najprostszym rozwiązaniem jakie przychodzi do głowy, to sprawdzić czy w wierszu występują duplikaty - jeśli któraś z liczb się powtórzyła, tzn. że diagram jest wypełniony niepoprawnie już w pierwszy kroku sprawdzania. Podobną metodę stosujemy w kolejnych krokach, czyli dla kolumn, a potem do poddiagramu 3 x 3.

## Obiekt Set w `python`
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

## array_unique() i array_flip() dla `php`

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

`array_flip()` natomiast jest ciekawszym rozwiązaniem - zamienia on wartości na klucze i klucze na wartości. Wiemy, że w tablicy klucze nie mogą się powtarzać. Stąd, jeśli klucz się powtórzy - wartość zostanie nadpisana. Zobaczmy jak działa to w praktyce:
```php
<?php
$tablica = [1, 2, 1, 2];
print_r(array_flip($tablica));

/*
OUTPUT:
Array
(
    [1] => 2 // bo jedynka jest na pozycji 0 i 2
             // więc wartością naszego array_flip dla 1 jest liczba 2
             // jako ostatni indeks występowania wartości w pierwotnej tablicy $tablica
             
    [2] => 3 // bo dwójka (jak wskazuje klucz powstałej tablicy) 
             // występuje na miejscu 1 i 3, stąd mamy [2] => 3
)
*/
```
Najważniejszą część kodu mamy obmyśloną. Teraz wystarczy sprawdzić, czy wynik z `array_unique()` lub `array_flip()` jest równy **9**. Jeśli tak - to znaczy, że wiersz jest wypełniony prawidłowo. 

## Zamiana wierszy na kolumny w `Python` i `php`


Przejdźmy do kolumn. Zaczynając swoją przygodę z programowaniem niejednokrotnie człowiek zastanawia się jak przekształcić tablicę zawierającą wiersze na kolumny. Można wymyślać i interować po tablicy, zapisując wartość z poszczególnego wiersza do kolumny. Tylko po co. Pisać kod należy z głową. 

### Pythonowski, uwielbiany `zip`
W `py` możemy użyć uwielbianą przeze mnie funkcję `zip`. 
Jej zastosowanie jest mniej więcej takie:
```py
row = [[1,2],[3,4]]
print(*zip(*row))

# OUTPUT:
# (1, 3)(2, 4)
```
O to właśnie nam chodziło :smile:

### `array_map()` dla `php` i `...` operator
W `php` jest to trochę trudniejsze. Musimy skorzystać z `array_map()`. Czyli zastosowanie określonej funkcji do każdego z elementów tablicy, np.:
```php
<?php
function square($n){
    return ($n * $n);
}

$a = [[1, 2], [3 4, 5]];
$b = array_map('square', $a);
print_r($b);
/*
OUTPUT:
Array
(
    [0] => 1
    [1] => 4
    [2] => 9
    [3] => 16
    [4] => 25
)
*/
?>
```
Oraz z tak zwanego **splat operatora** lub w `js` nazywanego **spred operator**. 
Służy on do "pakowania" i "wypakowywania" wartości np. z tablicy. O tym operatorze mogłby powstać oddzielny wpis. 

Na chwilę obecną zatrzymajmy się na tym, że z niego będziemy korzystać :smile:. 

Jeszcze jedna uwaga, funkcja `array_map()` jako pierwszy ragument przyjmuje funkcję lub anonimową funkcję, jaka ma zostać użyta na kazdym z elemntów tablicy. W naszym przypadku, okreslimy ją na `null`, czyli nic nie musi wykonywać. Dzięki temu otrzymamy z wierszy kolumny :smile:. Kod jest następujący:
```php
<?php
$a = [[1, 2], [3, 4, 5], [5, 6, 7]];
$b = array_map(null, ...$a);
print_r($b);
/*
OUTPUT: 
Array
(
    [0] => Array
        (
            [0] => 1
            [1] => 3
            [2] => 5
        )

    [1] => Array
        (
            [0] => 2
            [1] => 4
            [2] => 6
        )

    [2] => Array
        (
            [0] => 
            [1] => 5
            [2] => 7
        )

)
*/
?>
```


Otrzymując z wierszy kolumny, jesteśmy w stanie sprawdzić, czy cyfry w tak przekształconej tablicy się powtarzają poprzez już wspomnianego **set-a** dla `py` lub `array_unique()` dla `php`.

## Otrzymanie subgrid'a 3 x 3
Kolejny krok walidacji wykonany. Teraz musimy uzyskać z naszej tablicy subdiagram o wymiarze 3 x 3. 

