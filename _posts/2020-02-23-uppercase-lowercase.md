---
layout: post
title: Zamiana dużych liter na małe i odwrotnie jednym rzutem
date: 2020-02-23 14:22
category: ["programowanie"]
author: Jozdowska Edyta
tags: ['js']
excerpt: Szybka zamiana małych liter na duże, a dużych liter na małe
published: true
---

- [Unicode](#unicode)
- [Operacje bitowe](#operacje-bitowe)
- [Operator bitowej różnicy symetrycznej](#operator-bitowej-r%c3%b3%c5%bcnicy-symetrycznej)
- [Binarna zamiana znaków](#binarna-zamiana-znak%c3%b3w)
- [Polskie znaki diakrytyczne](#polskie-znaki-diakrytyczne)
  - [Demo kodów switchCaseBin i switchCaseAll](#demo-kod%c3%b3w-switchcasebin-i-switchcaseall)
{:class='content_list'}

Podczas pisania kodu czasem potrzebujemy dokonać zamiany dużych liter na małe lub małych na duże.  
W `js` służą do tego funkcje `toUpperCase()` i `toLowerCase()`. 

Gorzej jak mamy zrobić **switcha**, czyli duże mają być małe, a małe mają być duże. Ot taką mam fanaberię :wink:.  


## Unicode
[**Unicode**](https://pl.wikipedia.org/wiki/Unikod){:target="_blank"} to zestaw znaków zapisanych w odpowiedniej formie. Na teraz, ważna jest jedynie informacja, że oprócz kodu unicode, każda litera z alfabetu ma przypisany swój kod dziesiętny.

|TYP|A|B|C|D|E|F|G|H|I|J|K|L|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|**małe**|97|98|99|100|101|102|103|104|105|106|107|108|
|**duże**|65|66|67|68|69|70|71|72|73|74|75|76|

<br/>

|TYP|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|**małe**|109|110|111|112|113|114|115|116|117|118|119|120|121|122|
|**duże**|77|78|79|80|81|82|83|84|85|86|87|88|89|90|  


Zauważmy jedną rzecz. Różnica między 97 a 65 = **32** i tak samo jest dla każdej z liter. Kod dziesiętny małej litery jest większy o dokładnie 32 od kodu dużej litery. No i odwrotnie. Liczba **32** będzie więc dla nas ważnym elementem w naszym kodzie. 

Aby uzyskać kod dziesiętny litery w `js` wykorzystujemy funkcję `String.charCodeAt()`
```js
"q".charCodeAt() // 113 
"Z".charCodeAt() // 90
```
Zgadza się z powyższą tabelą? Zgadza się :smile:

Operację odwrotną, czyli by uzyskać literę z kodu dziesiętnego przeprowadzamy poprzez `String.fromCharCode()`
```js
String.fromCharCode(113) // q
String.fromCharCode(90)  // Z
```

## Operacje bitowe
I w tym momencie dochodzimy do **operacji bitowych**. W praktyce dostępne mamy 6 operacji bitowych:

|oznaczenie|operacja|
|&| mnożenie bitowe/koniunkcja _BIT AND_|
|&#124;|bitowa alternatywa / dodawanie bitowe _BIT OR_|
|^|bitowa różnica symetryczna _XOR_|
|<<|przesunięcie w lewo|
|>>|przesunięcie w prawo|
|~|uzupełnienie jedynkowe / negacja _COMPL_|

Póki co pozostawię wyjaśnienia każdego z operatorów, bo to grubsza sprawa. Zajmę się tylko tym, który jest nam potrzebny do naszego algorytmu czyli **XOR**.

## Operator bitowej różnicy symetrycznej
Operator bitowej różnicy symetrycznej ( **^** ) sprawdza pojedyncze bity w obu argumentach (bo do tej operacji wymagane są dwa argumenty) i oblicza ich różnicę symetryczną. Jeśli w obu argumentach bity na tej samej pozycji były różne **zwraca 1**, jeśli były takie same czyli dwa zera albo dwie jedynki **zwraca 0**. Brzmi jak magia :smile:, ale w praktyce jest proste:

|||||**XOR**|
|1|^|0|=|1|
|0|^|1|=|1|
|1|^|1|=|0|
|0|^|0|=|0|

Co nam daje ta wiedza? Przyjżyjmy się liczbie 65 odpowiadającej za oznaczenie "A".
Jej zapis w formie binarnej to **A = 65 = 01000001** natomiast wspomnianej wcześniej liczby 32 to **32 = 100000**  
Wykonajmy operację ^ na bitach _Tutaj uwaga zaczynamy od prawej strony jak w dzieleniu pisemnym i pozostałe miejsca uzupełniamy zerami, gdyż potrzebujemy taką samą długość, a liczba 32 jest tutaj o dwie pozycje krótsza niż liczba 65_ :

|65 =|0|1|0|0|0|0|0|1|
|32 =|<span style="color:#c5c5c5">0</span>|<span style="color:#c5c5c5">0</span>|1|0|0|0|0|0|
|XOR ^|^|^|^|^|^|^|^|^|
|**97 =**|**0**|**1**|**1**|**0**|**0**|**0**|**0**|**1**|

Może nasunąć się jedno pytanie "dlaczego po prostu nie odjąć" lub nie dodać liczby 32. Odpowiedź jest dość prosta. Nie wiemy czy potrzebujemy ją dodać czy odjąć, bo nie mamy zidentyfikowanych czy operację wykonujemy na dużej literze alfabetu czy na małej. Operacja XOR wykonuje obliczenia za nas. W uproszczeniu można stwierdzić, że rozpoznaje za nas jaką operację ma wykonać - to takie abstrakcyjne wyjaśnienie, ale do mnie przemawia :wink:

## Binarna zamiana znaków
Wyposażeni w odpowiednią wiedzę przystępujemy do układania naszej funkcji:
```js
const switchCaseBin = (n) =>
    n.split``.map((a)=>String.fromCharCode(a.charCodeAt()^32)).join``;

switchCaseBin("aBdEfZfv");
// AbDeFzFV
```
Dla mnie jest to bardzo eleganckie rozwiązanie, szkoda, że ułomne.  

**Uwaga!!!** Ta funkcja będzie działać prawidłowo tylko dla stringów bez polskich znaków diakrytycznych, czyli dla a-z i A-Z.
{:class="error"}


## Polskie znaki diakrytyczne
Niestety gdy przychodzi do testów, okazuje się, że coś nie zostało uwzględnione. No po to są testy przecież :smile:  
Gdy musimy wdrożyć kod, by był uniwersalny, musimy wziąć pod uwagę wszystkie możliwości. I tak np. polskie znaki diakrytyczne zaczynają się od 211 "ó" i rosną o 1 dla dużej litery, potem jest skok itp. Czyli powyższe nie ma dla nich zastosowania.

|TYP|Ą|Ć|Ę|Ł|Ń|Ó|Ś|Ź|Ż|
|-|-|-|-|-|-|-|-|-|-|-|
|**małe**|260|262|280|321|323|211|346|377|379|
|**duże**|261|263|281|322|324|243|347|378|380|

W tym przypadku, jeśli potrzebujemy więcej musimy przepisać naszą funkcję.   
Wpierw sprawdzić z jakim znakiem mamy do czynienia, potem odpowiednio go zamienić. 
```js
const switchCaseAll = (n) =>{    
    const checkIsUpper = (m) =>  m.toUpperCase() ==  m; 
    return n.split``.map((a)=> checkIsUpper(a) ? a.toLowerCase() : a.toUpperCase() ).join``;
}'a'
```
Powyższa funkcja będzie uniwersalna. Owszem. Tyle, że rozwiązanie na bitach bardziej mi się podoba :smile:

### Demo kodów switchCaseBin i switchCaseAll
{% include _posts/_examples/switchCase.html %}


