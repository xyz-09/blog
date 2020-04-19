---
layout: post
title: Prosta aplikacja z użyciem flask
date: 2020-04-19 05:28
category: [python]
author: Edyta Jozdowska
tags: [python, flask]
excerpt: Prosty przykład wykorzystania mikrofremowrk'a aplikacji webowych "Flask" dla pythona.
published: true
---


- [Flask](#flask)
- [Aplikacja webowa - podstawy](#aplikacja-webowa---podstawy)
- [Składowe aplikacji](#sk%c5%82adowe-aplikacji)
- [Działanie aplikacji](#dzia%c5%82anie-aplikacji)
{:class='content_list'}

Ten post powstał na życzenie :smile:  
Mój przyjaciel poprosił mnie, abym napisała i wdrożyła bardzo prostą aplikację (choć słowo aplikacja może być nad wyrost, będę go jednak używać) napisaną z użyciem Flask'a.  
W dodatku poprosił, o omówienie budowy powstałej aplikacji. Wygodny jest prawda :wink:  
Chciał zrozumieć podstawy tego freamwork'a.  

Mimo, że nie miałam do tej pory styczności z Flaskiem, zgodziłam się.  
Jestem bardziej obeznana w budowie aplikacji webowych - i jak się okazało koła nikt nie wymyślił tutaj od nowa. Działa na podobnych zasadach jak freamworki z innych języków np. Lumen od Laravel'a dla PHP.

## Flask
[**Flask**](https://flask.palletsprojects.com/en/1.1.x/){:target="_blank"} jak podaje wikipedia to mikrofreamwork aplikacji webowych napisany w języku python. Muszę przyznać, że jest dość przyjazny. Ma też sporo bibliotek rozszerzających jego działanie zagregowanych na [pypi.org]("https://pypi.org/search/?q=flask&o="){:target="blank"}. Silnikiem generowania szablonów użytym we Flasku jest [Jinja](https://jinja.palletsprojects.com/en/2.11.x/){:target="_blank"}.

Ten post będzie bazował na przykładzie jaki zamieściłam na githubie: [Look And Say with flask](https://github.com/capo1/LookAndSayWithFlask). Samą sekwencję Look And Say omówiłam w swoim poście [Look and Say Sequence](../look-and-say-sequence).  
Wpierw jednak należy przytoczyć podstawy podstaw, jak działa sama aplikacja webowa. 

## Aplikacja webowa - podstawy
W każdej aplikacji webowej, niezależnie w czym i jak zostanie napisana, możemy wyróżnić podstawowe składowe:
 **KLIENTA** i  **SERWER**, a także takie akcje jak: **prezentacja danych** i **przetwarzanie danych**. 

W zależności od przeznaczenia i architektury aplikacji powyższe akcje będą realizowane w różnych miejscach. 

1. **Prezentacja**: Do tej części zaliczymy pliki ``.html``, ``.css`` w tym ``.scss`` i w pewnym stopniu ``.js``. Jak nazwa wskazuje, zaliczone zostaną tutaj te elementy, które pozwolą nam wyświetlać dane, ale też zebrać dane od użytkownika. W tej warstwie następuje interakcja **użytkownik -> aplikacja**.  
2. **Przetwarzanie**: W zależności od budowy, dane mogą być przetwarzane w ``.js``, ale też wysłane na serwer i przetworzone w języku skryptowym np. ``py`` lub ``php``. 
Następuje tutaj też obsługa przygotowania danych w taki sposób, by były one później zrozumiałe dla klienta lub dla serwera.  
3. **Dane**: Obsługa danych np. na bazie danych.

Można wyróżnić model, gdzie zarówno **prezentacja** jak i **przetwarzanie** będzie odbywało się **po stronie klienta**, natomiast **po stronie serwera pozostanie** jedynie **obsługa bazy danych** - i ten model jest obecnie najczęściej spotykany. Plusem takiej architektury jest odciążenie serwera od zadań przetwarzania danych.  

<style>
  .animIcon svg{display:none!important}
  .animIcon:hover svg{display:block!important}
</style>

{:.center}
{%
    include image.html 
    src="https://sketchviz.com/@capo1/82a731f9e584a00de80e8d3d66c86030/8dec5a27f64331ad12e54ccc4a7c4af2b70b3fc4.sketchy.png" 
    href="https://sketchviz.com/@capo1/82a731f9e584a00de80e8d3d66c86030/8dec5a27f64331ad12e54ccc4a7c4af2b70b3fc4.sketchy.png"
    caption="Rysunek 1. Warstwy aplikacji Klient -> Serwer: <a href='//sketchviz.com/@capo1/82a731f9e584a00de80e8d3d66c86030' style='color:#555;'>Sketchviz</a> "
%}

Drugi model, starszy, polega na **przetwarzaniu danych po stronie serwera**, natomiast **po stronie klienta** odbywa się tylko **prezentacja danych**.

{:.center}
{%
    include image.html 
    src="https://sketchviz.com/@capo1/d40d197633a987f418db8d45b77606cd/c28815f8f2b21f9a77e9876463fa8d85f5c84d2b.sketchy.png" 
    href="https://sketchviz.com/@capo1/d40d197633a987f418db8d45b77606cd/c28815f8f2b21f9a77e9876463fa8d85f5c84d2b.sketchy.png"
    caption="Rysunek 2. Warstwy aplikacji Klient -> Serwer: <a href='//sketchviz.com/@capo1/d40d197633a987f418db8d45b77606cd' style='color:#555;'>Sketchviz</a> "
%}

W trzecim modelu **przetwarzanie** będzie się odbywało zarówno po stronie klienta, jak i po stronie serwera.

Wracając do aplikacji "Look And Say with flask", składa się ona z dwóch warstw: **prezentacji** odbywającej się po stronie **klienta** oraz **przetwarzaniu** danych realizowanych po stronie **serwera**.  
Schemat działania aplikacji jest prosty. Użytkownik w przeglądarce podaje dwie liczby, które są niezbędne do obliczenia sekwencji look and say. Dane te z formularza wysyłane są na serwer, gdzie zostają przetworzone w funkcji Look and say, a&nbsp;następnie wynik zwracany jest z powrotem do przeglądarki.

## Składowe aplikacji
W aplikacjach dąży się do rozdzielenia poszczególnych funkcji aplikacji na składowe, tak aby po pierwsze bardziej móc nad nimi "zapanować" w miarę rozrostu aplikacji, oraz by poszczególne elementy móc wykorzystywać kilkukrotnie, zarówno w ramach samej aplikacji, jak też kopiując je do innych aplikacji.  
Budowa aplikacji będzie składać się w moim przypadku z katalogów i plików:

{:.center}
{%
    include image.html 
    src="https://sketchviz.com/@capo1/66c8868cab282c00bf714e0e42f4e1eb/42388a5c3106dd7b8414ecbb220d1abbc65354cb.sketchy.png" 
    href="https://sketchviz.com/@capo1/66c8868cab282c00bf714e0e42f4e1eb/42388a5c3106dd7b8414ecbb220d1abbc65354cb.sketchy.png"
    caption="Rysunek 2. Drzewo katalogów i plików aplikacji LookAndSayWithFlask  <a href='//sketchviz.com/@capo1/66c8868cab282c00bf714e0e42f4e1eb' style='color:#555;'>Sketchviz</a>"
%}

- **static/css** - W folderze `static` będą znajdować się wszystkie pliki statyczne typu ``.css``, ``.js``, ``images``. W tej przykładowej aplikacji jest jedynie `.css`
- **templates** - gdzie mamy wydzielony kod HTML podzielony na plik główny szablonu odpowiedzialny za prezentację `index.html` oraz składowe zamieszczone w katalogu `components`. 
- **_app.py_** - główny plik, odpowiedzialny za naszą aplikację.
- **_lookAndSay.py_** - plik odpowiedzialny za obliczenie danych na serwerze.
 
## Działanie aplikacji
{:class="clear"}
Rozrysujmy co z czym jest powiązane:

{:class="clear center"}
{%
    include image.html 
    src="https://sketchviz.com/@capo1/7481f1bc3dab2d9cda2106131f2f2e1b/2bdf1819f8ad0f593201f5e73f23cd06792f79bb.sketchy.png" 
    href="https://sketchviz.com/@capo1/7481f1bc3dab2d9cda2106131f2f2e1b/2bdf1819f8ad0f593201f5e73f23cd06792f79bb.sketchy.png"
    caption="Rysunek 3. Schemat działania aplikacji, utworzone dzięki: <a href='//sketchviz.com/@capo1/7481f1bc3dab2d9cda2106131f2f2e1b' style='color:#555;'>Sketchviz</a>"
%}

**Czarna strzałka** na powyższej grafice określa w jaki sposób dane podane przez użytkownika są przekazywane między poszczególnymi warstwami. Z **prezentacji** do **prztwarzania na serwerze** przesyłane są metodą **POST**.

**Niebieską strzałką**{:style="color:#0000ff"}  zaznaczona jest droga odpowiedzi, aż do części oznaczonej jako `result.html`, gdzie dane są wyświetlane jako wynik operacji wykonywanych na serwerze. Z serwera zwracana jest lista przypisana do zmiennej `result`, przez którą dzięki ``Jinja`` wykonywana jest loopa z wyświetleniem wyniku, dla każdej z interacji.  

**Szarą strzałką**{:style="color:gray"} oznaczyłam, te elementy, które są załączane do pliku `index.html` i które są ściśle odpowiedzialne za prezentację aplikacji użytkownikowi. 