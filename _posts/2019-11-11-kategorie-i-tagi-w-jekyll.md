---
layout: post
title: Kategorie i tagi w Jekyll
date: 2019-11-11 09:30
category: programowanie
author: Edyta Jozdowska
tags: ['jekyll','ruby']
summary: 
---

Jekyll jest całkiem fajnym narzędziem. Z tego jednak powodu, że przeznaczony jest dla programistów wiele rzeczy musimy napisać sami. W dodatku, jesli hostujemy nasze stronki na Github Pages pozbawieni jesteśmy niektórych gemów jak np. [jekyll-archive](https://github.com/jekyll/jekyll-archives/){:target="_blank"}, które napisali inni.

Możemy jednak skorzystać z wewnetrznych pluginów, które sami możemy napisać. Tak więc jak dodać automatycznie strony Kategorii i Tagów do naszego Jekyll'a.

## Prosty przepis na Kategorie i Tagi w Jekyll

1. Tworzymy plik _blog_by_category.html_  w katalogu _./_layouts_. Tutaj moja uwaga, dla daty używam tłumaczenia, dlatego jest inlcude. 
{%raw%}
```html
<h1>Artykuły według kategorii: {{page.category | upcase}}</h1>
<div>
    {% if site.categories[page.category] %}
        {% for post in site.categories[page.category] %}
        <h3>
          <a href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a> 
          <span class="archive-meta">
            <time datetime="{{ post.date | date: "%Y-%m-%d" }}">
              <!--tutaj można użyć np post.date | date: "%Y-%m-%d 
                by otrzymać datę rok-miesiąc-dzień -->
              {% include date.html date=post.date %}
            </time>
          </span>
        </h3>
        { % endfor %}
    {% else %}
        <p>Brak wpisów w tej kategorii.</p>
    { % endif % }
</div>
```
{%endraw%}