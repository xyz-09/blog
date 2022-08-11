---
layout: post
title: Algorytm QuickHull do obliczenia otoczki wypukłej (convex hull) cz. 2
date: 2021-12-11 17:09
category: [js, algorytmy, programowanie]
author: Edyta Jozdowska
tags: ["js", "algorytmy"]
excerpt: Wyznaczanie otoczki wypukłej korzystając z algorytmu Quick Hull i JS. Część druga, kod JS dla otoczki.
published: true
---
<script type="text/javascript" async
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

## Prolog --

Post ten składa się z dwóch części. [Część pierwsza](../quickHull-algorithm-otoczka-wypukła-cz-1) jest wytłumaczeniem samego algorytmu do obliczenia otoczki wypukłej algorytmem **Quick Hull**. Częścią drugą, czyli ten post jest ubranie algorytmu w kod JS.

## Otoczka wypukła algorytmem *Quick Hull*

Sama definicja algorytmu do wyliczenia otoczki wypukłej *convex hull* oraz wyjaśnienie jednego z nich zawarłam [w swoim poprzednim poście](../quickHull-algorithm-otoczka-wypukła-cz-1). Dziś natomiast napiszę kod `JS`, który pozwoli tą otoczkę wyliczyć. Posłużę się algorytmem **Quick Hull** ponieważ najbardziej do mnie przemówił.

## Algorytm Quick Hull w formie blokowej
Rozpisując algorytm **Quick Hull** schmatycznie można stwierdzić, że dla zbioru punktów `points` wykonujemy poszczególne zadania:
```graph
graph TD
A((points))-->G{Czy liczba<br/>punktów w zbiorze<br/> jest > 3}
G.->|nie|E((Zwróć wynik))
G.->|tak|D[Oblicz skrajne <br/>punkty zbioru `wejściowe`<br/>wyznaczając pomiędzy<br/>linię<br/><small>Zalicz je do wyniku</small>]
D-->C[Wyznacz segment dla podzbioru]
C-->F[Oblicz najdalej<br/> oddalone<br/>punkty od linii]
F-->H{Istnieje punkt maksymalny?}
H-->K{odległość<br/>P<sub>max</sub> > 0 <br/>?}
K.->|tak|I[zalicz go do wyniku]
I.->C
H.->|nie|E

classDef decision fill:#fbfbd4,stroke:#444,stroke-width:1px
classDef inp fill:#f7f7f7,stroke:#444,stroke-width:1px
class A,B,D,C,E,F,I,J,K,L inp;
class G,H decision;
classDef wynik fill:#d2e5fb,stroke:#96c5fb
class E wynik;
```

## Kod `JS` dla **Quick Hull**
Stosując powyższy schmat blokowy napiszę klasę **Quick Hull**. Wyjaśnianie kodu przyjełam następująco: wpierw podam fragment kodu, pod którym będzie omówienie. Na koniec zamieszczę całość klasy **Quick Hull** oraz pokażę demo :smile:. 

Zbudujmy zatem klasę **Quick Hull** w `JS`.

```javascript
    class QuickHull {
            /**
             * Class to compute convex hull using Quick Hull algorithm
             * 
             * Returns array of points belonging to a convex hull [ {x,y},{x,y},{x,y},...etc. ] 
             */
            constructor(points) {
            this.hull = [];
            this.points = points;

            if (this.points.length < 3) {
                console.error("Points array should have more or equal to 3 elements.");
                return this.hull;
            }
            //for three points its already a hull
            if (this.points.length == 3) {
                this.points.push(this.points[0]);
                return this.points;
            }
            this.initialize();
        }
...
    }
```

### Zacznijmy od konstruktora.

Otoczka wyznaczana jest dla zbioru punktów. Zbiór ten musimy przekazać do naszej klasy np. poprzez `points`.  
Jeśli punktów jest jedynie 3 - wszystkie należą do otoczki. Na koniec wejściowej tablicy dodajemy więc punkt z pozycji 0 by zamknąć nasz wielokąt i zwracamy wynik.

Jeśli natomiast punktów jest mniej - nie ma co mówić o otoczce. Zwracam zatem pustą tablicę. 

W innych przypadkach, gdy punktów jest więcej niż 3, inicjalizujemy nasze obliczenia.

### Inicjalizacja obliczeń ###

```javascript
        initialize(){
            let baseline = this.getMinMaxPoints();
            this.addSegments(baseline, this.points);

            //reverse line direction to get points on other side
            this.addSegments([baseline[1], baseline[0]], this.points); 
            
            //add the last point to make a closed weilagon
            this.hull.push(this.hull[0]);
            return this.hull;
        }
```

Zgodnie z algorytmem, który wyjaśniałam w [swoim poprzednim poście](../quickHull-algorithm-otoczka-wypukła-cz-1), **w kroku 1** musimy określić wpierw **dwa skrajne punkty** w naszym zbiorze (takie, które będą miały `xmin = min(x1, x2, xn)` oraz `xmax = max(x1, x2, xn)`. Posłuży mi do tego metoda `getMinMaxPoints(){}`. Wybrałam określenie skrajnych punktów po osi `x`, jednak kod równie dobrze się sprawdzi w przypadku osi `y`.

Po określeniu skrajnych punktów, zbiór dzielimy na dwie przestrzenie, według tych punktów `addSegments([[xmin,y], [xmax,y]]){}`. Do wyznaczonych przestrzeni niezależnie wykonujemy obliczenia otoczki. Piszę niezależnie, ale `JS` jest synchroniczny, co oznacza, że najpierw zostanie obliczona przestrzeń po jednej stronie lini, a potem po drugiej.
Jak łatwo zauważyć, drugi segment obliczany jest dla punktów w odwróconej kolejności. 

Na koniec naszej obliczonej już tablicy otoczki dodajemy punkt z miejsca 0 by zamknąć nasz wielokąt i zwracamy wynik z punktami należącymi do *convex hull*.

### Dwa skrajne punkty ###

```javascript
      /**
      * Return the min and max points in the set along the X axis
      * Returns [ {x,y}, {x,y} ]
      */
        getMinMaxPoints() {
            let i, minPoint, maxPoint;

            minPoint = maxPoint = points[0];

            for (i = 1; i < this.points.length; i++) {
                    minPoint =  this.points[i].x < minPoint.x ? this.points[i]: minPoint;
                    maxPoint =  this.points[i].x > maxPoint.x ? this.points[i]: maxPoint;
            }

            return [minPoint, maxPoint];
        }
```
Prównujemy ze sobą wszystkie punkty naszego zbioru i wybieramy te o **najniższej** i **nawyższej** wartości współrzędnej `x`.  
Zakładam, że powyższego kodu nie trzeba tłumaczyć. 

Mogę jedynie wspomnieć, że powyższe można by było wykonać też metodą `sort` - wydaje mi się jednak, że zwykły for jest tutaj wystarczający i będzie też w swoich obliczeniach szybszy, dla większej ilości punktów.  
To nie CodeGolf by zwracać uwagę na ilość znaków. 
Z metody zwracamy dwa skrajne punkty ze zbioru wejściowego.

### AddSegments - obliczenia na podzielonych przestrzeniach ###

```javascript
        /**
         * Recursively adds hull segments
         * @param line - [[x1,y1], [x2,y2]]
         * @param points 
         */
        addSegments(line, points) {
            let th = this,
                distal = th.distantPoints(line, points);

            if (!distal.max) return this.hull.push(line[0]);
           
            th.addSegments([line[0], distal.max], distal.points);
            th.addSegments([distal.max, line[1]], distal.points);
        }
```
Zgodnie z algorytmem **Quick Hull** zbiór punktów dzielimy linią na dwie części (dwa podzbiory). Sprawdzamy odległości punktów w danym podzbiorze od wyznaczonej linii i wybieramy ten najdalej oddalony. Do tego posłuży nam metoda `distantPoints(line, points){}`.  

Jeżeli w podzbiorze nie ma punktu najdalej oddalonego od lini, punkt początkowy linii uznajemy za należący do otoczki, dodajemy go do naszej tablicy `hull` i kończymy obliczanie tego segmentu.

Jeżeli natomiast został znaleziony punkt najdalej oddalony od naszej linii dzielącej zbiór, obieramy go jako punkt końcowy nowo wyznaczonej linii. Dla tak podzielonych podzbiorów obliczamy kolejny segment (po obu stronach), gdzie pierwszy segment jest dzielony linią wyznaczoną pomiędzy punktem początkowym, a najdalej oddalonym punktem, natomiast drugi segment wyznaczony jest przez linię pomiędzy najdalej oddalonym punktem a punktem końcowym - w ten sposób otrzymujemy trójkąt :smile:  

{:.center}
{%
    include image.html
    src="/images/blog_images/quickhull/quickHull-step2.jpg"
    caption="Trójkąt wyznaczony przez linie"
%}

### distantPoints - punkty zewnętrzene i ten najdalszy ###
```javascript
        /**
         * Determines the set of points that lay 
         * outside the line (positive), and the most distant point
         * 
         * Returns: {points: [ [x1, y1], ... ], max: [x,y] ]
         * @param points
         * @param line
         */
        distantPoints(line, points) {
            let i,
                outer_points = [],
                point,
                distant_point,
                distance = 0,
                max_distance = 0;

            for (i = 0; i < points.length; i++) {
                point = points[i];
                distance = this.distanceFromLine(point, line);               

                if (distance > 0) outer_points.push(point);
                else continue;

                if (distance > max_distance) {
                    distant_point = point;
                    max_distance = distance;                   
                }
            }            
            return { points: outer_points, max: distant_point };
        }
}
```
Powyższa metoda polega na obliczeniu odległość od linii `line` metodą `distanceFromLine(point,line){}` dla wszystkich punktów w podzbiorze `points` . 

Jeśli obliczony dystans jest większy od zera - punkt dodajemy do punktów znajdujących się na zewnątrz od linii.   
Wiem, że w rozpisce algorytmu krok po kroku opierałam się na trójkącie, jednak należy zauważyć, że jeżeli odległość punktu ma wartość dodanią, możemy założyć, że będzie on poza obszarem trójkąta - jest to drobne uproszczenie.  

Jeśli natomiast dystans punktu jest mniejszy od zera, pomijamy go (leży on wewnątrz wyimaginowanego trójkąta - dlatego też z pewnością nie będzie należał do otoczki). Ostatnie co tutaj jest obliczane to **maksymalny dystans od linii** by zwrócić punkt najdalej oddalony.  
Metoda `distantPoints` zwraca nam punkty leżące na zewnątrz i najbardziej oddalony punkt od linii. 

### distanceFromLine - odległość od linii - tutaj leży *clue* obliczeń ###
```javascript
        /**
         * Calculates the distance of a point from a line
         * @param {Array} point - Array [x, y]
         * @param {Array} line - Array of two points [ [x1, y1], [x2, y2] ]
         *  
         *  dist(x1, y1, x2, y2, x3, y3): # x3, y3 is the point
                px = x2 - x1
                py = y2 - y1
                d =  ((x3 - x1) * px + (y3 - y1) * py) / px**2 + py**2
         */

        distanceFromLine(point, line) {
           let vy = line[1].y - line[0].y;
           let vx = line[1].x - line[0].x;
           
           return (vx * (line[0].y - point.y) - vy * (line[0].x - point.x) ) / (vx**2 + vy**2)**0.5
        }
```
[Ogólny wzór na obliczenie odległości `d` punktu od linii podany jest np. na Wolfram MathWorld](https://mathworld.wolfram.com/Point-LineDistance2-Dimensional.html){:target="blank"}. Korzystam z przekształconego wzoru, gdzie linia nie jest okreslona funkcją, a dwoma punktami na niej leżącymi:

{:center}
$$ 
\begin{gather}

d = \dfrac{|(x_2 - x_1)(y_1 - y_0) - (x_1 - x_0)(y_2 - y_1)|} {\sqrt(x_2 - x_1)^2 + (y_2 - y_1)^2}\\
gdzie:\end{gather} \\\\
(x_0, y_0) - \text{to współrzędne punktu} \\
(x_1, y_1, x_2, y_2) - \text{to współrzędne punktów przez które przechodzi linia}


$$

Według tego wzoru obliczamy odległość każdego punktu od naszej linii zwracamy wynik, z jedną tylko zmianą. Ponieważ zależy nam na określeniu czy odległość jest wartością ujemną czy dodatnią pomijamy wartość bezwględną w liczniku. Tak samo `Math.sqrt` zamieniłam na `liczba**0.5`.

I to tak naprawdę cały algorytm. Po przeliczeniu wszystkich punktów w naszym zbiorze otrzymamy otoczkę, którą możemy np. wyrysować: :smile: 

## Cała klasa QuickHull
```javascript
  class QuickHull {
        constructor(points) {
            this.hull = [];
            this.points = points;
            //for three points its allready a hull
            if (this.points.length == 3) {
                this.points.push(this.points[0])
                return this.points;
            }
            this.initialize(this.points);          
        }

        initialize(){
            let baseline = this.getMinMaxPoints(this.points);
            this.addSegments(baseline, this.points);
            this.addSegments([baseline[1], baseline[0]], this.points); //reverse line direction to get points on other side
            //add the last point to make a closed loop
            this.hull.push(this.hull[0]);
            return this.hull;
        }
        /**
      * Return the min and max points in the set along the X axis
      * Returns [ {x,y}, {x,y} ]
      */
        getMinMaxPoints() {
            let i, minPoint, maxPoint;

            minPoint = maxPoint = points[0];

            for (i = 1; i < this.points.length; i++) {
                    minPoint =  this.points[i].x < minPoint.x ? this.points[i]: minPoint;
                    maxPoint =  this.points[i].x > maxPoint.x ? this.points[i]: maxPoint;
            }

            return [minPoint, maxPoint];
        }

        /**
         * Calculates the distance of a point from a line
         * @param {Array} point - Array [x,y]
         * @param {Array} line - Array of two points [ [x1,y1], [x2,y2] ]
         *  
         *  dist(x1, y1, x2, y2, x3, y3): # x3,y3 is the point
                px = x2-x1
                py = y2-y1
                d =  ((x3 - x1) * px + (y3 - y1) * py) / px**2 + py**2
         */

        distanceFromLine(point, line) {
           let vy = line[1].y - line[0].y
           let vx = line[1].x - line[0].x

            return  (vx * (line[0].y - point.y) - vy * (line[0].x - point.x) ) / (vx**2 + vy**2)**0.5
        }

        /**
         * Determines the set of points that lay outside the line (positive), and the most distal point
         * Returns: {points: [ [x1, y1], ... ], max: [x,y] ]
         * @param points
         * @param line
         */
        distantPoints(line, points) {
             let i,
                outer_points = [],
                point,
                distant_point,
                distance = 0,
                max_distance = 0;

            for (i = 0; i < points.length; i++) {
                point = points[i];
                distance = this.distanceFromLine(point, line);               

                if (distance > 0) outer_points.push(point);
                else continue; //short circuit

                if (distance > max_distance) {
                    distant_point = point;
                    max_distance = distance;                   
                }
            }            
            return { points: outer_points, max: distant_point };
        }

        /**
         * Recursively adds hull segments
         * @param line
         * @param points
         */
        addSegments(line, points) {
            var th = this;
            var distal = th.distantPoints(line, points);
            if (!distal.max) return this.hull.push(line[0]);

            th.addSegments([line[0], distal.max], distal.points);
            th.addSegments([distal.max, line[1]], distal.points);
        }
    }

```

## DEMO
Poniżej powyższy algorytm w akcji :smile:
Możesz zatrzymać animację, dodać punkty do zbioru, a także przesuwać punkty po całym obszarze animacji.
Punkty zaznaczone na czerwono należą do otoczki.

{% include _posts/_examples/quickhull.html %}
