---
layout: post
title: 
date: 2020-04-10 10:53
category: [js,programowanie]
author: Edyta Jozdowska
tags: [js]
excerpt: Look and say czyli patrz i mów. Ciekawy ciąg matematyczny.
published: true
---
- [Look and say - przykład ciągu dla liczby 1](#look-and-say---przyk%c5%82ad-ci%c4%85gu-dla-liczby-1)
- [Look and say - przykład ciągu dla liczby większej niż 1](#look-and-say---przyk%c5%82ad-ci%c4%85gu-dla-liczby-wi%c4%99kszej-ni%c5%bc-1)
- [Look and say - kod Javascript](#look-and-say---kod-javascript)
- [Look and say - demo](#look-and-say---demo)
- [Look and say (conaway sequence) na CodingGame](#look-and-say-conaway-sequence-na-codinggame)
{:class='content_list'}
<script type="text/javascript" async
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

[*Lokk and say*](https://en.wikipedia.org/wiki/Look-and-say_sequence){:target="_blank"} jest ciągiem, który z angielskiego, jak sama nazwa wskazuje polega na opisaniu tego co się widzi. W języku polskim, ciąg ten znany jest bardziej jako "Ciąg Conway'a" opracowany i analizowany przez [John'a Conway'a](https://pl.wikipedia.org/wiki/John_Horton_Conway){:target="_blank"}.


# Look and say - przykład ciągu dla liczby 1
Rozpocznijmy dla przykładu nasz ciąg liczbą **jeden**:  
1. **1** - widzę jedną jedynkę, więc zapisuję to jako: widzę **1** (jedną) **1** (jedynkę)  
= **1 1 (jedną jedynkę)**  
Ponieważ jest to ciąg, więc musi nastąpić dalsza część, i tak nasz wynik **1 1** używamy jako kolejny argument ciągu, czyli:  
2. **1 1** - widzę dwie jedynki, a więc zapisuję to jako: widzę **2** (dwie) **1** (jedynki)  
= **2 1 (dwie jedynki)**  
Idąc tą metodą, teraz naszym argumentem jest **2 1**, czyli:
3. **2 1** - widzę jedną dwójkę i jedną jedynkę, zapisuję więc jako  
= **1 2    1 1 (jedną dwójkę, jedną jedynkę)**  
to ostatni raz (bo tak by można było wypisywać w nieskończoność), naszym argumentem jest teraz **1 2 1 1**
4. **1 2   1 1** - widzę **1**(jedną) **1**(jedynkę), **1**(jedną) **2** (dwójkę) i **2** (dwie) **1** (jedynki)  
= **1 1    1 2    2 1 (jedną jedynkę, jedną dwójkę i dwie jedynki)**

5. **1 1 1 2 2 1** (itd.)

Powyżej jest rozpisane dość szczegółowo i mało czytelnie, ale wiadomo już jak odczytywać. Tak więc, przeprowadziliśmy 5 interacji i naszym wynikiem jest ciąg:  
```conf
iteracja: 1, ciąg: 1 // początek ciągu
iteracja: 2, ciąg: 1 1 // w wierszu powyżej widzę jedną jedynkę
iteracja: 3, ciąg: 2 1 // w wierszu powyżej widzę dwie jedynki
iteracja: 4, ciąg: 1 2 1 1 // w wierszu powyżej widzę jedną dwójkę i jedną jedynkę
iteracja: 5, ciąg: 1 1 1 2 2 1 // w wierszu powyżej widzę jedną jedynkę, 
                               // jedną dwójkę i dwie jedynki
```
Połączmy go w całość:
```conf
1, 1 1, 2 1, 1 2 1 1, 1 1 1 2 2 1 // to jest pełny ciąg po 5 interacjach
```
# Look and say - przykład ciągu dla liczby większej niż 1
A co się stanie jak zaczniemy ciąg od liczby np. **25**
```conf
iteracja: 1, ciąg: 25 // początek
iteracja: 2, ciąg: 1 25 // widzę jedno dwadzieścia pięć
iteracja: 3, ciąg: 1 1 1 25 // widzę jedną jedynkę i jedno dwadzieścia pięć
iteracja: 4, ciąg: 3 1 1 25 // widzę trzy jedynki i jedno dwadzieścia pięć
iteracja: 5, ciąg: 1 3 2 1 1 25 // widzę jedną trójkę, dwie jedynki
                                // i jedno dwadzieścia pięć
```
Dla liczby **25** ciągiem przy **5** interacjach jest:
```conf
25, 1 25, 1 1 1 25, 3 1 1 25, 1 3 2 1 1 25
```
co można zapisać jako: 

{:.center} 
$$
\begin{align*}
LookAndSay = d,\: 1 d,\: 1 1\;1 d,\: 3 1\;1 d,\: 1 3\;2 1\;1 d (...)\\
 d\: -\: jest\: liczbą\: rozpoczynającą\: ciąg.
\end{align*}
$$

# Look and say - kod Javascript
Tyle z teorii, przejdźmy do kodu. Moje rozwiązanie bazuje na `js` i jest napisane tak by było jak najbardziej czytelne.
```javascript
const lookAndSay = (number, r) => {
    const res = [], // tablica gdzie będą przechowywane wyniki
          chars = (number + " ").split` `;// tutaj stosujemy drobny wybieg  
                                          // by dla ostatniej interacji móc policzyć  
                                          // co znajduje się w wierszu wyżej, 
                                          // ostatni element tablicy potrzebujemy mieć pusty
        
    let count = 1, //liczmy ilość występujących liczb
        prev = chars[0]; //od czegoś musimy zacząć
    
    for (let i = 1; i < chars.length; i++){        
      next = chars[i];      
      if(next === prev){          
        count++;          
      }else{          
        res.push(count, prev);
        prev = next,
        count = 1;
      }
    }
    return res.join(' ')
}

const lineSeq = (number, line, debug=false) => {
  res = number;  
  all = []
  for (let i = 1; i <= line; i++){      
    if(debug) {
      console.log(`iteracja: ${i}, ciąg: ${res}`);     
    }
    all.push(res)  
    res = lookAndSay(res,number);
  }
  return all.join`, `
}

line=5
number=25

console.log(lineSeq(number,line, true))
```
# Look and say - demo
{% include _posts/_examples/look-and-say.html %}

# Look and say (conaway sequence) na CodingGame
Zastosowałam ten kod do rozwiązania zadania: [Connaway Sequence](https://www.codingame.com/ide/puzzle/conway-sequence){:target="_blank"}. Pełne rozwiązanie zadania [jest na moim Githubie](https://github.com/capo1/codinggames/blob/master/medium/js/medium-conaway-sequence.js){:target="_blank"}, gdzie zamieszczam swoje rozwiązania z CodingGame.

