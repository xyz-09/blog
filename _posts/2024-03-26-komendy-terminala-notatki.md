---
layout: post
title: Komendy terminala, które są przydatne - wpis ku pamięci
date: 2024-03-26
category: [php, terminal, linux]
author: Edyta Jozdowska
tags: ["linux", "php"]
excerpt: Lista komend, które używam przełączając się miedzy systemami linux
published: true
---


## Krotkie info **

Mam dość szukania po internecie komend, które są mi w jakiś sposób potrzebne, które używam raz na jakiś czas, a potem zapominam - a gdy przychodzi czas, że muszę ją użyć - znów szukam po necie (nie zawsze bash history jest dostępna).
Stwierdziłam, że jest to dobre miejsce - na zamieszczenie takich krótkich komend - ku pamięci, zebrane w jedno :)

# Zmiana php na konsoli 
```bash 
sudo update-alternatives --config php
```

# Composer update wyrzuca błąd w Compiler.php (Laravel) "Please provide a valid cache path."
```bash
cd storage/
mkdir -p framework/{sessions,views,cache}
chmod -R 775 framework
```
