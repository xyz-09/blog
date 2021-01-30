---
layout: post
title: Shadow of the Knight - Episode 1 - binary search, simple
date: 2021-01-30 08:46
category: [php, "bitwy programowania"]
author: Edyta Jozdowska
tags: [php, "battle", "binary search", "algorytmy"]
excerpt: 
published: true
---
W [poprzednim wpisie](/blog/binary-search){:target="blank"} opisywałam na czym polega algorytm binary search. Obiecałam również, że omówię rozwiązania dwóch gier na [CodinGame](https://www.codingame.com/){:target="blank"} ["Shadow of the Knight" epizod 1](https://www.codingame.com/ide/puzzle/shadows-of-the-knight-episode-1){:target="blank"} i ["Shadow of the Knight" epizod 2](https://www.codingame.com/training/expert/shadows-of-the-knight-episode-2){:target="blank"}. Niniejszy wpis odnosi się do części pierwszej zadania. 

Nie będę przytaczać teorii algorytmu Binary search. To zrobiłam we wpisie [Wstęp do Shadow of the Knight - CodingGame - binary search](/blog/binary-search){:target="blank"}. Skupię sią natomiast na jego praktycznym zastosowaniu. 

## Zadanie
Batman musi znaleźć bombę w budynku i ją rozbroić, ma na to ograniczony czas (ograniczoną ilość ruchów). Bomba wybuchnie jeśli mu się nie uda jej znaleźć i wszyscy zginą.  

## Dane wejściowe
Danymi wejściowymi są:
* pozycja Batmana `[x, y]`,
* kierunek, gdzie jest bomba od aktualnej pozycji Batmana okreśona jako:
  * `U` - tylko do góry,
  * `D` - tylko do dołu,
  * `L` - tylko w lewo,
  * `R` - tylko w prawo,
  * `UR` - do góry i w prawo,
  * `UL` - do góry i w lewo,
  * `DR` - do dołu i w prawo,
  * `DL` - do dołu i w lewo. 

## Rozwiązanie zadania binary search w grafikach
Pierwsza grafika *Rysunek 1* przedstawia stan początkowy. Batman znajduje się na pozycji `[x, y] = [2, 7]`, bomba zlokalizowana jest na pozycji `[x, y] = [8, 4]`.  
Batman oczywiście nie wie gdzie jest bomba, więc początkowo, jego zakresem szukania jest cała plansza.  

Jako, że z danych wejściowych dowiaduje się, że bomba jest gdzieś w kierunku `góra-prawo = UR` - ogranicza swój obszar wyszukiwania od swojej pozycji, do "ścian" budynku *Rysunek 2*. 

Dlaczego wykluczony jest wiersz i kolumna, w jakiej Batman stoi? - ponieważ wie, że bomba jest zarówno do `góry` i na `prawo`. Jeśli bomba byłaby zlokalizowana, w kolumnie/wierszu, gdzie Batman się znajduje - określeniem lokalizacji bomby była by jedynie wskazówka `góra` lub `prawo`.

<div style="display:flex;justify-content:space-evenly">
{%
    include image.html 
    src="/images/blog_images/bs/batman-ep-1-01.png" 
    caption="Rysunek 1. Batman, pozycja wyjściowa"
%}
{%
    include image.html 
    src="/images/blog_images/bs/batman-ep-1-02.png" 
    caption="Rysunek 2. Batman, ograniczenie zakresu szukania"
%}
</div>
Obliczamy dokąd Batman ma skoczyć - *Rysunek 3*:
1. Batman jest na pozycji `[x, y] = [2, 7]`
2. Nowy zakres przeszukania to tablica dwuwymiarowa `[7, 6]` (pamiętajmy, że liczymy od zera :smile:)
3. oś x - `7/2 = 3.5 ~ 4` - do pozycji Batmana musimy dodać 4 jednostki w prawo (dodajemy bo idziemy w prawo)
4. oś y - `6/2 = 3 ~ 3` - od pozycji Batmana odejmujemy 3 jednostki (odejmujemy bo idziemy do góry)
5. Batman, zgodnie z przyjętym algorytmem, skacze na pozycję: `[2 + 4, 7 - 3] = [6, 4]` *Rysunek 3*.  

Po wykonaniu skoku na pozycję `[6,4]` zaczynamy od nowa *Rysunek 4*.  

1. Batman jest na pozycji `[6, 4]`
2. Wpierw, określamy nowy zakres przeszukania `[4, 4]`. 
3. Po otrzymaniu informacji z programu, że bomba znajduje się na prawo od Batmana, obszar wyszukiwania się zmniejsza do zakresu `[0, 3]` *Rysunek 5*. 
5. oś x - `3/2 = 1.5 ~ 2` - do pozycji Batmana dodajemy dwie jednostki
6. oś y - `0` - no bo gdzie indziej :wink:
7. Batman zgodnie z przyjętym algorytmem skacze na pozycję `[6 + 2, 4 + 0] = [8, 4]`
<div style="display:flex;justify-content:space-evenly">
{%
    include image.html 
    src="/images/blog_images/bs/batman-ep-1-03.png" 
    caption="Rysunek 3. Batman, skok"
%}
{%
    include image.html 
    src="/images/blog_images/bs/batman-ep-1-04.png" 
    caption="Rysunek 4. Batman, ograniczenie zakresu szukania"
%}
{%
    include image.html 
    src="/images/blog_images/bs/batman-ep-1-05.png" 
    caption="Rysunek 5. Batman, nowy zakres"
%}
</div>
### Znaleźliśmy bombę
W 3 skokach znaleźliśmy bombę na pozycji `[8, 4]` *Rysunek 6*

{:.center}
{%
    include image.html 
    src="/images/blog_images/bs/batman-ep-1-06.png" 
    caption="Rysunek 6. Bomba znaleziona, ludzie uratowani - otwieramy szampana"
%}

## Rozwiązanie binary search - kod php
```php
fscanf(STDIN, "%d %d", $W, $H); // dane wejściowe o rozmiarze budynku
// $N: maximum number of turns before game over.
fscanf(STDIN, "%d", $N); //max ruchów jakie Batman ma do wykonania, tej danej nie wykorzystujemy
fscanf(STDIN, "%d %d", $X, $Y); // aktualna pozycja Batmana

//Założenia wstępne

// minX - początek zakresu szukania po osi X, 
// maxX - koniec zakresu szukania po osi X,
// minY - początek zakresu szukania po osi Y,
// maxY - koniec zakresu szukania po osi Y

$minX = 0; // zaczynamy szukać po całym zakresie 
$minY = 0; // zaczynamy szukać po całym zakresie 
$maxX = $W - 1; // bo liczymy od 0
$maxY = $H - 1; // bo liczymy od 0

while (TRUE){

  fscanf(STDIN, "%s", $bombDir); // dana o miejscu bomby (U, UR, R, DR, D, DL, L or UL)

  // --- OKREŚLENIE NOWEGO ZAKRESU minX, minY, maxX, maxY / START ---
    
  if(strpos($bombDir,'U') !== false){ 
      
     $maxY = $Y - 1; // bomba jest do góry od pozycji Batmana
                     // odejmujemy 1 od jego pozycji (ograniczenie zakresu z opisu)
  }
  else if(strpos($bombDir,'D') !== false){
      
    $minY=$Y + 1; // bomba jest w dół od pozycji Batmana
                  // dodajemy 1 do pozycji Batmana
  }
  
  if(strpos($bombDir,'L') !== false){
      
     $maxX=$X - 1; // bomba jest na lewo
                   // odejmujemy 1 od pozycji Batmana
  }
  else if(strpos($bombDir,'R') !== false){
    
   $minX=$X + 1; // bomba jest na prawo
                 // dodajemy 1 do pozycji Batmana
}
   // --- OKREŚLENIE NOWEGO ZAKRESU / END ---

  $X = ceil(($minX + $maxX) / 2); // Binary search + zapisujemy dokąd skaczemy
  $Y = ceil(($minY + $maxY) / 2); // Binary search + zapisujemy dokąd skaczemy
  
  // Podajemy programowi, dokąd Batman ma skoczyć.
    echo("$X $Y\n");
}
```