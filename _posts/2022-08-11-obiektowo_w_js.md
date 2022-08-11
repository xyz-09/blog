---
layout: post
title: Obiektowo w JS - czyli klasy 
date: 2022-08-11 11:06
category: [js, programowanie]
author: Edyta Jozdowska
tags: ["js"]
excerpt: Krótka klasa w js i jej podstawowe zachowanie
published: true
---
Klasy w js
```javascript
const { log } = console; 

class ValueObject {
  #id; // prywatna zmienna, poprzedzona hashem
  #title;
  content; //zmienna publiczna
  
  data;
  setData = (data) => this.data = data
  
  // przypominam, że jest to równozanczne z setId = function(id){... return ...}
  setId = (id) => { 
    this.#id = id;
    return this;
  };
  // przypominam, że jest to równozanczne z getId = function(id){ return this.#id }
  getId = () => this.#id; 

  // tak, też można w skrócie to zapisać
  setTitle = (title) => this.#title = title
  
  //prywatna metoda poprzedzona hashem
  #getTitle = () => this.#title;
  getPrivateTitle = () => this.#getTitle();

  setContent = (content) => this.content = content
  getContent = () => this.content;
}

const newValueObject = new ValueObject();
log("\nValueObject -> ustawienie publicznej zmiennej w obiekcie")
newValueObject.id = 10;

// tylko za pomocą metody set i get możemy nadpisać prywatną zmienną
// zdefiniowaną w klasie
//prywatne zmienne nie są wyświetlane w konsoli jak widać!!!!!
log("\nValueObject -> using method setId()")
log(newValueObject.setId(15))

log("\nValueObject -> using method getId()")
log(newValueObject.getId(15))

log("\nValueObject -> dostęp do publicznej zmiennej")
log(newValueObject.id);

//takie przypisanie nie pomoże, chyba, że np. będziemy mieli metodę setData
const newValueObject1 = new ValueObject({
  "id": 5,
  "title": "Mój tytuł",
  "content": "Moja treść",
  "g": "a" //to zostanie pominięte, bo nie ma takiej metody
})
log(newValueObject1);

log(newValueObject1.setData({
  "id": 5,
  "title": "Mój tytuł",
  "content": "Moja treść",
  "g": "a" //to zostanie pominięte, bo nie ma takiej metody
}))

// jednak jak widać zmienia to strukturę obiektu
log(newValueObject1);

class ObjectBuilder extends ValueObject {
  // `constructor` jest wbudowaną w klasę metodą, 
  // która jest automatycznie wywoływana podczas jej tworzenia -> 
  // czyli wywołania new className()
  constructor(data) {
    // super - to jest specyfika js, aby móc się odwołać do klasy, 
    // która jest rozszerzana
    super(); 
    
    for (const key in data) {
      // tak w php masz ucfirst - w js kombinujesz z upperCase i slice :)
      let methodName = "set" + key[0].toUpperCase() + key.slice(1) ;
      
      // to jest czytelniejszy zapis if, else dla kodu który by mówił
      // jeśli coś jest spełnione, to zrób coś
      // w tym przypadku odwracasz swój warunek
      // jeśli coś nie jest spełnione, to przejdź do następnej interacji
      if (!this[methodName]) continue;
      
      this[methodName](data[key]);
    }
  }
  getPreatyIdTitle = () => `Id of object is: ${ this.getId() } and title is: ${this.getPrivateTitle()}`
}

const objectB = new ObjectBuilder({
  "id": 5,
  "title": "Mój tytuł",
  "content": "Moja treść",
  "g": "a" //to zostanie pominięte, bo nie ma takiej metody
});

log("\nTyp Obiektu:")
log(objectB.constructor)

log("\nCały obiekt:")
log(objectB);

log("\nWywołanie jednej metody getContent():")
log(objectB.getContent())

  log("\nWywołanie jednej metody getContent():")
log(objectB.getId())

log("\nWywołanie metody `getPreatyIdTitle()` zdefiniowanej w ObjectBuilder:")
log(objectB.getPreatyIdTitle())

log("\nWywołanie prywatnej metody skutkuje błędem:")
//log(objectB.#geTitle())
```

```
ValueObject -> ustawienie publicznej zmiennej w obiekcie

ValueObject -> using method setId()
ValueObject {
  content: undefined,
  data: undefined,
  setData: [Function: setData],
  setId: [Function: setId],
  getId: [Function: getId],
  setTitle: [Function: setTitle],
  getPrivateTitle: [Function: getPrivateTitle],
  setContent: [Function: setContent],
  getContent: [Function: getContent],
  id: 10
}

ValueObject -> using method getId()
15

ValueObject -> dostęp do publicznej zmiennej
10
ValueObject {
  content: undefined,
  data: undefined,
  setData: [Function: setData],
  setId: [Function: setId],
  getId: [Function: getId],
  setTitle: [Function: setTitle],
  getPrivateTitle: [Function: getPrivateTitle],
  setContent: [Function: setContent],
  getContent: [Function: getContent]
}
{ id: 5, title: 'Mój tytuł', content: 'Moja treść', g: 'a' }
ValueObject {
  content: undefined,
  data: { id: 5, title: 'Mój tytuł', content: 'Moja treść', g: 'a' },
  setData: [Function: setData],
  setId: [Function: setId],
  getId: [Function: getId],
  setTitle: [Function: setTitle],
  getPrivateTitle: [Function: getPrivateTitle],
  setContent: [Function: setContent],
  getContent: [Function: getContent]
}

Typ Obiektu:
[class ObjectBuilder extends ValueObject]

Cały obiekt:
ObjectBuilder {
  content: 'Moja treść',
  data: undefined,
  setData: [Function: setData],
  setId: [Function: setId],
  getId: [Function: getId],
  setTitle: [Function: setTitle],
  getPrivateTitle: [Function: getPrivateTitle],
  setContent: [Function: setContent],
  getContent: [Function: getContent],
  getPreatyIdTitle: [Function: getPreatyIdTitle]
}

Wywołanie jednej metody getContent():
Moja treść

Wywołanie jednej metody getContent():
5

Wywołanie metody `getPreatyIdTitle()` zdefiniowanej w ObjectBuilder:
Id of object is: 5 and title is: Mój tytuł

Wywołanie prywatnej metody skutkuje błędem:
```

