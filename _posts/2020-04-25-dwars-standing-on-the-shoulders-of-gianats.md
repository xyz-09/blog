---
layout: post
title: Krasnoludy stojące na ramionach olbrzymów
date: 2020-04-25 10:24
category: [js]
author: Edyta Jozdowska
tags: [graphs, memoization, recursion]
excerpt: O teorii graphów kierowanych.
published: true
---

Dziwny tytuł jak na programowanie, prawda :smile:  
Jest to wolne _(czytaj moje)_ tłumaczenie z angielskiego frazy "*Dwarfs standing on the shoulders of Giants*".  

Jestem fanką fantasy i dla mnie są **krasnoludy**, a nie krasnoludki, karły, niedorostki etc.  
Są **olbrzymy** nie giganci.  
Są **elfy**, są **gobliny**, są **niziołki** i wiele innych istot zamieszkujących śródziemie, podziemie i inne wymiary :smile:  
{:.offtopic}

Koncept "**stania na ramionach olbrzymów**" został wprowadzony przez [Bernard'a of Chartres](https://pl.wikipedia.org/wiki/Bernard_z_Chartres){:target="_blank"}: 
>>He compare us to dwarfs perched on the shoulders of giants. He pointed out that we see more and farther than our predecessors, not because we have keener vision or greater height, but because we are lifted up and borne aloft on their gigantic stature [^1].

Czyli mniej więcej, widzimy więcej i dalej, niż nasi poprzednicy, ponieważ ich gigantyczna praca nam to umożliwia. Odkrywamy prawdę, opierając się o wcześniejsze odkrycia.

Ok, filozofia, filozofią, ale co to ma wspólnego z grafami?
Załóżmy że mamy powiązane ze sobą 6 osób, oznaczając je literami od **A** do **D**.  
Jednostka "**D**" maluje obraz. Przyglądając się mu, mam wrażenie, że gdzieś poszczególne elementy już widziałam. Tak, na obrazie u "**E**". Ale, jednostka "**E**" inspirowała się opisem w książce napisanej przez "**C**". W ostatni czwartek ją właśnie czytałam. Jednostka "**C**" przyznała w swojej książce, że inspirowała się drzeworytem wykonanym przez "**B**", ale też  "**F**". Natomiast na jednostkę "**B**" miały wpływ przemyślenia jednostki "**A**". Należy wspomnieć, że "**F**" miało też wpływ na jednostkę "**E**". A i "**B**" miało też wpływ na "**Z**", ale to już inna historia. Zakręcone?  
Gdy czegoś nie widzimy, warto to narysować :grin:
Rozrysujmy zatem sieć powiązań: 
<style>
  .animIcon svg{display:none!important}
  .animIcon:hover svg{display:block!important}
</style>
{:class="clear center"}
{%
    include image.html 
    src="https://sketchviz.com/@capo1/c7daf8f0a765509113d894a2b1054ea7/e510ec99e685042d9a2f103236af46c5a4437b54.sketchy.png" 
    href="https://sketchviz.com/@capo1/c7daf8f0a765509113d894a2b1054ea7/e510ec99e685042d9a2f103236af46c5a4437b54.sketchy.png"
    caption="Rysunek 1. Kierowany graf wpływu jednostek, <a href='//sketchviz.com/@capo1/c7daf8f0a765509113d894a2b1054ea7' style='color:#555;'>Sketchviz</a>"
%}

I tak oto dochodzimy do programowania. Chciałabym wiedzieć ile osób miało wpływ na jednostkę "**D**" nim powstał tak przejmujący obraz, że chętnie powieszę go w salonie :wink:  
Jak widzimy mamy kilka dróg:
- **A** -> **B** -> **F** -> **C** -> **D**
- **A** -> **B** -> **F** -> **E** -> **D**
- **A** -> **B** -> **E** -> **D**
- **A** -> **B** -> **F** -> **C** -> **E** -> **D**
- **A** -> **B** -> **Z**

W powyższym przykładzie pełna ścieżka powiązań liczy sobie 5 osób plus ostatnia "**D**"

Zamieńmy sobie litery alfabetu na liczby: od 1...6 oznaczając od "**A**" = 1 do "**D**" = 6, "**Z**" oznaczymy jako 10, bo to w końcu inna historia. Otrzymujemy zatem powiązania jak poniżej:

{:class="clear center"}
{%
    include image.html 
    src="https://sketchviz.com/@capo1/4916418d7112917276391de22967de9b/7ffa68d1b81bda9b3403479acd0f4f4c6a04ce00.sketchy.png" 
    href="https://sketchviz.com/@capo1/4916418d7112917276391de22967de9b/7ffa68d1b81bda9b3403479acd0f4f4c6a04ce00.sketchy.png"
    caption="Rysunek 1. Kierowany graf wpływu jednostek, <a href='//sketchviz.com/@capo1/4916418d7112917276391de22967de9b' style='color:#555;'>Sketchviz</a>"
%}
Wypiszmy połączenia dla poszczególnych wierzchołków:
```js
nodes =  {
  '1': [ '2' ],
  '2': [ '3', '6', '5', '10' ],
  '3': [ '4', '5' ],
  '5': [ '4' ],
  '6': [ '3', '5' ]
}
```
Otrzymaliśmy obiekt, po którym możemy interować.  
Trzeba sprawdzić czy poszczególne wartości naszego obiektu są zarazem kluczami. Czyli dla każdej wartości w naszym obiekcie, sprawdź czy dana wartość jest zarazem kluczem, jeśli tak, weź wartość dla klucza jako nowa tablica i sprawdzaj dalej, aż nie zostanie nic do sprawdzenia. 

[^1]: [https://en.wikipedia.org/wiki/John_of_Salisbury](https://en.wikipedia.org/wiki/John_of_Salisbury)
