---
layout: post
title: Wyzwanie? The River I
date: 2020-02-02 06:03
category: ['bitwy programowania', 'php', 'js', 'python']
author: Edta Jozdowska
tags: [math,python,js,ruby,php,battle]
excerpt: 
published: true
---

[Ostatnie zadanie w codingGame](https://www.codingame.com/ide/puzzle/the-river-i-) o tytule **River-I** uświadomiło mi jedną, ważną rzecz. Czasem przekombinowanie prowadzi na manowce. Treść zadania brzmiała tak:

```config
# TREŚĆ ZADANIA 

A digital river is a sequence of numbers where every 
number is followed by the same number plus the sum 
of its digits. 
In such a sequence 123 is followed by 129 
(since 1 + 2 + 3 = 6), 
which again is followed by 141.

We call a digital river river K, if it starts 
with the value K.

For example, river 7 is the sequence beginning with 
{7, 14, 19, 29, 40, 44, 52, ... } and river 471 
is the sequence beginning with {471, 483, 498,...}

Digital rivers can meet. This happens when two 
digital rivers share the same values. 
River 32 meets river 47 at 47,  
while river 471 meets river 480 at 519.

Given two meeting digital rivers print out 
the meeting point.

(Idea : BIO'99)
```
{:class="w50"}

```config
# INPUT:

    Line 1: The first river r1.
    Line 2: The second river r2.

#  OUTPUT:

    Line 1 : The meeting point of the rivers given.

# CONSTRAINTS:

    0 < r1 ≤ 20000000, 0 < r2 ≤ 20000000

# EXAMPLE:

    Input:
       r1: 32, r2: 47
    Output:
        47

# TESTS: 

01 We will meet at 47       02 r1 < r2
03 r1 > r2                  04 More than... I.
05 More than... II.         06 River 2489
07 River 13                 08 Primes
09 Even bigger

```
{:class="w50"}

Na pierwszy rzut oka do zastosowania jest [digital root](../digital_root), jednak tylko w swojej pierwszej części odpowiedzialnej za sumowanie więc efektywny wzór matematyczny nie zda nam się na nic.
{:class="clear"}

Zastanówmy się jak możemy wykonać zadanie:
```graph
graph TD
A((r1)) & B((r2))-->C[Zsumuj wszystkie cyfry<br/>składające się na liczbę r1 i r2]
G.->|nie|C
C-->G{r1=r2<br/>?}
G.->|tak|H(Wypisz przecięcie)
classDef decision fill:#fbfbd4,stroke:#444,stroke-width:1px
classDef inp fill:#f7f7f7,stroke:#444,stroke-width:1px
class A,B,E,F,H inp;
class G decision;
classDef wynik fill:#d2e5fb,stroke:#96c5fb
class H wynik;
```
To podstawowy graph, jednak pomija on jedną istotną informację. **Punkt przecięcia może być przy 3 interacji liczby r1 i 5 interacji liczby r2.** Poszczególne interacje należałoby gdzieś zapisać np. **w tablicy**. Tak można wywnioskować czytając treść zadania, więc powyższy graph musimy zmodyfikować.

```graph
graph TD
A((r1)) & B((r2))-->C["Zsumuj wszystkie cyfry<br/>składające się na liczbę r1[ i ] i r2[ i ]<br/>w iteracji"]
C--> I["zapisz r1[ i ] w tablicę"] & J["zapisz r2[ i ] w tablicę"] 
I & J-->K[/"Jeden z el. w tablicy r1 lub r2<br/>równy jest któremuś  el. tablicy r2 lub r1"/]
K.->|tak|H(Wypisz przecięcie)
K.->|nie|C

classDef decision fill:#fbfbd4,stroke:#444,stroke-width:1px
classDef inp fill:#f7f7f7,stroke:#444,stroke-width:1px
classDef note fill:#fbfbd4,stroke:#444,stroke-width:1px,stroke-dasharray:2
classDef added fill:#efcbcb,stroke:#ff7070
class A,B,E,F,H inp;
class G decision;
class K note;
class I,J added;
classDef wynik fill:#d2e5fb,stroke:#96c5fb
class H wynik;
```

Przekonana o słuszności swojego wyboru przystąpiłam do kodowania. Nie chcąc przekształcać zmiennych `$r1` i `$r2` przypisałam je do zmiennych `$a` i `$b` i na tych wartościach napisałam resztę kodu:
```php
fscanf(STDIN, "%d", $r1);
fscanf(STDIN, "%d", $r2);

$a=[$r1];
$b=[$r2];
$i=0;
$r=[];

while(empty($r)){
   $a[] = array_sum(str_split($a[$i])) + $a[$i];
   $b[] = array_sum(str_split($b[$i])) + $b[$i];
   $i++;
   $r = array_intersect($a, $b);
}

echo implode('', $r);
```
`implode()` dla zmiennej `$r` jest dlatego, gdyż wynik z `array_intersect()` jest zwrotem dwóch tablic. Spłaszczam więc je do poszczególnych wartości, a że spodziewam się jedynie jednej wartości, nie oddzielam ich niczym, stąd `''`.

Zapuszczam testy:

|TEST 1|Test 2|TEST 3|Test 4|TEST 5|Test 6|TEST 7|Test 8|TEST 9|
|-|-|-|-|-|-|-|-|-|
|:green_heart:|:green_heart:|:x:| | | | | |

**Coś jest źle!** 

Sprawdzam :thinking:. Przecież nie tylko punkty z tablicy **a** mogą być w **b** ale i na odwrót. Poprawiam więc kod w ostatniej linijce pętli `while`:
```php
  $r = array_intersect($a, $b) ??  array_intersect($b, $a);
```
Funkcja `array_intersect()` sprawdza jedynie elementy pierwszego argumentu, czy zawarte są w tablicy drugiego argumentu. Potrzeba więc sprawdzić na odwrót.  
Natomiast `??` służy w `php` jak `|` w `js` i oznacza jeśli nie pierwszy to drugi. Konstrukcja ta znacznie upraszcza kod i pozwala uniknąć `if'a`.

Zapuszczam testy:

|TEST 1|Test 2|TEST 3|Test 4|TEST 5|Test 6|TEST 7|Test 8|TEST 9|
|-|-|-|-|-|-|-|-|-|
|:green_heart:|:green_heart:|:green_heart:|:green_heart:|:green_heart:|:green_heart:|:green_heart:|:green_heart:|:x:  |
 
 **Co jest :angry: ?**  
 Jeszcze raz sprawdzam testy, może coś poszło nie tak:  

|TEST 1|Test 2|TEST 3|Test 4|TEST 5|Test 6|TEST 7|Test 8|TEST 9|
|-|-|-|-|-|-|-|-|-|
|:green_heart:|:green_heart:|:green_heart:|:green_heart:|:green_heart:|:green_heart:|:green_heart:|:green_heart:|:x:  | 
 
 Nie wiem ile bym nad tym siedziała, być może do tej pory. Na chwilę obecną nie jestem w stanie tego ocenić. Mój przyjaciel, który rozwiązywał to samo zadanie, tyle, że w `python` natknął się na podobny problem. Jemu jednak rozwiązanie go poszło szybciej i mi podpowiedział, że nie potrzeba do wykonania zadania tablic. 
 
 Skoro nie tablice to znaczy, że wartości jakoś sobie odpowiadają w każdej z interacji. Tutaj przyszedł mi na myśl TEST 3, w którym wejściowe wartości były `$r1 > $r2`. 
 
 Sprawdzając i debugując wartości z kodu na niższych liczbach doszłam do wniosku, że faktycznie, nie jest potrzebna tablica i&nbsp;przechowywanie wartości od samego początku kodu. **Wystarczy sprawdzić, która z tych liczb jest mniejsza i ją zsumować**. Wynik zapisać do następnej interacji, jeśli warunek, że są sobie równe nie jest spełniony. 
 Powinno się przyjąć jakieś ograniczenie, które zostało określone w CONSTRAINTS `$r1` i `$r2` < **20000000** i wtedy przerwać kod, gdyby liczby nie były nigdy sobie równe. **W praktyce zawsze powinniśmy  mieć warunek opuszczający zapętlenie takie jak while**.  

 Mniej więcej wygląda to tak:
 
```graph
graph TD
A((r1)) & B((r2))-->C{"Sprawdź,<br/>czy wartość<br/>r1 i r2 są<br/><strong>różne</strong>"}
C.->|tak|D["Zsumuj tą, która jest mniejsza"]
D-->E["Uaktualnij zsumowaną wartość"]
E.->|powrót do pętli|C
C.->|nie|O["Wyjdź z pętli"]-->H(Wypisz r1 lub r2)


classDef decision fill:#fbfbd4,stroke:#444,stroke-width:1px
classDef inp fill:#f7f7f7,stroke:#444,stroke-width:1px
classDef note fill:#fbfbd4,stroke:#444,stroke-width:1px,stroke-dasharray:2
classDef added fill:#efcbcb,stroke:#ff7070
classDef wynik fill:#d2e5fb,stroke:#96c5fb
class H wynik;
class A,B,E,F,H inp;
class C,O decision;
class K note;
class O added;
```
 
 Zabrałam się za pisanie.

 ```php
fscanf(STDIN, "%d", $r1);
fscanf(STDIN, "%d", $r2);

$a=$r1;
$b=$r2;

function sum($i){    
    return array_sum(str_split($i)) + $i; 
}

while($a != $b && ($a <= 20000000 || $b <= 20000000 )){    
   $a > $b ? 
   $b = sum($b):
   $a = sum($a);
}

echo $a;
```
**Krótkie wyjaśnienie.** Konstrukcja `warunek  ? prawda : fałsz` odpowiada zwykłej konstrukcji `if` zapisanej w uproszczonej formie i jest często stosowana w `php` i w `js`. Przynamniej przeze mnie.

Czas na testy:  

|TEST 1|Test 2|TEST 3|Test 4|TEST 5|Test 6|TEST 7|Test 8|TEST 9|
|-|-|-|-|-|-|-|-|-|
|:green_heart:|:green_heart:|:green_heart:|:green_heart:|:green_heart:|:green_heart:|:green_heart:|:green_heart:|:green_heart:| 

 :hugs: :hugs: :hugs: :hugs: :hugs: :hugs: :hugs: :hugs:  

**Wszystkie testy zaliczone.** Z tej batalii wyszłam zwycięsko.

 Nie zdradzę, co jestem winna przyjacielowi za podpowiedź :rofl:, ale zasłużył sobie w pełni. 