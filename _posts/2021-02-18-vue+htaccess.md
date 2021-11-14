---
layout: post
title: Vue + htaccess
date: 2021-02-18 14:37
category: [programowanie, htaccess, vue]
author: Edyta Jozdowska
tags: [htaccess, vue, js]
excerpt: Dyrektywy w .htaccess by działał router w vue
published: true
---

# Htaccess dla Vue 
Aby działał router vue musimy ustawić odpowiednio .htaccess'a - inaczej po kliknięciu w link aplikacji, który zmienia stan aplikacji zobaczymy `404 error`
Musimy odpowiednio przepisać przetwarzanie urli przez serwer by wszystkie zmiany kierowały do pliku `index.html`, choć czasami mi się zdarza z vue stosować plik `index.php` - ale to już na marginesie. Wspominam ponieważ się da :smile:


## .htaccess dla głównej domeny/subdomeny
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## .htaccess dla katalogu
```apache
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /subdirectoryName
RewriteRule ^subdirectoryName/index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /subdirectoryName/index.html [L]
</IfModule>
```
