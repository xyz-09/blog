---
layout: post
title: i18ln w Jekyll dla daty
date: 2019-11-11 13:14
category: [programowanie, jekyll]
author: 
tags: [jekyll, ruby ]
excerpt: Wpis o tym jak zrobić tłumaczenie daty dla Jekyll'a. Posługuję się językiem polskim jednak nic nie stoi na przeszkodzie by był to język francuski, niemiecki czy nawet hindi.
---
Stawiając tego bloga, spotkałam się z Jekyll'em po raz pierwszy. Jednak nie byłabym sobą, gdybym nie rozszerzyła templeta jakiego zainstalowałam o własne funkcjonalności. Są to między innymi:
* [Ustawienie widoku kategorii i tagów](../kategorie-i-tagi-w-jekyll/)
* [Dynamiczne menu](../dynamiczne-menu/)
* Dodanie opcji "Kopiuj" i oznaczenie kodu dla generowanych fragmentów kodu tzw. highlight
* Tłumaczenie daty z języka angielskiego na polski - **ten wpis właśnie czytasz**
## Prosty przepis na dodanie i18Ln na podstawie daty

Utwórz plik w katalogu ```_includes``` o nazwie ```date.html``` i wprowadź do niego poniższy kod:
{%raw%}
```liquid
{{ include.date | date: "%d" }}
{% assign m = include.date | date: "%-m" %}
    {% case m %}
            {% when  '1' %}Styczeń
            {% when  '2' %}Luty
            {% when  '3' %}Marzec
            {% when  '4' %}Kwiecień
            {% when  '5' %}Maj
            {% when  '6' %}Czerwiec
            {% when  '7' %}Lipiec
            {% when  '8' %}Sierpień
            {% when  '9' %}Wrzesień
            {% when '10' %}Październik
            {% when '11' %}Listopad
            {% when '12' %}Grudzień
    {% endcase %}
{{ include.date | date: "%Y" }}
```
{%endraw%}

Liquid jest interpreterem szablonów dlatego jak w Smarty, stosowanie w nim nowych zmiennych, nie jest zalecane, ale istnieje inny sposób zapisu powyższego kodu. Może nie jest do końca elegancki.  ```Liquid``` nie ma metody na utworzenie tablicy, więc jest to swego rodzaju obejście. 

W dodatku 'mój mężczyzna' twierdzi, że 
używanie splitów i innych wymysłów jest po to aby się popisać i zaburza przejrzystość. **Cóż, nie dla mnie :)**  

### Krótsza forma powyższego kodu no i moim zdaniem jest większa możliwość rozszerzenia go, jak by doszedł drugi język.
{% raw %}
```liquid
{{ include.date | date: "%d" }}

{% assign months = "Styczeń,Luty,Marzec,Kwiecień,
                    Maj,Czerwiec,Lipiec,Sierpień,
                    Wrzesień,Październik,Listopad,Grudzień" | split: ',' %}

{% assign m = include.date | date: "%-m" | plus: 0 %}
{{ months[m] }}

{{ include.date | date: "%Y" }}
```


Serio, to całość. Nic innego nie potrzeba.  

## Sposób użycia
Sposób użycia w plikach Jekyll'a jest następujący:
```liquid
{% include date.html date=post.date %}
```
{%endraw%}

Wynik jet taki, jak mam na blogu np:
```
10 listopad 2019
```
Jekyll i jego prostota zaczyna mi się podobać coraz bardziej :).