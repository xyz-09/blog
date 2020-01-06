---
layout: post
title: Dynamiczne menu dla Jekyll'a
date: 2019-11-11 13:30
category: [jekyll, programowanie]
author: Edyta Jozdowska
tags: [liquid, ruby, yaml]
excerpt: Jak stworzyć dynamiczne menu w templecie Jekyll'a. Jak wszystko w tym generatorze jest proste i przyjemne. Tym razem wykorzystamy Yaml.
---
<!-- TOC -->

- [1 Prosty przepis na dynamiczne menu w Jekyll'u](#1-prosty-przepis-na-dynamiczne-menu-w-jekyllu)
{:class='content_list'}
<!-- /TOC -->
Stawiając tego bloga, spotkałam się z Jekyll'em po raz pierwszy. Jednak nie byłabym sobą, gdybym nie rozszerzyła templeta jakiego zainstalowałam o własne funkcjonalności. Są to między innymi:
* [Ustawienie widoku kategorii i tagów](../kategorie-i-tagi-w-jekyll/)
* Dynamiczne menu - **ten wpis właśnie czytasz**
* Dodanie opcji "Kopiuj" i oznaczenie kodu dla generowanych fragmentów kodu tzw. highlight
* [Tłumaczenie daty z domyślnego języka angielskiego na polski](../i18ln-w-Jekyll-dla-daty) 

Do dzieła zatem.

# 1 Prosty przepis na dynamiczne menu w Jekyll'u
Tutaj śpieszę z wyjaśnieniami, dynamiczne, ponieważ generowane z kodu. Można je zrobić w dwojaki sposób. Możemy ustawić menu w pliku konfiguracyjnym, wiele templetów właśnie tak skonstruowanych widziałam. Wolę jednak sposób z wykorzystaniem katalogu ```_data``` i ten też opiszę. Wydaj mi się on bardziej modułowy.

1. Jeśli nie mamy w swojej instalacji, tworzymy katalog ```_data```
2. W katalogu ```_data``` tworzymy plik o nazwie np. ```navigation.yml```
3. W ```navigation.yml``` wpisujemy nasze linki. Poniżej przykład:
```yml
- name: Strona główna
  link:
- name: O mnie
  link: o-mnie
- name: Szukaj
  link: search
  ```
4. Wiecie, że to jest już wszystko ;). Teraz możemy nasze menu wykorzystać w instalacji.  
Poniżej podaję przykład generowania menu w templecie. W poniższym przykładzie brane jest pod uwagę czy link menu jest zewnętrzny, czy wewnętrzny oraz zaznaczenie obecnej strony.
{% raw %}
``` liquid
<nav>
  {% for item in site.data.navigation %}
    <a {% if item.link contains '://' %}
          href="{{item.link}}" 
       {% else %}
         href="{{ site.baseurl }}/{{ item.link  }}" 
      {% endif %} 
      
      {% if item.target%} 
        target="{{item.target}}"
      {%endif %} 

      {% assign url = item.link  | append:"/" | prepend:"/" %}      
      
      {% if page.url == url %} 
        style="color: #c5c5c5;" 
      {% endif %}>
      
      {{ item.name }}
    </a>
  {% endfor %}
</nav>
```
{% endraw %}
