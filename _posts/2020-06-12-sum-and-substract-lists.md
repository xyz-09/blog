---
layout: post
title: Dodawanie i odejmowanie poszczególnych wartości tablicy
date: 2020-06-12 21:28
category: [programowanie,python]
author: Edyta Jozdowksa
tags: [python]
excerpt: 
published: true
---
Jestem leniwa, przyznaję - jak każdy koder :smile: Dlatego wymyślam upraszczacze i piszę skrypty, które zautomatyzują moją pracę. 

Ostatnio zmierzyłam się z "problemem" automatycznego generowania wyników firmy, w której pracuję, ale nie o tym będzie post. Będzie on traktował o problemie, na jaki natknełam się podczas pisania kodu rozwiązującego powyższe zagadnienie. 

Problem to odjęcie od siebie kilku wartości. Wydaje się banalne: bierzemy `a` odejmujemy `b` ewentualnie odejmujemy `c`. **Tak - wszystko to prawda**, ale co gdy nie mamy `a, b, c`, a do dyspozycji mamy `[a, b, c]`, w dodatku mamy odjąć od siebie jedynie `a` i `c`, dla utrudnienia dodam, że `a = [1, 1, 1]`, `b = [2, 1, 5]`, a `c = [1, 5, 8]`.

Swój kod napisałam w `py`, z tego powodu, że nie muszę w konkretnym miejscu zamieszczać moich skryptów. Odpalam terminal (CMD na windows), wpisuje `python ścieżka/do/pliku.py` i uruchamiam kod - wygoda :smile: W dodatku w `py` jest parę przydatnych funkcji o czym niżej. 

# Dane wejściowe:
```py
Dict = {"a":[1, 1, 1], "b": [2, 1, 5], "c": [1, 5, 8]} # to słownik z wartościami do odjęcia
b = ["a", "c"] # to wskazanie indeksów słownika, jakie mamy od siebie odjąć
```
## Zadanie i rezultat:
**Odjąć wartości `a` od `c` otrzymując:**
```py
d = [0, -4, -7]
```

Pierwszym krokiem do rozwiązania mojego "zadania" było napisanie zamiast różnicy to `sumy`. Dlaczego w ten sposób?  
Otóż `python` ma wbudowaną funkcję `sum`, która operuje na wartościach tablicy, stąd łatwiej było zacząć od tego. Jako cel postawiłam sobie rozwiązać powyższe w jednej linijce kodu. Bez dodatkowych funkcji, bez importowania dodatkowych bibliotek. 
Czysty, własny kod. 

## Funkcja `zip` w py
Python ma bardzo przydatną funkcję w swoim asortymencie `zip()`. 
Funkcja `zip ()` pobiera interacje z tablicy (może wynosić zero lub więcej), agreguje je w krotkę i zwraca. Przyjżyjmy się jej bliżej:
```py
a = [1, 20]
b = [5, 10]

print(*zip(a, b))

# OUTPUT: (1, 5) (20, 10)
```


Stąd wiedziałam, że `zip` mi się przyda. Jej wynikiem jest zagregowane połączenie tablic po odpowiadających im indeksach, w tym przypadku `0` i `1`. `*` gwiazdka na początku służy do rozpakowania wartości - to na marginesie.  

Wyposażona w odpowiednią wiedzę przystąpiłam, jak wspomniałam wcześniej, do sumy. Poniżej pełny kod, który omówię w następnych akapitach.
## Sumowanie wartości tablicy po wskazanych w zmiennej `b` indeksach
```py
Dict = {"a":[1, 1, 1], "b": [2, 1, 5], "c": [1, 5, 8]}
b = ["a", "c"]

print([sum(i) for i in zip(*([a[c] for c, d in zip(b, b)]))])

# OUTPUT: [2, 6, 9]
```

### Omówienie:
Pierwszy `zip(b, b)`[_ten od końca, bo tutaj kod czytamy od prawej_] ma za zadanie zagregować jedynie te klucze określone w zmiennej `b`. Printując wynik otrzymamy same wartości, które będziemy w stanie użyć dalej, czyli `a c`. Zmienna `d` jest podana dla porządku - jednak nie jest wykorzystana:

```py
b = ["a", "c"]

print(*[c for c, d in zip(b, b)])

# OUTPUT: a c
```
Skoro mamy wartości `a` i `c` możemy odwołać się do indeksów w słowniku `Dict`:
```py
Dict = {"a":[1, 1, 1], "b": [2, 1, 5], "c": [1, 5, 8]}
b = ["a", "c"]

print(*[Dict[c] for c, d in zip(b, b)])

# OUTPUT: [1, 1, 1] [1, 5, 8] 

```
Kolejnie znów je `zipujemy` by przekazać wartości dalej do kodu dla funkcji `sum` i tak otrzymujemy pełne rozwiązanie, jednolinijkowe dla `sum` poszczególnych elementów tablicy. Nie będę powtarzać kodu, jest on podany wyże w akapicie **Sumowanie wartości tablicy po wskazanych w zmiennej b indeksach**

**OK, mam sumę i co dalej**. Właśnie tutaj zrodził się drobny problem, gdyż funkcja `sum` jest dostępna w `py` bez dodatkowych importów. Nie ma natomiast swojego przeciwieństwa, czyli odejmowania - można by wysnuć wniosek, że w `pythonie` głównie dodaje się wartości :grin:  

**I jak dalej z tym żyć?** Okazuje się że można :wink:  
## Odejmowanie wartości tablicy po wskazanych w zmiennej `b` indeksach
Zakładając, że każada wartość przekazywana dalej jest listą/tablicą i od pierwszej wartości odejmiemy sumę pozstałych wartości listy/tablicy otrzymamy poszukiwany wynik. Funkcję `sum` zamieniamy na działanie `[i[0] - sum(i[1:])` i otrzymujemy `[0, -4, -7]`. Zapewniam was, że to czary :wink::
```py
Dict = {"a":[1, 1, 1], "b": [2, 1, 5], "c": [1, 5, 8]}
b = ["a", "c"]

print([i[0] - sum(i[1:]) for i in zip(*([a[c] for c,d in zip(b,b)]))])

# OUTPUT: [0, -4, -7] 

```
Usłyszałam, że powyższy kod nie będzie działał dla większej liczby indeksów niż dwa. **Będzie działać**  
Usłyszałam, że powyższy kod działa jedynie dla 3 indeksów. **Działa na 2, 3 i więcej.**  

Jedynym ograniczeniem, jest by długość tablic odejmowanych od siebie była identyczna, ale dla danych jak np. zestawienia, które porównujemy to nie problem **One będą miały taką samą długość**.  

Poniżej kod do zabawy, tak przy piątku i długim weekendzie :wink: 
<iframe height="400px" width="100%" src="https://repl.it/repls/ItchyTraumaticLegacysystem?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
