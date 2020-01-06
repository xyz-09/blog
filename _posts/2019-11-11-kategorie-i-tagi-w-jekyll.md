---
layout: post
title: Kategorie i tagi w Jekyll
date: 2019-11-11 09:30
category: [programowanie, jekyll]
author: Edyta Jozdowska
tags: ['jekyll','ruby']
summary:
excerpt: Krótki opis jak stworzyć oddzielne podstrony dla kategorii i tagów w Jekyll'u. 
---

<!-- TOC -->

- [1 Prosty przepis na Kategorie i Tagi w Jekyll](#1-prosty-przepis-na-kategorie-i-tagi-w-jekyll)
{:class='content_list'}
<!-- /TOC -->
Jekyll jest całkiem fajnym narzędziem. Z tego jednak powodu, że przeznaczony jest dla programistów wiele rzeczy musimy napisać sami. W dodatku, jeśli hostujemy nasze stronki na Github Pages pozbawieni jesteśmy niektórych gemów jak np. [jekyll-archive](https://github.com/jekyll/jekyll-archives/){:target="_blank"}, które napisali inni.

Możemy jednak skorzystać z wewnętrznych pluginów, które sami możemy napisać. Tak więc jak dodać automatycznie strony Kategorii i Tagów do naszego Jekyll'a.

# 1 Prosty przepis na Kategorie i Tagi w Jekyll

Tworzymy plik ```_blog_by_category.html_```  w katalogu ```./_layouts```. Tutaj moja uwaga, dla daty używam tłumaczenia, dlatego jest inlcude. Więcej na ten temat we wpisie [i18ln w Jekyll dla daty](../i18ln-w-Jekyll-dla-daty). 
{%raw%}
```html
---
layout: default
---
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

Tworzymy plik ```_blog_by_tags.html_```  w katalogu ```./_layouts```.
{%raw%}
```html
---
layout: default
---
<h1>Artykuły po Tagu: #{{page.tag | upcase}}</h1>
<div class="search_result">
        {% if site.tags[page.tag] %}
            {% for post in site.tags[page.tag] %}
            <h3>
              <a href="{{ post.url | prepend: site.baseurl }}">
                {{ post.title }}
              </a> 
              <span class="archive-meta">
                <time class="archive-date post_date" datetime="{{ post.date | date: "%Y-%m-%d" }}">
                  {% include date.html date=post.date %}
              </time>
              </span>
            </h3>
            {% endfor %}
        {% else %}
            <p>Brak wpisów o tym tagu.</p>
        {% endif %}
    </div>
```
{%endraw%}

Tworzymy plik w katalogu ```_plugins``` o nazwie np. ```categories_tags_gen.rb```
i w nim wklejamy kod:
```rb
module Jekyll
    class TagsGenerator < Generator
      def generate(site)
          tags_dir = Dir.pwd + '/tags'
  
          if !Dir.exists?(tags_dir)
              puts "Creating tags dir"
              Dir.mkdir(tags_dir)
          end
          regenerate_flag = false
  
          site.tags.each do |i|
              tag_name = i[0]
  
               if !File.exists?(tags_dir + '/' + tag_name + '.md')
                  puts "Creating tag page for: " + tag_name
                  tag_file = File.new(tags_dir + '/' + tag_name + '.md', "w")
                  tag_file.puts("---\nlayout: blog_by_tag\ntag: " + 
                  tag_name + "\npermalink: /tags/" + 
                  tag_name + "/\navoid_main_menu: true\n---")
                  tag_file.close
  
                  regenerate_flag = true
              end
          end  
          if regenerate_flag
              FileUtils.touch Dir.pwd+'/_config.yml'
          end
        end
    end
  
    class CategoryGenerator < Generator
  
      def generate(site)
          category_dir = Dir.pwd + '/kategoria'
  
          if !Dir.exists?(category_dir)
              puts "Creating kategoria dir"
              
              Dir.mkdir(category_dir)
          end
          regenerate_flag = false
  
          site.categories.each do |i|
              if !File.exists?(category_dir + '/' + i[0] + '.md')
                  puts "Creating category page for: " + i[0]
                  category_file = File.new(category_dir + '/' + i[0] + '.md', "w")
                  category_file.puts("---\nlayout: blog_by_category\ncategory: " + 
                  i[0] + "\npermalink: /kategoria/" + i[0] + "/\n---")
                  category_file.close  
                  regenerate_flag = true
              end
          end  
          if regenerate_flag
              FileUtils.touch Dir.pwd+'/_config.yml'
          end 
      end
    end
  end
  ```

  Restartujemy serwer by wdrożyć dodanego plugina ```categories_tags_generator```. 
  
  Po uruchomieniu serwera, do naszej instalacji zostały dodane dwa foldery ```kategoria``` i ```tags```, a w nich pojedyncze pliki ```{nazwa_kategorii/tagu}.md```. 
  
  Podczas generowania strony w folderze ```_site```, w którym to docelowo otrzymujemy nasze wygenerowane przez Jekyll'a pliki html powinny znaleźć się odpowiednie nazwą katalogi ```tags``` i ```kategoria```, a w nich nazwa i odpowiedni, wygenerowany plik ```index.html```

  Nie wiem tylko czy będzie tutaj działało stronnicowanie. To zobaczę jak dodam więcej artykułów do tego bloga. Póki co, rozwiązanie spełnia swoje zadanie. Mam podział na tagi i kategorie, które co ważne działa z GitHub Pages :). 

  **Powodzenia w waszych instalacjach!**