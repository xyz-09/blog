---
layout: post
title: Viewport size vs Screen size
date: 2020-12-23 07:31
category: frontend
author: Edyta Jozdowska
tags: [forntend]
excerpt: W miarę rozwoju techniki i urządzeń, producenci prześcigają się w tworzeniu ekranów z upakowaną liczbą pikseli. Stąd&nbsp;rozdzielczości takie jak fullHD, 4K, 8K itp. Ciekawe kiedy skończą swój wyścig, ale nie o tym będzie ten wpis. Wpis będzie o różnicy między rozdzielczością jaką podaje producent/jaka jest ustawiona w systemie, a faktycznym obszarem jaki przeznaczony jest na wyświetlenie np. aplikacji www.
published: true
---

- [Viewport sizes](#viewport-sizes)
- [Zoom na ratunek - tylko czy faktycznie?](#zoom-na-ratunek---tylko-czy-faktycznie)
- [Właściwy viewport size](#właściwy-viewport-size)
{:class='content_list'}

W miarę rozwoju techniki i urządzeń, producenci prześcigają się w tworzeniu ekranów z upakowaną liczbą pikseli. Stąd&nbsp;rozdzielczości takie jak fullHD, 4K, 8K itp. Ciekawe kiedy skończą swój wyścig, ale nie o tym będzie ten wpis. Wpis będzie o różnicy między rozdzielczością jaką podaje producent/jaka jest ustawiona w systemie, a faktycznym obszarem jaki przeznaczony jest na wyświetlenie np. aplikacji www.

<script type="text/javascript" async
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

## Viewport sizes
Upakowanie pikseli na ekranach rośnie - co zapewnia nam bardziej ostre zdjęcia, tyle, że same rozmiary ekranów nie zwiększają się. Bo któż by ze sobą "targał" laptopa dwukrotnie większego niż te, co są teraz. Mało poręczne. Stąd, mimo, że same **rozdzielczości się zwiększają**, **obszar wyświetlania pozostaje bez zmian**. A skoro pozostaje bez zmian, to coś z tym fantem trzeba zrobić. 

## Zoom na ratunek - tylko czy faktycznie?
Każdy z nas na pewno spotkał się z tym, że zmieniając rozdzielczość swojego ekranu na wyższą, elementy wyświetlane na ekranie stawały się, po prostu mniejsze. Z tym samym problemem spotkali się twórcy przeglądarek. I tak samo jak w systemie np. windows 10, tak i w przeglądarce ustawia się wyższy zoom, czyli przybliżenie ekranu. Dokładniej, jeśli chodzi o przeglądarkę, zoom dziedziczony jest z ustawień systemowych. Elementy stają się wtedy większe.  W ten oto sposób, na ekranie o większym zagęszczeniu pikseli, jednak o podobnym fizycznym wymiarze, można przedstawić treść, która będzie dla użytkownika czytelna. 

Niestety zmieniając zoom, zmniejszamy dostępny w przeglądarce obszar wyświetlania **viewport size**, co ma duży wpływ na aplikacje zaprojektowane z myślą o dostosowaniu się do rozdzielczości ekranu.   

Dla przykładu weźmy laptopa który w ustawieniach systemowych ma zaznaczoną **"rozdzielczość fizyczną"** ekranu na 1920x1080 pikseli (taką jaką podaje producent :smile:). Tej samej rozdzielczość jest mój największy monitor - z pewnością nie chciałabym tej wielkości laptopa i on (laptop) tej wielkości nie jest. Jest mniej więcej wielkości urządzeń o **"starej" rozdzielczości** 1280x720 pikseli i taki ma dokładnie obszar wyświetlania na monitorze. Aby wszystko było wyraźne dla użytkownika, system ustawiony jest na zoom 150%. Tak więc z rozdzielczości 1920x1080 zeszliśmy do 1280x720. Co ma jakiś sens, gdyż:

{:.center} 
$$ 
\begin{align*}
 1920 / 1.5 = 1280 \\
 1080 / 1.5 = 720 \\
\end{align*}
$$

Z punktu widzenia developera, widok 1280x720 może mieć inny układ niż 1920x1080 - stąd chodząc po sieci nie dziwcie się, że wyświetlana właśnie strona jest "zbyt duża" lub "zbyt mała". Ona jest zaprojektowana 1:1 na zoom 100%.

## Właściwy viewport size
Dodając do tego wszelkie paski np. systemowa belka na dole, ramka przeglądarki, pasek url itp. zmniejszamy jeszcze obszar jaki jest dostępny na aplikację. O ile na długość ekranu nie ma to większego wpływu, o tyle w dół mamy coraz mniej miejsca na treść właściwą - stąd nasz viewport może się zmniejszyć z 720px na około 570px (ustawienia windows 10, wliczając w to pasek systemowy, pasek url przeglądarki chrome i pasek zakładek).

Współcześnie , projektując strony www, aplikacje przeglądarkowe itp. trzeba brać to pod uwagę. 

Muszę przyznać, że trochę tęsknię za czasami, kiedy nie trzeba było ropatrywać takich problemów. 

Jeśli jesteś ciekaw, jaki masz obszar wyświetlania, mam do tego narzędzie, które ułatwia mi pracę z klientami nietechnicznymi: 
{% include _posts/_examples/viewportsize.html %}

**DPR** - to w uproszeniu zastosowany zoom. Zmieniając swój zoom w przeglądarce ``CTRL + "+"`` lub ``CTRL + "-"`` zobaczysz jak powyższe parametry się zmieniają. 

Ten skrypt stosuję, gdy potrzebne jest przedstawienie 1:1 zdjęcia, np w slajderze o bardzo wąskich kadrach, a zdarza mi się to bardzo często. Podaję wtedy linka do [skryptu mierzącego obszar wyświetlania użytkownika](http://ej-app.pl/vs/){:target="_blank"} i proszę o wysłanie informacji tam wyświetlonych. Naprawdę ułatwia pracę i oszczędza czas :wink: 