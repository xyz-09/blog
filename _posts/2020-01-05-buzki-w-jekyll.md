---
layout: post
title: Dodanie emotoikon w jeykyll'u
date: 2020-01-05 20:22
category: [jekyll]
author: Edyta Jozdowska
tags: [jekyll, smiles, emoji]
excerpt: Zakochałam się. W emotoikonach.
---
## Emotoikony
Każdy współczesny człowiek wie co to są emotoikony, nie muszę chyba tłumaczyć, a jeśli ktoś nie wie to wytłumaczenie znajduje się [pod tym linkiem na wikipedii](https://pl.wikipedia.org/wiki/Emotikon). 

Jesteśmy przyzwyczajeni z popularnych komunikatorów jak Messanger, Signal, WhatsApp do używania obrazków, mających wskazać nastawienie lub podkreślić dane zdanie bądź związane z nim emocje. Ba, nawet GaduGadu i Spik (jedne z pierwszych polskich komunikatorów) miały buźki.

Sama bardzo często w komunikacji z innymi ludźmi, zwłaszcza tymi bliskimi, lub z którymi mi się dobrze rozmawia, używam obrazków. Brakowało mi tego tutaj, na blogu. Jednak od 3 wpisów w tył w moich tekstach pojawiają się już emotki. Wszystko dzięki dodatkowi [jemoji](https://github.com/jekyll/jemoji){:target="_blank"} :yum:.

Pod powyższym linkiem napisane jest jak je zainstalować w jekyll'u. Napiszę jednak po swojemu.

## Jemoji w jekyll
1. W pliku `Gemfile` dodajemy 
   ```ruby
   gem 'jemoji'
   ```
2. A w pliku `_config.yml` w sekcji plugins wpisujemy `- jemoji`
```yml
plugins:
- jemoji
  ```
I to wszystko :relaxed:
## Spis emotoikonek
Spis dostępnych emotoikonek i ich wartości tekstowych znajdziemy na stronie [webfx.com](https://www.webfx.com/tools/emoji-cheat-sheet/)  
Podam tylko te, które najczęściej używam:

| buźka                          | kod                              | buźka         | kod                                     |
|--------------------------------|----------------------------------|---------------|-----------------------------------------|
| :smile:                        | `:smile:`                        | :blush:       | `:blush:`                               |
| :open_mouth:                   | `:open_mouth:`                   | :smirk:       | `:smirk:`                               |
| :satisfied:                    | `:satisfied:`                    | :smiling_imp: | `:smiling_imp:` tą bardzo lubię :blush: |
| :wink:                         | `:wink:`                         | :heart_eyes:  | `:heart_eyes:`                          |
| :stuck_out_tongue_closed_eyes: | `:stuck_out_tongue_closed_eyes:` | :sob:         | `:sob:`                                 |
| :scream:                       | `:scream:`                       | :sunglasses:  | `:sunglasses:`                          |
| :yum:                          | `:yum:`                          | :joy:         | `:joy:`                                 |

Bez obrazków świat byłby nudny :wink::smirk: 