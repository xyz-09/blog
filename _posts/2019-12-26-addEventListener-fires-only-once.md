---
layout: post
title: addEventListener fires only once
date: 2019-12-26 07:12
category: [js, frontend]
author: Edyta Jozdowska
tags: [js,frontend]
excerpt: Mimo wielu lat spędzonych z kodem, przychodzą takie chwile gdy stajesz podczas pisania i zastanawiasz się "o co tutaj chodzi". Pomroczność jasna? Miałam tak ostatnio podczas pisania prostego validatora formularza. Walidacja formularza działała, ale tylko raz. 
---
<!-- TOC -->

- [1 HTML DOM](#1-html-dom)
- [2 addEventListener fires only once](#2-addeventlistener-fires-only-once)
{:class='content_list'}
<!-- /TOC -->

# 1 HTML DOM
Kiedy strona jest wczytywana w przeglądarkę tworzony jest tzw. `DOM` czyli **D**ocument **O**bject **M**odel strony. O tym powinien wiedzieć każdy, który ma styczność z kodem. Zaczynając od góry tworzony jest `Document` &rarr; `<html>` &rarr; `<head>` &rarr; `<body>` itd...

Dzięki DOM jesteśmy w stanie znaleźć element i poprzez `js` przypisać mu akcję np. `click`. Przypisując akcję w czystym js używamy `addEventListener`. To są podstawy podstaw. Podstawą jest też sposób zmiany zawartości elementu poprzez `innerHTML`. 

# 2 addEventListener fires only once
 Zdarzenie jakie przypisujemy elementowi będzie obowiązywać do czasu, aż zostanie on "ponownie stworzony". I tutaj pojawiło się rozwiązanie, dlaczego mój formularz walidował się jedynie raz. Otóż zmiana elementu poprzez `innerHTML` realizowana jest wyrenderowaniem w danym miejscu elementu na nowo. Nowy element nie ma "zarejestrowanego" zdarzenia, które jest przypisane na samym początku, gdy ładowany jest skrypt js. 
 
 Czasem warto wrócić do podstaw, im dalej idziemy zapominamy o elementarnej wiedzy.
