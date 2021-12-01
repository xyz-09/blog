---
layout: post
title: Algorytm QuickHull do obliczenia otoczki wypukłej (convex hull) cz. 1
date: 2021-12-01 10:23
category: [js, algorytmy, programowanie]
author: Edyta Jozdowska
tags: ['js', 'algorytmy']
excerpt: Wyznaczanie otoczki wypukłej korzystając z algorytmu Quick Hull i JS.
published: true
---

<script type="text/javascript" async
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

## Prolog
Post ten składa się z dwóch części. Część pierwsza jest wytłumaczeniem samego algorytmu do obliczenia otoczki wypukłej **Quick Hull**. Częścią drugą będzie ubranie poniższego w kod JS.

## Otoczka wypukła - definicja
Otoczka wypukła *(ang: convex hull)* jest takim wielokątem, że każdy punkt ze zbioru leży albo w jego wętrzu, albo na jego brzegu. Zakładając, że mamy punkty o numerach od 0 do 13 należące do zbioru **Q**, jak na poniższym schemacie - otoczką **H** będzie wielokąt wyznaczony przez punkty [0, 2, 4, 6, 3, 5]

{:center}
$$ 
\begin{align}
Q \in [0,1,2,3,4,5,6,7,8,9,10,11,12,13] \\
H \in [0, 2, 4, 6, 3, 5]

\end{align}
$$

<div class="row">

<div class="col-6 center">
{%
    include image.html
    src="/images/blog_images/quickhull/quickHull.png"
    caption="Otoczka wypukła dla zbioru punktów"
%}

</div>

<div class="col-6 center">
{%
    include image.html
    src="/images/blog_images/quickhull/quickHull.gif"
    caption="Otoczka wypukła dla zbioru punktów - krok po kroku"
%}

</div>
</div>

Jest dość dużo algorytmów, które pomagają wyznaczyć otoczkę wypukłą [^1]. Jedne są mniej skomplikowane inne trochę bardziej. Ich [złożoność obliczeniowa **O**](https://en.wikipedia.org/wiki/Big_O_notation){:target="_blank"} waha się od `O(n log n)` do `O(n²)` w najgorszych przypadkach. 

Zastosowanie praktyczne jakie mi przychodzi na myśl dla otoczki wypukłej to gry choć pewnie nie tylko :smile:

Zauważyłam, że najczęściej wykorzystywany jest **Algorytm Grahama** do omawiania zagadnień algorytmu wyznaczania otoczki wypukłej - choć ciężko mi powiedzieć dlaczego. Do mnie on nie "przemówił". Natomiast bardzo podszedł mi algorytm **QuickHull**, na którym właśnie skupię się w moim wpisie.

## Quick Hull - na czym polega
Algorytm **Quick Hull** polega na wyznaczaniu w zbiorze skrajnych punktów, łączeniu ich ze sobą, dzieleniu przestrzeni na dwie częsci, sprawdzeniu maksymalnej odległości od granicy części i tak rekursywnie, aż nie zostanie nam żaden punkt do sprawdzenia. 

{:.center}
{%
    include image.html
    src="/images/blog_images/quickhull/quickHull.gif"
    caption="Otoczka wypukła dla zbioru punktów - krok po kroku"
%}

Rozpisując powyższy gif przedstawiający wyliczanie otoczki algorytmem QuickHull na poszczególne kroki wykonujemy:
<div class="row">
<div class="col-6">
{%
    include image.html
    src="/images/blog_images/quickhull/quickHull-step1.jpg"
    caption="Krok 1 - Quick hull"
%}

<strong>Krok 1</strong>- Wyznaczamy dwa skrajne punkty w przestrzeni (takie które będą miały min x, a potem y, a także max x i y). Na moim przykładzie są to punkty `3` i `2` i łączymy je prostą dzielącą nasz zbiór na dwie części (jak na obrazku powyżej).
</div>
<div class="col-6">
{%
    include image.html
    src="/images/blog_images/quickhull/quickHull-step2.jpg"
    caption="Krok 2 - Quick hull"
%}

<strong>Krok 2</strong> - Sprawdzamy, który punkt jest najdalej oddalony od naszej prostej - w moim przypadku jest to `6`.
</div>
<div class="col-6">
{%
    include image.html
    src="/images/blog_images/quickhull/quickHull-step3.jpg"
    caption="Krok 3 - Quick hull"
%}

<strong>Krok 3</strong> - Tworzymy z tych punktów trójkąt. Wszystkie punkty wewnątrz trójkąta - zaznaczone na niebiesko <strong>NIE NALEŻĄ</strong> do otoczki `[1, 8, 12]`- możemy je wykluczyć. Te leżące na skraju - zaznaczone na żółto `[7, 4]` - są kandydatami do otoczki.
</div>
<div class="col-6">
{%
    include image.html
    src="/images/blog_images/quickhull/quickHull-step4.jpg"
    caption="Krok 4 - Quick hull"
%}

<strong>Krok 4</strong> - Sprawdzamy i wybieramy max odległość od lini pomiędzy punktami `6` i `2` - w tym wypadku jest to punkt `4`.
</div>
<div class="col-6">
{%
    include image.html
    src="/images/blog_images/quickhull/quickHull-step5.jpg"
    caption="Krok 5 - Quick hull"
%}

<strong>Krok 5</strong> - Między punktami `6`, `2` i `4` znów wyznaczamy trójkąt. Punkt `7` leży w wyzanczonym trójkącie - możemy więc go wykluczyć ze zbioru otoczki. Natomiast punkt `4` zaliczamy do otoczki. Po tej stronie skończyły się nam już punkty.

</div>
<div class="col-6">

{%
    include image.html
    src="/images/blog_images/quickhull/quickHull-step6.jpg"
    caption="Krok 6 - Quick hull"
%}

<strong>Krok 6</strong> - wracamy do linii 3->2 i sprawdzamy punkty w drugą stronę.

</div>
<div class="col-6">

{%
    include image.html
    src="/images/blog_images/quickhull/quickHull-step7.jpg"
    caption="Krok 7 - Quick hull"
%}

<strong>Krok 7</strong> - Sprawdzamy punkty w drugą stronę. Szukamy tego, który ma max odległość od lini `3` i `2`. W moim przypadku jest to `0`.

</div>
<div class="col-6">

{%
    include image.html
    src="/images/blog_images/quickhull/quickHull-step8.jpg"
    caption="Krok 8 - Quick hull"
%}

<strong>Krok 8</strong> - Łączymy ze sobą punkty `3`, `2` i `0` w trójkąt. Wszystkie punkty wewnątrz wykluczamy z otoczki, czyli, mamy pewność, że `[9, 13, 11]` <strong>NIE NALEŻĄ</strong> do otoczki (są to punkty zaznaczone na niebiesko). Te zaznaczone na żółto `[5, 10]` są kandydatami do otoczki. 

</div>
<div class="col-6">

{%
    include image.html
    src="/images/blog_images/quickhull/quickHull-step9.jpg"
    caption="Krok 9 - Quick hull"
%}

<strong>Krok 9</strong> - Sprawdzamy odległości tych dwóch punktów od lini `3`->`0` i wybieramy ten, który jest od niej najdalej. W moim przypadku jest to punkt `5`.

</div>
<div class="col-6">

{%
    include image.html
    src="/images/blog_images/quickhull/quickHull-step10.jpg"
    caption="Krok 10 - Quick hull"
%}

<strong>Krok 10</strong> - Łączymy ze sobą `[3, 0, 5]` w trójkąt. Wszystkie punkty wewnątrz - zaznaczone na niebiesko <strong>NIE NALEŻĄ</strong> do otoczki - `10`.
W tym momecie nie zostało nam więcej punktów do sprawdzenia. Przejdźmy więc do wypisania wyniku.

</div>
<div class="col-6">

{%
    include image.html
    src="/images/blog_images/quickhull/quickHull-step11.jpg"
    caption="Krok 11 - Quick hull"
%}

<strong>FINALNY Krok 11</strong> W naszym algorytmie wyznaczyliśmy sobie dwa zbiory punktów - te, które należą do otoczki i te które nie należą do otoczki. W moim przypadku punktami otoczki są `[0, 5, 3, 6, 4, 2]`.

</div>
</div>

Całkiem sprawnie poszło - tyle, że rozpisywanie tego zajeło trochę czasu. Na szczęście mamy programowanie i rekursję, która powyżej rozpisane kroki wykona nam znacznie, znacznie szybciej :smile:. Ale o tym będzie w częsci drugiej.

[^1]: [https://en.wikipedia.org/wiki/Convex_hull_algorithms](https://en.wikipedia.org/wiki/Convex_hull_algorithms)