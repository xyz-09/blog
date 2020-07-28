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
