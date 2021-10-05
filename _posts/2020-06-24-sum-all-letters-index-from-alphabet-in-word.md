---
layout: post
title: Zsumuj indeksy liter w alfabecie
date: 24-06-2020
category: [programowanie, js, py]
author: Edyta Jozdowska
tags: [js, py]
summary:
excerpt: 
published: true
---

Szybkie zadanie, szybki kod.
# Zsumuj indeksy liter w alfabecie w zadanym słowie

```bash
TEST 1: Math -> 42
TEST 2: math -> 42
TEST 3: Thma -> 42
TEST 4: life -> 32
```

```js
words=['Math', 'math', 'Thma', 'life']
console.log(words.map(a=>a.toLowerCase().split``.reduce((a,b)=>a+b.charCodeAt()-96,0)))

# OUTPUT: [42, 42, 42, 32]

```

```py
words=['Math','math','Thma','life']

for word in words:
    print(sum([ord(l.lower())-96 for l in word]))
    
# OUTPUT: 
42
42
42
32
```
