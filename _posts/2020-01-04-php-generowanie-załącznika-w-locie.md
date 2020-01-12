---
layout: post
title: Generowanie załącznika w locie by dołączyć go do email'a - bez zapisu na dysku serwera.
date: 2020-01-04 18:19
category: php
author: Edyta Jozdowska
tags: [php]
excerpt: Skrypt php mający za zadanie wygenerowanie załącznika, który zostanie dołączony do wiadomości bez zapisywania czegokolwiek na serwerze. 
---
<!-- TOC -->

- [1.Wysyłanie maila z php](#1wysy%c5%82anie-maila-z-php)
- [2.Klasa do wysyłania maila](#2klasa-do-wysy%c5%82ania-maila)
- [3.Użycie](#3u%c5%bcycie)
{:class='content_list'}
<!-- /TOC -->

# 1.Wysyłanie maila z php

Temat bardzo prosty. Bo co to znaczy wysłać maila w php? Mamy funkcję `mail`. Każdy co ma styczność z php powinien ją znać. Jeśli nie w [dokumentacji PHP można o niej przeczytać więcej](https://www.php.net/manual/en/function.mail.php){:target="_blank"}. Można też użyć klasy [PHPMailer](https://github.com/PHPMailer/PHPMailer){:target="_blank"} [^1]. Rozwiązań jest dużo. 

W momencie, gdy mamy załączyć plik nie zapisany nigdzie musimy go wygenerować. Poniższa klasa służy właśnie do wygenerowania załącznika z tablicy danych i załączenia go w pamięci do naszego maila.


# 2.Klasa do wysyłania maila

```php
class SendMail{
  public $to; // adres na który wiadomość zostanie wysłana
  private $senderEmail; // kto wysyła wiadomość
  private $senderName;// ładna nazwa nadawcy
  private $replyTo;// do kogo odpowiedzieć 
  private $multipartSep; // separator by załączyć plik w md5
  private $headers;// wysyłane nagłówki wiadomości
  private $attachmentName;// nazwa załącznika
  private $attachment;// załącznik
  
  function __construct() {
          //te dane ustawiam tutaj, jednak mogły by one równie dobrze zostać ustawione później.

          $this->senderEmail = "fromMail@domain.com";
          $this->senderName = "My really cool name";
          $this->replyTo = $this->senderEmail;
          $this->multipartSep = '-----'.md5(time()).'-----';
          $this->attachmentName = 'myCoolNameOfAttachment';
         
         $this->setHeaders();
  }

  function setHeaders(){

    $this->headers = array(
      "From:$this->senderName<$this->senderEmail>",
      "Reply-To: ".$this->replyTo,
      "Content-Type: multipart/mixed; boundary=\"$this->multipartSep\""
    );

  }

  function sendMail($data){

    /* input :
      $data = [
        'to'=> String e-mail
        'data'=> Max two dimensional Array
        'message'=> String
        'subject'=> String
      ];
    */

    extract($data);

    $this->attachment = chunk_split(base64_encode($this->array2csv($to)));
    
    if(empty($this->attachment)) return false;
    
    $subject = '=?UTF-8?q?' . quoted_printable_encode($subject) . '?=';	

    $csvName= $this->attachmentName.date("Y_m_d_H_i_s").'.csv';

    $body = "--$this->multipartSep\r\n"
      . "Content-Type: text/html; charset=utf-8; format=flowed\r\n"
      . "Content-Transfer-Encoding: 7bit\r\n"
      . "\r\n"
      . $message."\r\n"
      . "--$this->multipartSep\r\n"
      //. "Content-Type: application/vnd.ms-excel\r\n"
      . "Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet\r\n"
      . "Content-Transfer-Encoding: base64\r\n"
      . "Content-Disposition: attachment; filename=\"".$csvName."\"\r\n"
      . "\r\n"
      . "$this->attachment\r\n"
      . "--$this->multipartSep--";
      
      try {
        
        mail($to, $subject, $body, implode("\r\n", $this->headers));

        echo 'Mail wysłany';

      } catch (Exception $e) {

          echo 'Błąd wysłania maila: ',  $e-->getMessage(), "\n";
      }
  }

  function array2csv($data, $delimiter = ',', $enclosure = '', $escape_char = "\\"){
    
    //Funkcja do wygenerowania załącznika z danych tablicy maksymalnie dwu wymiarowej

    $f = fopen('php://memory', 'rw+');
    //nasze dane są jako tablica
    foreach ($data as $key => $item) {		
      
      if(is_array($item)){          
          foreach ($item as $k=>$i) {            
              array_push($data,$i);          
          }
          unset($data[$key]);	
      }        
    }

    fputcsv($f, $data, $delimiter, chr(0), $escape_char);
    rewind($f); //wróć do początku pliku
    return rtrim(stream_get_contents($f));
  }
}
```

# 3.Użycie
```php

$o = new SendMail();
$data = [
  'to'=>'emailTo@domain.com',
  'data'=>array("a"=>"a","b"=>"b"),
  'message'=>'message',
  'subject'=>'subject'
];

$o->sendMail($data);
```
[^1]: https://github.com/PHPMailer/PHPMailer
