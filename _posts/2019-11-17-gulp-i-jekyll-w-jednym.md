---
layout: post
title: Gulp i Jekyll w jednym stali domu.
date: 2019-11-17 20:10
category: ["jekyll", "js"]
author: Edyta Jozdowska
tags: ["jekyll","gulp","node","npm","js","javascript"]
excerpt: Automatyzacja Jekyll'a przy użyciu gulp'a. Bo życie należy sobie upraszczać.
---

[Gulp](https://en.wikipedia.org/wiki/Gulp.js) jest narzędziem do automatyzacji zadań. Dobrym narzędziem, które poznałam niedawno. Żałuję, że tak późno.

Wykorzystałam je do automatyzacji [mojego szkieletu Jekyll'a](https://github.com/capo1/jekyll-js-sass-starter). 

Wdrożyłam:
* konwersję plików `.scss` do `.css`, 
* kompresję `.css`, 
* kompilowanie `.js` poprzez [babel](https://en.wikipedia.org/wiki/Babel_(compiler)), 
* kompresję `.js`
* kompresję obrazów,
* synchronizację.
  
### Synchronizacja
**Synchronizacja** była moim początkowym założeniem. W momencie jak udało się ją ustawić, stwierdziłam, że to mało.<br/>
Nigdy nie umiałam poprzestać tylko na drobnych rzeczach, trzeba korzystać z dostępnych narzędzi w pełni.

Od czego zaczęłam? **Od tego, że jest różnica między kodem gulp'a w wersji 3 i wersji 4**. Naprawdę, chwilę zajęło mi znalezienie tego :).
Wersja oznaczona numerem 4.0.2 weszła w maju 2019 r. Czy to ma znaczenie? Trochę ma. 

<br/>
### Uwaga na wersje narzędzi ###
Jeśli szukasz rozwiązania jakiegoś problemu w necie dużo informacji będzie miało odniesienie do starszych wersji.<br/>A tutaj psikus - w wersji 4 zmieniono sposób "exportu" zadań jakie mają być wykonane przez gulp'a. Dla osoby nowej w temacie może być to trochę mylące. Dlatego tak ważne jest sprawdzenie jaką wersję narzędzia wykorzystujemy. 

<br/>
### Ustawienie package'ów dla npm ###
Aby ustawić wszystko potrzeba [Noda](https://nodejs.org/en/), i [npm](https://pl.wikipedia.org/wiki/Npm_(manager_pakiet%C3%B3w)) zainstalowanego na naszym systemie.
Przykładowy spis zależności dla npm to (to są packag'e, które ja wykorzystałam):
```json
    "devDependencies": {
        "@babel/core": "^7.7.2",
        "@babel/preset-env": "^7.7.1",
        "@babel/register": "^7.7.0",
        "browser-sync": "2.26.7",
        "gulp": "4.0.2",
        "gulp-autoprefixer": "7.0.1",
        "gulp-clean-css": "4.2.0",
        "gulp-sass": "4.0.2",
        "gulp-util": "3.0.8",
        "gulp-babel": "^8.0.0",
        "gulp-newer": "^1.4.0",
        "gulp-uglify": "^3.0.2"
    },
```
Po zainstalowaniu tych zależności możemy zacząć pisać plik konfiguracyjny dla gulp'a. Ja mam go nazwany `gulpfile.babel.js` i jest on przeznaczony pod instalację Jekyll'a.

## Krótki przepis na Gulpa z Jekyll'em - w 10 krokach 
1. Import zależności
```js 
import gulp from "gulp";
import { spawn } from "child_process";
import browserSync from "browser-sync";
import autoprefix from "gulp-autoprefixer";
import minify from "gulp-clean-css";
import sass from "gulp-sass";
import imagemin from "gulp-imagemin"
import babel from "gulp-babel";
import newer from "gulp-newer";
import uglify from "gulp-uglify";
```
2. Ustawiamy zmienne jakie będziemy wykorzystywać:
```js
const siteRoot = "_site"; //katalog z wygenerowanymi statycznymi plikami Jekyll'a
const mainStylesheet = "_sass/main.scss"; // ścieżka dp głównego sass'a
const imagesSource = "./assets/img/**/*" // wszystkie pliki katalogu i podkatalogach.
const jsSource = "./assets/js/**/*.js" //wszystkie pliki w tym katalogu z danym rozszerzeniem
```
3. Ustawiamy komendę rekompilacji Jekyll'a:
```js
const buildJekyll = () => {
    browserSync.notify("Running: $ jekyll build");
    return spawn(jekyll, ["build"]);
};
```
4. Czyścimy katalog z wygenerowanymi wcześniej plikami w katalogu `_site`. Możemy choć nie musimy.
```js
function clean() {
    return del([`./${siteRoot}/assets/`]);
}
```
5. Ustawiamy akcje dla plików `.scss`.  
Do łączenia ze sobą akcji wykorzystujemy `pipe()`. Wytłumaczenia nie potrzeba. Kod sam mówi :)
```js
const compileStyles = () => {
    return gulp
        .src(mainStylesheet)
        .pipe(
            sass({
                includePaths: ["scss"],
                onError: browserSync.notify
            })
        )
        .pipe(
            autoprefix({
                browsers: ["last 2 versions"],
                cascade: false
            })
        )
        .pipe(minify())
        .pipe(gulp.dest("assets/css/"));//katalog docelowy 
};
```
6. Wykonujemy akcje na plikach `.js`.  
**Tutaj moja uwaga**! Nie mam ustawień dla babel'a, gdyż są one w oddzielnym pliku konfiguracyjnym `.babelrc`. Jak go kasowałam i ustawiałam w `gulp....` wyskakiwało wiele błędów. Treść ustawień babela podam poniżej.
```js
function compileScripts() {
    return (
        gulp
        .src([jsSource])
        .pipe(babel())// przetłumacz kod na starsze wersje - to mi się chyba najbardziej podoba
        .pipe(uglify())// minimalizuj i zmniejsz
        .pipe(gulp.dest("./_site/assets/js/"))
        .pipe(browserSync.stream())
    );
}
```
**Plik `.babelrc`** 
```json
{
  "presets": [
    [
      "@babel/preset-env"
    ]
  ]
}
```
7. Akcje dla obrazów (gif'y, jpg, png i svg)
```js
function compileImages() {
    return gulp
        .src(imagesSource)
        .pipe(newer(`./${siteRoot}/assets/img`))
        .pipe(
            imagemin([
                imagemin.gifsicle({ interlaced: true }),
                imagemin.jpegtran({ progressive: true }),
                imagemin.optipng({ optimizationLevel: 5 }),
                imagemin.svgo({
                    plugins: [{
                        removeViewBox: false,
                        collapseGroups: true
                    }]
                })
            ])
        )
        .pipe(gulp.dest("./_site/assets/img"));
}
``` 
8. Skompiluj Jekyll'a, style i skrypty.  
**Uwaga na kolejność**. Wykonywanie serii następuje w tej kolejności jaka jest podana. Jeśli umieścimy  `buildJekyll` na końcu, niestety nasze `.js` i obrazy zostaną nadpisane. **Zajęło mi pól godziny dojście do tego, dlaczego moje `.js` nie są skompilowane** :)
```js
const buildSite = done => {
    gulp.watch("./assets/img/**/*", images);

    gulp.series(compileStyles, buildJekyll, compileScripts, compileImages)(done);
    //Kolejność jest ważna.
};
```
9. Start serwera i synchronizacji.
```js
const startServer = () => {
    browserSync.init({
        files: [siteRoot + "/**"],
        port: 4000,
        open: "local",
        server: {
            baseDir: siteRoot
        }
    });
};
```

### Final Step No 10
Zbuduj wszystkie zależności, rozpocznij obserwowanie zmian w folderach i  synchronizację. Połącz też ze sobą wszystkie akcje i wyeksportuj.  

```js
const serve = gulp.series(buildSite, startServer);

const watch = () => {
    gulp.watch(
        [
            "**/*.scss",
            "**/**/*.scss",
            "**/*.html",
            "**/*.md",
            "**/*.yml",
            "!_site/**/*"
        ],
        buildSite
    );
};

const build = done => {
    gulp.parallel(serve, watch)(done);
};

export default build;
```
Naszą instalację możemy uruchomić jedną komendą `GULP` w katalogu głównym.

**Tak i to wszystko**, a zajęło mi to trochę czasu. Uczymy się przez całe życie.

Można też dołączyć `webpacka`, ale o tym innym razem. 