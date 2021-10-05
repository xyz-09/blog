---
layout: page
title: Szukaj
permalink: /search/
---

<div id="search-container">
    <input type="text" id="search-input" placeholder="Szukaj w postach i na stronach...">
    <div id="results-container"></div>
</div>

<script src="{{ site.baseurl }}/assets/simple-jekyll-search.min.js" type="text/javascript"></script>

<script>
    SimpleJekyllSearch({
    searchInput: document.getElementById('search-input'),
    resultsContainer: document.getElementById('results-container'),
    searchResultTemplate: '<div style="text-align: left !important;" class="search_result"><a href="{url}"><h1 style="text-align:left !important;">{title}</h1></a><div class="post_date">{date}</span></div><div style="text-transform: uppercase;"><small>Tagi: #{tags}</small> | <small>Kategoria:{category}</small></div><p>{excerpt}</p>',
    json: '{{ site.baseurl }}/search.json'
    });
</script>