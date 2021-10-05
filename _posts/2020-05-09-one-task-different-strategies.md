---
layout: post
title: Jedno zadanie, różne strategie
date: 2020-05-09 12:21
category: programowanie
author: Edyta Jozdowska
tags: [js]
excerpt: 
published: true
---

Każdy z nas ma różne spojrzenie na świat, na politykę, na społeczeństwo, na miłość, przyjaźń, rodzinę .... można by wymieniać tak długo. Czasami spotkamy się w punkcie wspólnym z innymi, czasem się miniemy.  
W zależności od zdobytych doświadczeń i&nbsp;założonego celu stosujemy też różne strategie. A w kodowaniu jest jak w życiu :smile: 

Posłużę się tutaj prostym przykładem.  
Załóżmy, że chcemy na konsoli wypisać `'a'` jeśli `b > 0` lub `'c'` jeśli jest mniejsza.
Najprostszym sposobem na to zadanie jest zrobić prostego if'a
```js
if(b > 0) console.log('a')
else console.log('c')
```

Drugim podejściem jest zastosowanie operatora warunkowego _**ternary operator (ang)**_  np.:
```js
console.log(b > 0 ? 'a' : 'c')
```
Możemy też jednak użyć zupełnie innej strategii :smile:

```js
console.log('ca'[(b > 0) * 1])
```
Wygląda jak by ktoś coś pokręcił? Nic bardziej mylnego.
1. ciąg `'ca'` traktujemy jako listę gdzie na pozycji `0` jest **c**, a na pozycji `1` jest **a**
2. warunek `b > 0` da nam w wyniku `true` lub `false` 
3. przemnożenie typu `boolean` przez `1` jest najprostszym sposobem na uzyskanie w `js` z tego typu **liczby**, co&nbsp;adekwatnie da nam `1` dla `true` i `0` dla `false`

Rozwiążmy powyższe dla `b = 10`:
```js
b = 10
// b > 0 => true
// true * 1 = 1

'ca'[( 10 > 0 ) * 1] /* == */ 'ca'[1 * 1] /* == */ 'ca'[1]
// OUTPUT => a, będące na pozycji 1 naszej listy
```

Można stwierdzić: wszystko pięknie, tylko po co takie udziwnianie, przecież to czyste popisywanie się jak w przypadku  
`5 * 2` == `5 << 1`. W dodatku może być zaprzeczeniem jednej z zasad programowania **KISS** [**K**eep **i**t **s**imple **s**tupid], co w wolnym tłumaczeniu znaczy, aby nie udziwniać, czegoś co może być proste.  

Oczywiście w powyższym taki kod faktycznie mija się z celem. Najbardziej optymalnym jest **ternary**, ale czy zawsze tak będzie?

## Przykład zastosowania

Otrzymujemy do naszego programu jako dane wejściowe 4 liczby, załóżmy `8, 23, 18, 25`, przypiszmy je sobie do zmiennych:
```js
let [a, b, c, d] = [8, 23, 18, 25];
// przy okazji, tak też można 
// a = 8, b = 23, c = 18, d = 25 
```

Naszym zadaniem jest napisanie **jak najkrótszego kodu**, który będzie sprawdzał warunki (poniżej) i w zależności od wyniku poda odpowiednią wartość `S`, `N`, `E`, `W`, `SE`, `SW`, `NE` i `NW`. Gwoli ścisłości, nie ja to wymyśliłam. Jest to jedno z rozwiązań zadania [Power of Thor](https://www.codingame.com/ide/puzzle/power-of-thor){:target="_blank"} na codingames.  
I tak:
1.  jeśli wartość `b` > `d` wypisz literę `S` i **zwiększ** wartość `d` o `1`, 
2.  jeśli wartość `b` < `d` wypisz literę `N` i **zmniejsz** wartość `d` o `1`, 
3.  jeśli wartość `a` > `c` wypisz (lub dodaj) literę `E` i **zwiększ** wartość `c` o `1`,
4.  jeśli wartość `a` < `c` wypisz (lub dodaj) literę `W` i **zmniejsz** wartość `c` o `1` 

W standardowym, nieudziwnionym kodzie mielibyśmy mniej więcej taki zapis:
```js
let [a, b, c, d] = [8, 23, 18, 25];
let m = '';
if (b > d) m = 'S', d++;
if (b < d) m = 'N', d--;
if (a > c) m += 'E', c++;
if (a < c) m += 'W', c--;

console.log(m)
// OUTPUT => NW 
// bo d = 25 > b = 23 i a = 8 < c = 18
```

To teraz rozważmy taki zapis powyższego *[uwaga, bo będzie trochę komentarzy w kodzie]*:
```js
let [a, b, c, d] = [8, 23, 18, 25];

let diff_bd = Math.sign(b - d), // 23 - 25 = Math.sign(-2) => -1 
    diff_ac = Math.sign(a - c); //  8 - 18 = Math.sign(-10) => -1

// Math.sign zwraca wartość:
// -1 dla wartości ujemnych
// 0 dla wartości 0
// 1 dla wartości dodatnich
// a w sumie o taką informację nam głównie chodzi

m = ( 'N S'[diff_bd + 1] + 'W E'[diff_ac + 1] ).trim();
// jeśli diff_bc == -1 na konsoli otrzymamy wartość "N" 
// bo -1 + 1 = 0 => 'N S'[0] => "N"

// jeśli diff_bd == 0 w wyniku otrzymamy " "  
// bo 0 + 1 = 1 => 'N S'[1] => " ".trim() => '' więc na konsoli nie będzie niczego z tej części

// jeśli diff_bd == 1 na konsoli otrzymamy wartość "S"  
// bo 1 + 1 = 2 => 'N S'[2] => "S"

d += diff_bd; // gdzie d+-1 => d--
c += diff_ac; // gdzie c+-1 => c--

console.log(m)
// OUTPUT => NW 
```
Porównajmy oba kody:
```js
let [a, b, c, d] = [8, 23, 18, 25],
               m = '';

if (b > d) m = 'S', d++;
if (b < d) m = 'N', d--;
if (a > c) m += 'E', c++;
if (a < c) m += 'W', c--;




console.log(m)
// OUTPUT => NW
```
{:class="w50"}
```js
let [a, b, c, d] = [8, 23, 18, 25],
               l = Math.sign, 
               j = l(b - d),
               k = l(a - c);

m = ( 'N S'[j + 1] + 
      'W E'[k + 1] ).trim();

d += j;
c += k;

console.log(m)
// OUTPUT => NW
```
{:class="w50"}

Nie dość, że po prawej kod wydaje się dłuższy, to w dodatku jest mniej czytelny. Jest jedno ale, **wydaje się nam**.  
Jeśli idzie o ilość znaków użytych do naszego zadania to:
```js
`[a, b, c, d] = [8, 23, 18, 25],
            m = '';

if (b > d) m = 'S', d++;
if (b < d) m = 'N', d--;
if (a > c) m += 'E', c++;
if (a < c) m += 'W', c--;




console.log(m)`.
replace(/\r\n|\n|\r|\t|\s/gm,'').length
// da nam 112 znaków
```
{:class="w50"}

```js
`[a, b, c, d] = [8, 23, 18, 25],
            l = Math.sign, 
            j = l(b - d),
            k =  l(a - c);

m = ( 'N S'[j + 1] + 
      'W E'[k + 1] ).trim();

d += j;
c += k;

console.log(m)`.
replace(/\r\n|\n|\r|\t|\s/gm,'').length
// da nam 108 znaków
```
{:class="w50"}


Ponadto: 
1. **Nie powtarzamy 4 razy warunku if**, pomimo, że de facto jest on sprawdzany.  
Jeśli liczba `b > d` ich różnica będzie ujemna. Ta sama reguła tyczy się `a` i `c`.
2. Zmiennej `l` przypisujemy funkcję `Math.sign`, **bo użyjemy jej co najmniej dwukrotnie**, stąd w naszym kodzie `l(a-c)` i `l(b-d)`. 
3. Przypisanie **wartości dla zmiennej `m` jest tylko raz**.
4. A na koniec w jednej linijce **zmieniamy** (czyli podwyższamy lub zmniejszamy o **1**) **wartość zmiennych `c` i `d`**.

I jak to w życiu, tak w programowaniu sami musimy odpowiedzieć sobie na pytanie. Która strategia jest odpowiednia dla nas i naszego celu :smile: