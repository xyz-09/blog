---
layout: post
title: Testy automatyczne selenium i python cz2. - ustawienie CORS
date: 2020-01-05 18:20
category: [python, selenium]
author: Jozdowska Edyta
tags: [python, selenium, pytest]
excerpt: Krótko o SOP i CORS oraz o tym jak na linux'sie uruchomić środowisko testowe bez zabezpieczeń sieciowych. Kilka słów jest też o tym, jak uruchomić Chrome jako przeglądarkę również bez zabezpieczeń sieciowych.
published: true
---
<!-- TOC -->

- [1.SOP](#1sop)
- [2.Chrome bez SOP i CORS](#2chrome-bez-sop-i-cors)
- [3.WebDriver bez CORS i SOP](#3webdriver-bez-cors-i-sop)
  - [3.1.Środowisko testowe bez SOP](#31%c5%9arodowisko-testowe-bez-sop)
- [4.Słowem końcowym](#4s%c5%82owem-ko%c5%84cowym)
{:class='content_list'}
<!-- /TOC -->

# 1.SOP
**S**ame **O**rigin **P**olicy (**SOP**) - czyli natywny mechanizm przeglądarki polegający na zabezpieczeniu wymiany danych przez aplikację (stronę) w obrębie tej samej i tylko tej samej domeny (origin - tego samego pochodzenia). 

**C**ross-**O**rigin **R**esource **S**haring (**CORS**) jest mechanizmem umożliwiającym współdzielenie danych pomiędzy różnymi serwerami/aplikacjami/stronami, czyli między źródłami/biorcami o różnym pochodzeniu.  

Przyjżyjmy się kilku adresom:
- **http://domena.com** i **http://domena.com****/strona/1**{:style="color:green"} - te dwa adresy mają **to samo pochodzenie** (wspólny protokół, host i port) :green_heart: 
- **https**{:style="color:red"}**://domena.com** i **http**{:style="color:red"}**://domena.com** - mają **różne protokoły**, a zarazem **różne pochodzenie** :x:
- **http://domena.com****:4000**{:style="color:red"} i **http://domena.com** - mają **różne porty**, a zarazem **różne pochodzenie** :x:
- **http://domena.com** i **http://****subdomena**{:style="color:red"}**.domena.com** - mają **różne hosty**, a zarazem **różne pochodzenie** :x:

Dzięki CORS i odpowiedniemu ustawieniu serwera możemy dopuścić do określonych źródeł danych wskazanych w polityce CORS serwery/domeny i pozwolić im na komunikację. Czyli zamiast :x: byłoby :green_heart:. Tak to się odbywa na produkcji, a na developmencie?

Uruchamiając w odpowiedni sposób przeglądarkę lub uruchamiając odpowiedni dodatek do przeglądarki cały ten mechanizm (SOP/CORS) zostaje "pominięty". **Nie polegajmy więc jedynie na SOP i CORS jako zabezpieczeniu**, ale to poza tematem.

Czemu o tym wspominam. Cóż mam trochę pomieszane instalacje i serwer apatche mam gdzie indziej, generowane strony np. z Jekyll'a mam gdzie indziej, a jakoś muszę łączyć ze sobą np. hosty na różnych portach http://localhost i http://localhost:4000. Oczywiście mogłabym ustawić wszystko w jednym miejscu, dostosować porty etc. Mogłabym, ale wiem, że nie muszę. Wyłączenie CORS :japanese_goblin: sprawia, że nie muszę w ogóle o tym myśleć. Ma to swoje plusy i minusy, nad którymi nie będę się pochylać. 

# 2.Chrome bez SOP i CORS
Wpierw w jaki sposób można uruchomić przeglądarkę `Chrome` bez SOP i CORS. Okazuje się, że w bardzo prosty sposób. 
1. Uruchamiamy terminal. 
2. Sprawdzamy gdzie jesteśmy poprzez wpisanie 
   ```shell
   pwd # (PrintWorkingDirectory)

   # odpowiedź na terminalu np:  /home/nazwa użytkownika
   ```
   czyli wyświetl ścieżkę do obecnego (tu gdzie jest terminal) katalogu. 
3. Wpisujemy
   ```shell
   mkdir tmp # (Make Directory)
   ```
   by utworzyć w miejscu gdzie jesteśmy folder o nazwie tmp. Możemy sprawdzić wpisując np `ls -a | grep tmp`. Jeśli wyświetli nam `tmp` katalog został utworzony. A po co ten katalog? Podczas uruchamiania przeglądarki Chrome z nieaktywnymi zabezpieczeniami wymagane jest wskazanie katalogu. I ten nowo utworzony katalog wskażemy w kolejnym kroku.
4. Komenda służąca do uruchomienia z terminala Chrome to `google-chrome`. Aby uruchomić ją w trybie bez zabezpieczeń musimy użyć flagi **- -disable-web-security** i wskazać **- -user-data-dir** katalog na dane (ten co utworzyliśmy w kroku 3). Cała komenda wygląda następująco:
   ```shell
   google-chrome --user-data-dir="~/tmp" --diable-web-security
   ```

Uruchomi nam się nowa instacja Chrome z uwagą, że
> Użyto nieobsługiwanej flagi wiersza poleceń --disable-web-security. Ma to negatywny wpływ na stabilność i zabezpieczenia

OH MY GOSH :flushed: straszny komunikat. No cóż ten tryb jest przydatny :sunglasses:. 

# 3.WebDriver bez CORS i SOP
Musimy wziąć jedno pod uwagę. Uruchamiając przeglądarkę z `Pythona` poprzez driver do testów `Selenium` musimy wskazać w jakim trybie ta przeglądarka ma się uruchomić.  
**Domyślnie uruchomiona zostanie w trybie normalnym**, czyli mechanizmy zabezpieczeń będą funkcjonować normalnie. Czasem jednak faktycznie przydaje się uruchomienie z pominięciem zabezpieczeń (**tylko do celów testowych**, można sobie nieźle namieszać i koniec końców zostanie nam jedynie stwierdzenie):
> "ale jak to, u mnie działa" :laughing:

## 3.1.Środowisko testowe bez SOP
Wróćmy jednak jak to zrobić, czyli środowisko testowe bez SOP.  
[W poprzednim wpisie](../testy-automatyczne-selenium-i-python/) wskazywałam jak uruchomić z poziomu pythona środowisko do testów.  
Rozszerzymy trochę kod z tego posta poprzez dodanie do drivera odpowiednich flag:
```python
from selenium import webdriver

chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument("test-type") 
chrome_options.add_argument("--disable-web-security") # zabezpieczenia webowe nieaktywne

driver = webdriver.Chrome('/ścieżka/do/rozpakowanego/drivera',options=chrome_options)
driver.get("http://link.jaki.chcemy testować ")
driver.quit() # zamknij przeglądarkę po wykonaniu testów

# ----- Możemy jeszcze dodać inne opcje np. otwórz okno w określonym rozmiarze:
chrome_options.add_argument("--window-size=1920,1080")
...
```

[Spis dostępnych flag dla chromium](https://cs.chromium.org/chromium/src/base/base_switches.cc?l=115-121){:target="_blank"}

# 4.Słowem końcowym
**Wyłączenie zabezpieczeń przeglądarki wydaje się słabym pomysłem.**  
Tak, wiem. Nie jest to tryb do surfowania po sieci :smiley:  
Także w testowaniu może nam utrudnić. Musimy pamiętać w jakim celu wyłączamy zabezpieczenia. Po sprawdzeniu tego, co chcieliśmy, **powinniśmy wrócić do trybu normalnego** :cop:.
