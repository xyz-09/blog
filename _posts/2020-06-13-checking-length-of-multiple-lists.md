---
layout: post
title: Sprawdzanie długości kilku tablic - 1 linijka kodu
date: 2020-06-13 12:46
category: [programowanie, python]
author: Edyta Jozdowska
tags: [python]
excerpt: 
published: false
---

Post będzie krótki, bo samo zadanie jest łatwe. Jest jedno ograniczenie - **kod ma być w jednej linijce**. 
# Cel: sprawdzenie czy wszystkie listy mają tą samą długość
Załóżmy, że naszymi danymi wejściowymi są:
```py
t1 = [1, 2, 5, 8]
t2 = [1, 5, 8]
```
By sprawdzić ich długość, wystarczy nam porównać:
```py
print(len(t1) == len(t2))

# OUTPUT: False
```
Tak, dla dwóch tablic zadanie jest proste nawet dla początkującego kodera. Utrudnijmy je sobie, dodając dodatkową listę.
Wciąż proste :smile: , więc co to za utrudnienie?
```py
t1 = [1, 2, 5, 8]
t2 = [1, 5, 8]
t3 = [2, 6, 7]

print(len(t1) == len(t2) == len(t3))
```
Utrudnieniem jest jeśli liczba list do sprawdzenia jest zmienna. Zmieńmy trochę zapis naszych danych wejściowych:
```py
t = [ [1, 2, 5, 8], [1, 5, 8], [2, 6, 7] ]

```