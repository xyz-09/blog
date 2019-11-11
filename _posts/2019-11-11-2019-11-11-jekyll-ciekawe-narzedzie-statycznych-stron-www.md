---
layout: post
title: Jekyll jako ciekawe narzędzie statycznych stron www cz. 1
date: 2019-11-11 06:31
category: [programowanie, jekyll]
author: Edyta Jozdowska
tags: [jekyll, ruby, yaml]
summary:
excerpt: Jekyll jest to prosty, modułowy, generator stron statycznych. Do swojego działania wykorzystuje takie narzędzia jak Markdown, Liquid, HTML i CSS. 
---

**Jekyll** jest to prosty, modułowy, generator stron statycznych. Do swojego działania wykorzystuje takie narzędzia jak [Markdown](https://pl.wikipedia.org/wiki/Markdown), [Liquid](https://github.com/Shopify/liquid/wiki), HTML i CSS.

Długie lata system blogowy kojarzył mi się z Wordpressem. No bo jak najszybciej postawić stronę z bazą danych, która będzie dość użyteczna do pisania swoich notatek i przemyśleń, nie będzie wymagała specjalnych zabiegów, które w miarę czasu zniechęcają do napisania czegokolwiek, gdyż by opublikować jakiś wpis, trzeba wykonać mnóstwo innych czynności - tylko wordpress lub inny opensource CMS. Logujesz się, siadasz i piszesz. Zapewne wiele ludzi myśli podobnie.

Otóż jak się okazuje, do tak prostych zadań można wykorzystać trochę mniejsze środowisko - i tu na scenę wkracza Jekyll. 

Pewnego dnia mój facet wysłał mi linka do Jekyll'a. W pierwszym momencie stwierdziłam - ot ciekawostka. Naciskał na mnie "forkuj ten templet", "sforkowałaś już?" itp. Stwierdziłam "ok", skoro nie daje spokoju, coś musi być na rzeczy. 

Sklonowałam repo wskazanego templeta z Jekyll'a i... mi się spodobało. Naprawdę jest to dobre narzędzie. Zastanawiam się jedynie nad jego wydajnością w miarę wzrostu wpisów i notatek. Rozrost treści zazwyczaj ma wpływ na szybkość działania systemu. Zobaczymy jak ta instalacja poradzi sobie z tym zadaniem. Moje obawy dotyczą głównie generacji feed'a dla postów - teraz gdy mam tylko kilka wpisów zajmuje to 0.629 sekund. To bardzo dużo. Zobaczymy jak będzie dalej.

## Instalacja
Sama instalacja Jekyll'a jest bardzo prosta. Przedstawię sposób instalacji na dystrybucji linux'a Bunsen, gdyż tego właśnie środowiska używam. Instalacja Jekyll'a na innym środowisku opisana jest na stronie www projektu [https://jekyllrb.com/docs/installation/](https://jekyllrb.com/docs/installation/){:target="_blank"}

1. Otwieramy terminal
2. Wpisujemy komendę:
```shell
sudo apt install ruby-full build-essential
```
3. Po zainstalowaniu powyższego, dodajemy zmienne środowiskowe do _~/.bashrc_
```shell
echo '# Install Ruby Gems to ~/gems' >> ~/.bashrc
echo 'export GEM_HOME="$HOME/gems"' >> ~/.bashrc
echo 'export PATH="$HOME/gems/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```
4. No i instalujemy Jekyll'a:
```shell
gem install jekyll bundler
```
5. Następnie możemy skolonować repo jendego z wielu themów jekyll'a np [Reverie](https://github.com/amitmerchant1990/reverie) - ten templet użyłam do tego bloga, lub też rozpocząć z nową czystą instalacją. 

6. Po skolonowaniu lokalnie templeta uruchamiamy polecenie:
```shell
bundle exec jekyll serve
```
7. Powinniśmy otrzymać komunikat na terminalu:
```shell 
Configuration file: path_to_jekyll_template/_config.yml
            Source: path_to_jekyll_template
       Destination: path_to_jekyll_template/_site
 Incremental build: disabled. Enable with --incremental
      Generating... 
       Jekyll Feed: Generating feed for posts
                    done in 0.629 seconds.
 Auto-regeneration: enabled for 'path_to_jekyll_template'
    Server address: http://127.0.0.1:4000/blog/
  Server running... press ctrl-c to stop.
```
8. Server działa. Otwieramy przeglądarkę i sprawdzamy  nasz adres: 127.0.0.1:4000

Proste i wydajne. W nastĘpnym [wpisie](../kategorie-i-tagi-w-jekyll/) opiszę jak dodać prosty system powiązania postów według kategorii i tagów, tak aby działał dla github Pages.

