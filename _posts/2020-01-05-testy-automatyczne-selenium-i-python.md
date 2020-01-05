---
layout: post
title: Testy automatyczne w Selenium i Pythonie - cz1. Uruchomienie środowiska testowego
date: 2020-01-05 15:00
category: [python, selenium]
author: 
tags: [python, selenium, pytest]
excerpt: Jak zacząć przygodę z testami automatycznymi Selenium w Pythonie
---
## Testy automatyczne
**Testy automatyczne** to inaczej sprawdzanie poprawności działania aplikacji w sposób zautomatyzowany. 

Wykształciła się osobna rola w świecie IT określana jako **Tester**, który pisze testy automatyczne lub przeprowadza testy manualne. W moim przekonaniu testy automatyczne nie zastąpią ludzkiego oka, ale dla najczęściej powtarzających się czynności jak np. wypełnienie formularza i sprawdzenie odpowiedzi są bardzo przydatne i co najważniejsze **SZYBKIE** :yum:

## Instalacja
Do instalacji potrzebujemy:
- [selenium pod pythona](https://selenium-python.readthedocs.io){:target="_blank"} (must have), 
- [driver'a Chrome](https://chromedriver.chromium.org){:target="_blank"} (must have):  
  Pobieramy go na dysk lokalny. **Uwaga - trzeba wybrać odpowiednią wersję pod przeglądarkę**.  
  Ja swoją (Chrome mam w wersji 79.0.3945.88) więc pobrałam sterowniki **ChromeDriver 79.0.3945.36** pod odpowiednią wersję Linux'a. Działają :smile:
- [pytest](https://docs.pytest.org/en/latest/contents.html){:target="_blank"} (optional):  
  Pytest jest opcjonalne, ale dzięki niemu na przykład mamy na konsoli kolory. To dość ważne przy dużej ilości testów. Zresztą sam dodatek pytest służy do pisania testów aplikacji python lub testowania np. plików tekstowych. Aby poznać pełne możliwości pytest najlepiej zajrzeć do dokumentacji.

### Komendy instalacji pytest i selenium:
```bash
sudo python3 -m pip install -U selenium
sudo pip3 install -U pytest
```

##### Kilka słów o instalacji
W powyższych komendach flaga **-U** oznacza, aby zaktualizować wszystkie zależności do najnowszych wersji.  
Obie komendy są zamienne tzn. używając pierwszej wskazujemy pythonowi w wersji 3, aby użył modułu `pip` (_moduł zarządzania dodatkami do Pythona_) ze wspomnianą już flagą `-U` i wskazaniem dodatku `selenium`.  
Drugi przypadek = użyj `pip3` (_dla pythona 3_) i zainstaluj `pytest`.

<small>Zakładam, że zarówno python3 jak i pip3 jest zainstalowany w systemie, dlatego u siebie ich nie instaluję. Podpowiem, że Pythona instalujemy poprzez np. `apt get install python3`.</small>

## Uruchomienie środowiska testu
Tworzymy plik np. `test.py` i wpisujemy:
```python
from selenium import webdriver
driver = webdriver.Chrome('/ścieżka/do/rozpakowanego/drivera')
driver.get("http://link.jaki.chcemy testować ") #Może to być też localhost
```

i uruchamiamy go:
```bash
pytest test.py
```
otrzymamy odpowiedź:
![Odpowiedź pierwszego testu]( {{ site.baseurl }}/images/blog_images/testy/1wszytest.png "Odpowiedź pierwszego testu")

W ten oto sposób mamy przygotowane środowisko do naszych testów. **Można zacząć pierwszetestowanie swojej aplikacji**. :trollface: