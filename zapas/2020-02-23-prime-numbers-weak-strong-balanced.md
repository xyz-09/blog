---
layout: post
title: Liczby pierwsze, słabe, mocne i zbalansowane
date: 2020-02-23 10:15
category: ["bitwy programowania", php, js, python]
author: Edyta Jozdowska
tags: [php,js,python, battle]
excerpt: 
published: false
---
n=15377
    function ip(p) {
        if (p == 2) {
            return true;
        } else if (p <= 1 || p % 2 === 0) {
            return false;
        } else {
            var to = p**.5;
            for (var i = 3; i <= to; i += 2)
            if (p % i == 0) {
                return false;
            }
            return true;
        }
    }

const isPrime = (n) =>{
  if( n <= 1 || ((n & 1) == 0)) return 0;
  if( n == 2) return 1;
  for(let i = 3; i <= n**.5; i+=2){
    if(n % i == 0 ){
      return 0
    }    
  }  
  return 1;

}

const modular_pow = (a,b,m)=>{

  if (a==0 ) return 0;
  if (b==0) return 1;
  y = 0;

  if(b & 1 == 0){//number id even

    y = modular_pow(a,b/2,m)
    y = (y * y ) % m
  
  }else{

    y = a % m;
    y = ((y * modular_pow(a, b-1, m) % m) % m)

  }

  return (y + m) % m
}


console.log(modular_pow(2,5,13))

const isPrime2 = (n) =>{  
    if(n<=1) return false;
    for (let i = 0; i < 5;i++){
      const r  = Math.floor(Math.random() * ((n-1) - 2 + 1)) + 2;
      if ( modular_pow(r,n-1,n) !== 1){
        return false
      }
    }
    return true
}
j=563
console.log(j,isPrime2(j))



pr=[]
for (let i=0; i<=1000;i++){
  if(isPrime(i)) {
    pr.push(i);
  }
}
console.log(pr.join`, `)
const surroundingPrimes=(n)=>{
  const pr=[]  
  for(let i=n-2; i>2 ;i-=2){
    if(isPrime(i)){
      pr.push(i);
      break;
    }
  }
  for(let i=n+2; i<=n*n ;i+=2){
    if( isPrime(i)){
      pr.push(i);
      break;
    }
  }
  let dist=(pr[0]+pr[1])/2;
  console.log(dist==n?'Balanced':dist>n?'WEAK':'STRONG')
  return pr
}

//console.log(isPrime(n)?surroundingPrimes(n):'notprime')
Liczby pierwsze:  2, 3, 4, 5, 7, 9, 11, 13, 17, 19, 23, 25, 29, 31, 37, 41, 43, 47, 49, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 121, 127, 131, 137, 139, 149, 151, 157, 163, 167, 169, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 289, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 361, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 529, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 841, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 961, 967, 971, 977, 983, 991, 997

W teorii to takie liczby, które są podzielne jedynie przez 1 i samą siebie. W teorii liczb zajmują one bardzo szczególne miejsce. Za ich pomocą można 