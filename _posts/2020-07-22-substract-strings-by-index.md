---
layout: post
title: Działanie matematyczne liczb w tablicy po wskazanym indeksie
date: 2020-07-22 18:40
category: Pyton
author: Edyta Jozdowska
tags: ['py','python']
excerpt: 
published: true
---

Podczas pisania określonego zadania natykamy się na szereg pytań i pojedynczych zagadnień, które musimy wdrożyć by całość składała się w jedną funkcjonalność. Te pojedyncze zagadnienia mogą zainspirować nas lub innych do napisania krótkich zadań. Tak też było tym razem. 

Pisząc jeden kod w py zadałam pytanie mojemu facetowi - jak rozwiązać jeden problem. Chodziło o odejmowanie poszczególnych liczb z kilku tablic po wskazanym indeksie. Już tłumaczę o co chodzi na przykładzie - przykłady zawsze bardziej przemawiają :smile:  
```py
a = [1, 2, 3, 4, 5]   # jedna tablica zawierającą liczby
b = [1, 2, 3, 4]     # druga tablica zawierającą liczby

indekses = [1, 3]  # indeksy, które wskazują, na których liczbach mamy 
                   # konkretnie wykonać dane działanie matematyczne

# OUTPUT => 2 - 2 = 0 i 4 - 4 = 0
```
A, że chłop jest w `py` lepszy, moje pytanie było zasadne. Niestety, nie otrzymałam odpowiedzi - za to zainspirowałam go do napisania clusha (czyli 15minutowego zadania na codingames jakie należy rozwiązać).

Swój problem rozwiązałam i też postanowiłam napisać clush'a, który ściśle będzie odpowiadał zagadnieniu o jakie pytałam. Po rozwiązaniu, wydało mi się to bardzo proste i banalne. Jak się okazuje niekoniecznie. Podobno rozwiązanie tego zadania w 15 minut, to mało - takie komentarze otrzymałąm pod zgłoszonym zadaniem do moderacji. Tyle, że ja znalazłam rozwiązanie właśnie w takim czasie :smile:

Poniżej kod w `py`, który następnie będę tłumaczyć:

```py
idx = [1, 2, 4, 5] # indeksy na których mamy wykonać odejmowanie
a = [
      [1, 1, 1], 
      [1, 1, 2], 
      [1, 1, 2], 
      [5, 1, 2], 
      [1, 5, 2], 
      [1, -5, 2]
] # nasza tablica z liczbami

# kod
if  (
    # jeśli są wskazane co najmniej dwa indeksy, co odpowiada dwóm liczbom
    len(idx)>1 and 
    # jeśli podtablice tablicy a są tej samej długości
    (len(set([*map(lambda x: len(x), a)])) == 1 ) and
    # jeśli wszystkie indeksy znajdują się w tablicy
    False not in [*map(lambda x: x < len(a), idx)] 
    ):
    # i tutaj zaczynają się czary :
  print(*(i[0] - sum(i[1:]) for i in zip(*([a[c] for c, d in zip(idx, idx)])))) 
else:
  print("Invalid")
# OUTPUT: -2, 0 -4
```
Omówię jedynie "czary mary" w stylu `pythona`
Jak zazwyczaj w `py` zaczynamy od końca:
`c, d in zip(idx, idx)` - ponieważ potrzebujemy pierwszy i kolejny indeks z `idx`
`zip(*([a[c] for c, d in zip(idx, idx)])` => `(1, 1, 1, 1) (1, 1, 5, -5) (2, 2, 2, 2)`
W pierwszym "nawiasie" `()`  mamy liczby wskazane poprzez indeks na pozycji zero, w przypadku przykładu jest to **1**
Adekwatnie w drugim i trzecim 
