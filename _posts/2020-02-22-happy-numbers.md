---
layout: post
title: Happy numbers
date: 2020-02-22 05:50
category: ["bitwy programowania","php","js","python"]
author: Edyta Jozdowska
tags: [php, js, python]
excerpt: O liczbach, które matematycy nazwali wesołymi, choć dla mnie są szczęśliwymi.
published: true
---
- [Wesołe liczby, czyli które?](#weso%c5%82e-liczby-czyli-kt%c3%b3re)
- [Python - happyNumbers](#python---happynumbers)
- [PHP - happyNumbers](#php---happynumbers)
- [Javascript - happyNumbers](#javascript---happynumbers)
- [Błąd dużych liczb? Nie tylko.](#b%c5%82%c4%85d-du%c5%bcych-liczb-nie-tylko)
{:class='content_list'}


Jakiś czas temu wspominałam, że biorę udział w ["bitwach programowania"](../kategoria/bitwy%20programowania/) na portalu [CodingGames](https://www.codingame.com/){::target="_blank"}. Na tym samym portalu, prócz bitew, można rozwiązywać ciekawe zadania programistyczne.  

W ramach jednego z zadań trzeba było napisać algorytm który obliczy **"liczby wesołe"**.  
Wczoraj miałam z nimi właśnie "randkę" :wink:
## Wesołe liczby, czyli które?
**Liczbą wesołą**[^1] jest taka liczba, której suma potęg poszczególnych cyfr, aż do jednej cyfry wynosi 1.  
Przykład:
```config
23 

2*2 + 3*3 = 4 + 9 = 13 ->
1*1 + 3*3 = 1 + 9 = 10 -> 
1*1 + 0*0 = 1

23 -> liczba wesoła, choć ja wolę nazywać je szczęśliwymi
``` 


Rozłóżmy algorytm obliczania liczb wesołych na czynniki pierwsze. 

```graph
graph TD
A((n))-->C[Zsumuj kwadraty wszystkich cyfry<br/>składające się na liczbę n]
G.->|nie|C
C-->G{suma jest cyfrą<br/>?}
G.->|tak|D{cyfra == 1<br/>?}
D.->|tak|E(Liczba jest wesoła)
D.->|nie|F(Liczba nie jest wesoła)
classDef decision fill:#fbfbd4,stroke:#444,stroke-width:1px
classDef inp fill:#f7f7f7,stroke:#444,stroke-width:1px
class A,B,E,F,H inp;
class G decision;
classDef wynik fill:#d2e5fb,stroke:#96c5fb
class H wynik;
```
Algorytm postępowania jest dość prosty. Co ciekawe, powyższe działania matematyczne na liczbach niewesołych doprowadzą nas do wyniku 4. Jeśli nie wierzysz, wypróbuj.  
~~ Suma kwadratów liczb niewesołych doprowadzając je do 1 cyfry będzie równa **4**, w większości przypadków - nie sprawdzałam wszystkich liczb :wink: ~~  
~~Jeśli znajdziesz liczbę niewesołą, której suma kwadratów nie jest równa 4 [**daj mi znać @.**](mailto:jozdowska.edyta@protonmail.com)~~  
Jednak natknęłam się na takową: **12587781** - liczba ta ostanią cyfrę, będącą wynikiem sumy potęg ma 2.

{% include _posts/_examples/happyNumber.html %}

Przejdźmy zatem do przełożenia algorytmu na kod.

## Python - happyNumbers
 Zacznę od python'a

```python
def imHappy(n) : 
    while (1) : 
        if (n == 1) : # 1 z racji bycia 1 jest wesoła
            return 1
        n = sum([int(i) ** 2 for i in str(n)]) 
        if (n>1 and len(str(n))==1) : 
            return 0
    
n = 23
print(n,":)") if imHappy(n) else print(n,":(")
```

Wytłumaczenia może wymagać linijka `sum([int(i) ** 2 for i in str(n)]) `.  
Linijka ta odpowiada za główne nasze obliczenia sumy kwadratów cyfr składających się na liczbę. Używam `str` by liczbę przkonwertować na typ string - tak łatwiej się interuje (_przynajmniej mi_). Natomiast `** 2` oznacza do potęgi 2, jest krócej niż używanie `pow()`.
## PHP - happyNumbers

```php
$n = 23;
function imHappy($n){
    while(1){
        if($n == 1) return true;
        
        //reduce czyli doprowadź operację na tablicy do jednej wartości
        $n = array_reduce(str_split($n), function($a, $b){
            return $a + ($b ** 2);
        });        
        
        if($n > 1 && strlen($n) == 1) return false;
    }
    return false;
}

var_dump(imHappy($n));
```

Powyższe, główne obliczanie można by było napisać zamiast na `array_reduce()` to na połączeniu `array_sum()` i `array_map()`. Jednak ostatnio jakoś lubię reduce, choć wiem, że jest "najcięższy".

```php
        $n = array_sum(array_map(function($a){          
          return $a ** 2;
        }, str_split($n)));
```

## Javascript - happyNumbers

```js
let n = 23
const imHappy = (n) => {
    while(n){
        if(n == 1) return true;
        n = (n + '').split``.reduce((a, b) => a + (b ** 2), 0);
        if(n == 4) return false
    }
    return false
}

console.log(imHappy(n) ? `${n} :)` : `${n} :(`);
```
Tutaj wyjaśnienia może wymagać jedynie **0** w reduce. Otórz na starcie interacji po tablicy `reduce()` pobiera  `a` i `b` jako pierwszy i drugi indeks tablicy, czyli `a = arr[0]` a `b = arr[1]`. Jeśli natomiast zainicjujemy ją z wartością np. 0, to na starcie naszych obliczeń zmienna `a = 0` a `b = arr[1]`.

## Błąd dużych liczb? Nie tylko.
Przy rozwiązywaniu tego zadania natknęłam się na pewien błąd. Warto takie rzeczy sobie zapisywać w pamięci. 
Błąd odnosi się w tym przypadku do dużych liczb podawanych zarówno w `js` i w `php`. Ale o tym w moim wpisie odnośnie ["Double precision"]("/double-precision.html")
<br/><br/>


[^1]:[HappyNumbers w Wikipedii](https://en.wikipedia.org/wiki/Happy_number){:target="_blank"}