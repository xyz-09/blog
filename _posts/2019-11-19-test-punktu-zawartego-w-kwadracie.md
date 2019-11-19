---
layout: post
title: Sprawdzenie czy punkt jest zawarty w kwadracie
date: 2019-11-19 14:04
category: [programowanie, php]
author: Edyta Jozdowska
tags: [php]
summary: Prosta, naprawdę banalna klasa do sprawdzenia czy dany punkt jest w kwadracie.
---

Ten post powstał przez przypadek :). Przygotowuję właśnie post na temat szukania, czy punkt jest zawarty w wielokącie wypułym i wklęsłym. Chciałabym temat potraktować poważnie i zawrzeć podstawy matematyczne jak i sam kod.  
Jednak post rozrósł mi się do tego stopnia, że postanowiłam go podzielić.

Ten fragment, który własnie czytasz dotyczny znacznie prostszego przypadku, gdy szukamy naszego punktu w kwadracie. Rozpatrzenie tego przypadku, pozwoli nam lepiej zrozumieć sam zapis kodu w trudniejszych wariantach.

Do czego to może mieć odniesienie? Choćby do pracy z danymi na mapach, które często wykonuję. 

Od czego zaczynamy? Jak zazwyczaj, bez teorii nie ruszymy dalej.

## Teoria
Nie będę przytaczać definicji punktu, ani kwadratu. To jak tłumaczyć, że 2 + 2 jest 4. Nie mam zamiaru wypisywać tutaj na to dowodu matematycznego. 
Pierwsze nie znam go, a drugie podobno jest baaaardzo długi ;)

Ze szkoły powinniśmy wiedzieć też, jaki jest zapis współrzędnych obiektów w układzie kartezjańskim. Jeśli nie, niech poniższy obrazek *(Rysunek 1)* posłuży jako wytłumaczenie.  

{:.center}
![Rysunek 1](/blog/images/pointInSquare.jpg)<br/>
*Rysunek 1 - Kwadrat i punkt w układzie kartezjańskim, współrzędne wierzchołków*


Ogólne założenie jest takie. Należy sprawdzić, czy współrzędne punktu **P** oznaczone jako `[px, py]` są większe lub równe od początku obszaru oznaczonego jako `[x1, y1]`, a mniejsze lub równe od końca obszaru w układzie oznaczone jako `[x2, y2]`. 

Wybrałam `PHP` jako język dla mojego testu.
Może być to jednak równie `Python`, jak też `JS`. 

```php
<?php
// *** Very simple Class to check 
// *** that point is on square or on border

class pointInSquare { 
//$vertexA = array(x1,y1)
 public $vertexA;

// $vertexB = array(x2,y2)
 public $vertexB;

// $point = array(xp, yp)
 public $point;

    function __construct($vA, $vB, $p){
       $this->vertexA = $vA;
       $this->vertexB = $vB;
       $this->point =  $p;
    }
    
   function init(){            
        if($this->valiParameters()){
            return $this->checkPointInSquare();
        }else{
            echo "Some parameters are invalid. Check, that they are an arrays of only two elements (x,y) values";
            exit;
        }
    }       

    function checkPointInSquare(){
    // main body of class, the essential check that point by px and py is in square
    
        return   $this->point[0] >= $this->vertexA[0] &&
                 $this->point[0] <= $this->vertexB[0] &&
                 $this->point[1] >= $this->vertexA[1] &&
                 $this->point[1] <= $this->vertexB[1];
    }

    function valiParameters(){    
        return  $this->arrayOfTwo($this->vertexA) && 
                $this->arrayOfTwo($this->vertexB) && 
                $this->arrayOfTwo($this->point);
    }

    
    function arrayOfTwo($el){
        // validation for values
        
        return is_array($el) && count($el) == 2;
    }

    function __desrtuct(){
    }
}


$test = new pointInSquare([0,0],[10,10], [10,10]);

var_dump($test->init());

}
```

W późniejszym czasie dodam kod w `JS` i w `PYTHON`.
