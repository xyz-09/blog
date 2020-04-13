---
layout: post
title: Najbliższa lokalizacja po lon i lat
date: 2020-04-13 08:41
category: [js]
author: Edyta Jozdowska
tags: ['js','geolocalization']
excerpt: Znajdywanie najbliższej lokalizacji dla dwóch punktów po ich danych geograficznych.
published: true
---
<script type="text/javascript" async
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

- [Najbliższy punkt dla lokalizacji](#najbli%c5%bcszy-punkt-dla-lokalizacji)
- [Odległość euklidesowa](#odleg%c5%82o%c5%9b%c4%87-euklidesowa)
- [Najbliższy punkt dla danej lokalizacji w js](#najbli%c5%bcszy-punkt-dla-danej-lokalizacji-w-js)
- [Przykład zastosowania funkcji closestLocation](#przyk%c5%82ad-zastosowania-funkcji-closestlocation)
- [Defibrillators - rozwiązanie zadania z CodingGame](#defibrillators---rozwi%c4%85zanie-zadania-z-codinggame)
{:class='content_list'}


Ostatnio moje posty są głównie inspirowane zadaniami, które rozwiązuję w wolnym czasie na [CodingGames](https://www.codingame.com/){:target="_blank"}.  
A, że są Święta i&nbsp;trwa narodowa izolacja z powodu koronawirusa, czasu tego jest sporo.  


Ogólnie przez te ciągłe nawoływania _"zostań w domu, zostań w domu"_ w obecnej sytuacji, mój dzień zupełnie się przestawił.  
Wstaję mniej więcej o 3:00 nad ranem, kładę się spać w okolicach godziny 20:00. Jedyne gdzie wychodzę to z moim psem na spacer (niestety dość krótki) i do pracy - no cóż, w takich czasach przyszło mi żyć :stuck_out_tongue_closed_eyes:   
Czas ten jednak mogę spożytkować na rozwój i utrwalanie wiedzy oraz umiejętności programowania.   
{:.offtopic}

# Najbliższy punkt dla lokalizacji

Wracając do tematu. Dzisiejszy post, będzie o tym jak znaleźć najbliższy punkt dla lokalizacji, w której się znajduje inny punkt, czyli jesteśmy w lokalizacji **A**, wokół nas są lokalizacje **B, C, D** i szukamy tej najbliższej:  

{:.center}
{%
    include image.html 
    src="/images/blog_images/closest_location/rys1.jpg" 
    href="/images/blog_images/closest_location/rys1.jpg"
    caption="Rysunek 1. Najbliższa lokalizacja dla punktu"
%}
# Odległość euklidesowa
Do obliczenia odległości między dwoma punktami zastosujemy tzw. **odległość euklidesową**. Nałóżmy sobie na powyższy schemat układ współrzędnych: 

{:.center}
{%
    include image.html 
    src="/images/blog_images/closest_location/rys2.jpg" 
    href="/images/blog_images/closest_location/rys2.jpg"
    caption="Rysunek 2. Najbliższa lokalizacja dla punktu - układ współrzędnych"
%}

Zapewne, każdy z nas w szkole podstawowej miał to na matematyce. Szkoła była jednak dawno, można więc nie pamiętać wzoru, dlatego przytaczam go poniżej.  
Szukaną odległość między punktem **A** i punktem **B** można opisać wzorem:  

{:.center} 
$$ 
\begin{align*}
 |AB| = \sqrt{(x-y)^2 + (x-y)^2}
\end{align*}
$$

No tak, my bazujemy na **Lon** i **Lat** więc podmieńmy oznaczenia:  

{:.center} 
$$ 
\begin{align*}
 |AB| = \sqrt{(A_{lon} - B_{lon})^2 + (A_{lat} - B_{lat})^2}
\end{align*}
$$

Możemy, i to właśnie w kodzie zrobimy, rozbić całe równanie na składowe, czyli:

{:.center} 
$$
\begin{align*}
d_x = A_{lon} - B_{lon} \\
d_y = A_{lat} - B_{lat} \\ \\

 |AB| = \sqrt{ d_x^2 + d_y^2}
\end{align*}
$$

Tyle matematyki :smile: przejdźmy do kodu.  
# Najbliższy punkt dla danej lokalizacji w js
Powyższe wzory są przedstawione w postaci dwóch funkcji ``locationDistance``, która umożliwia obliczenie ``dx`` i ``dy`` oraz ``vectorDistance``, która oblicza nam pierwiastek z sumy potęg ``dx`` i ``dy``:
```js

const locationDistance = (location1, location2) => {
        var dx = location1.lon - location2.lon,
            dy = location1.lat - location2.lat;
        return vectorDistance(dx, dy);
    }

const vectorDistance = (dx, dy) => {
        return Math.sqrt(dx * dx + dy * dy);
    }
```


Mając kilka punktów wokół, czyli **B, C i D**, pojedynczo sprawdzamy, która jest z nich najniższa. Możemy to wykonać w ``js`` przy użyciu ``reduce``, ponieważ funkcja ta zwróci nam jedynie jedną wartość z obliczeń. Możemy też zastosować np. ``Math.min``.  
Istnieje wiele ścieżek prowadzących w te samo miejsce.   

Dane wejściowe ``targetLocation`` to lokalizacja, dla której poszukujemy najbliższego punktu w zestawie danych nazwanych ``locationData``:
```js
const targetLocation ={ lon: '3.879483', lat: '43.608177' } 
const locationData = [
   {
    id: '1',
    name: 'Maison de la Prevention Sante',
    address: '6 rue Maguelone 340000 Montpellier',
    lon: '3.87952263361082',
    lat: '43.6071285339217'
  },
  {
    id: '2',
    name: 'Hotel de Ville',
    address: '1 place Georges Freche 34267 Montpellier',
    lon: '3.89652239197876',
    lat: '43.5987299452849'
  },
  {
    id: '3',
    name: 'Zoo de Lunaret',
    address: '50 avenue Agropolis 34090 Mtp',
    lon: '3.87388031141133',
    lat: '43.6395872778854'
  }
];
```
Zobaczmy wpierw wykorzystanie ``reduce``:
```js


locationData.reduce((prev, curr) => {
        var prevDistance = locationDistance(targetLocation, prev),
            currDistance = locationDistance(targetLocation, curr);
        return (prevDistance < currDistance) ? prev : curr;
    });
```

Do tego samego wykorzystajmy ``Math.min()``:
```js
 const result = locationData.map((a)=>locationDistance(targetLocation, a));
 console.log(locationData[result.indexOf(Math.min(...result))]['name']);
 ```
# Przykład zastosowania funkcji closestLocation
Zobaczmy jak ten kod działa z danymi:
 <p class="codepen" data-height="350" data-theme-id="dark" data-default-tab="js,result" data-user="ejo" data-slug-hash="zYvGWdQ" style="height: 350px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="zYvGWdQ">
  <span>See the Pen <a href="https://codepen.io/ejo/pen/zYvGWdQ">
  zYvGWdQ</a> by ejo (<a href="https://codepen.io/ejo">@ejo</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

Najbliższa lokalizacji: ``{'3.879483', '43.608177'}`` jest punkt o nazwie: **Maison de la Prevention Sante** o lokalizacji:  ``{'3.87952263361082', '43.6071285339217'}``

# Defibrillators - rozwiązanie zadania z CodingGame
Zastosowałam tą funkcję do rozwiązania zadania: [Defibrillators](https://www.codingame.com/ide/puzzle/defibrillators){:target="_blank"}. Pełne rozwiązanie zadania [jest na moim Githubie](https://github.com/capo1/codinggames){:target="_blank"}, gdzie zamieszczam swoje rozwiązania z CodingGame.