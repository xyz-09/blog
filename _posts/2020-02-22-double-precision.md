---
layout: post
title: Double precision
date: 2020-02-22 10:21
category: 
author: 
tags: []
excerpt: 
published: false
---
Spróbujmy wyświelić liczbę **16525534153749833** w `js` jako liczbę. Rezultatem będzie: **16525534153749832** :thinking:. To samo się dzieje dla liczby: **2712939616709395196** oraz dla liczby **9244681613480703**. Jako zwykłe liczby nie jesteśmy ich w stanie wyświetlić. Podając je jako stringi, nie ma problemu. 

<iframe height="360" style="width: 100%;" scrolling="no" title="yLNVpzL" src="https://codepen.io/ejo/embed/yLNVpzL?height=265&theme-id=default&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/ejo/pen/yLNVpzL'>yLNVpzL</a> by ejo
  (<a href='https://codepen.io/ejo'>@ejo</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### Dlaczego tak się dzieje?
Liczby w Javascript są 64-bitowymi liczbami zmiennoprzecinkowymi (_twz. double_), które nie są w stanie reprezentować dużych liczb całkowitych bez utraty precyzji. Liczby _double_ mają przeznaczone 52 bity przeznaczone do przechowywania cyfr liczby dodatniej. Niektóre zaś duże liczby, gdzieś około ~10 ^ 26 wymagałyby 87 bitów. 