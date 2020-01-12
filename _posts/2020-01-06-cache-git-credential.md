---
layout: post
title: Tymczasowe zapisanie loginu i hasła dla gita
date: 2020-01-06 11:13
category: [git]
author: Jozdowska Edyta
tags: [git]
excerpt: Krótka informacja jak tymczasowo zapamiętać hasło i login dla githuba.
---
<!-- TOC -->

- [1.Zapamiętanie loginu i hasła - słowa wstępu](#1zapami%c4%99tanie-loginu-i-has%c5%82a---s%c5%82owa-wst%c4%99pu)
- [2.Zapamiętanie loginu i hasła](#2zapami%c4%99tanie-loginu-i-has%c5%82a)
{:class='content_list'}
<!-- /TOC -->

# 1.Zapamiętanie loginu i hasła - słowa wstępu
Jakiś czas temu odbyłam z przyjacielem rozmowę na temat mojego podejścia do bezpieczeństwa. Według niego bardzo lekko traktuję bezpieczeństwo niektórych usług, jak prywatne konto dla githuba :blush:.  
Stwierdził to na podstawie, między innymi, faktu, że swoje hasło i login miałam na trwałe zapisane w pliku, z którego podczas wysyłania aktualizacji korzystałam w skrypcie. 

Choć tego nie lubię :unamused: muszę przyznać mu rację. Owy plik miałam jedynie na swoim komputerze, na innych musiałam wpisywać z tzw. "ręki" dane logowania. Nie zmienia to faktu, że dane logowania były dostępne.  

Na szczęście git "jest" elastyczny :smile: - istnieje tymczasowe zapisanie hasła i loginu. Domyślnie zapisanie danych trwa 15 minut, potem znów należy wpisywać hasło i login by wysłać aktualizację. I to rozwiązanie mi się podoba :grinning:

# 2.Zapamiętanie loginu i hasła
Aby tymczasowo zapisać dane logowania dla git'a  w terminalu należy wpisać
```shell
git config --global credential.helper cache

# zapisz dane logowania w pamięci na określony czas
```
Aby zmienić czas z 15 minut na zdefiniowany przez nas na terminalu należy wpisać poniższy kod,  
gdzie 3600 = 60 * 60 / ustawienia podawane są w sekundach /:
```shell
git config --global credential.helper 'cache --timeout=3600'

# zapisz dane logowania w pamięci na określony czas 60*60=3600 sekund
```
[Sposoby cachowania danych logowania do Gita dla innych wersji systemu](https://help.github.com/en/github/using-git/caching-your-github-password-in-git){:target="_blank"}