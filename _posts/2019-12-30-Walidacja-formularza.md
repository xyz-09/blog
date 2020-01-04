---
layout: post
title: Walidacja formularza
date: 2019-12-30 08:30
category: [js, frontend, php]
author: Edyta Jozdowska
tags: [js, forntend, form, validation]
excerpt: Krótki skrypt js mający za zadanie zwalidować formularz po stronie użytkownika i po stronie serwera.
---

## Walidacja formularza
Jeszcze kilka lat temu aby zwalidować poprawność wypełnienia formularza trzeba było się trochę natrudzić. W czasach, gdy `jQuery` zaczynał swoją karierę w sieci powstawały dodatki, które developerowi ułatwiały walidację pól formularza wypełnionego przez użytkownika. Nigdy nie lubiłam tych dodatkowych skryptów. Były one duże, a ich wdrożenie kosztowało trochę czasu. Nie tyle co pisanie walidacji od nowa, ale jednak. W dodatku wszystko odbywało się jedynie z poziomu JS (wydzielam tutaj walidację po stronie serwera, **którą zawsze należy wdrażać osobno**). Podobnie jest dzisiaj, z drobną zmianą. 

## Wbudowany mechanizm
Większość przeglądarek ma już wbudowany mechanizm walidacji pól formularza. Jeśli któreś z pól określimy jako `required` chrome lub ff nie wyślą danych z formularza na serwer. Użytkownik otrzyma komunikat, że to pole jest wymagane i ani 1 linijka kod JS nie jest tutaj wymagana.

Mechanizm ten jest wydajny, ma jednak jedną podstawową wadę(?) UI jest przeglądarkowe. Dlaczego słowo "wadę" oznaczyłam znakiem zapytania? Tutaj należałoby się zastanowić, czy jest to faktycznie wada. Moim zdaniem warto wykorzystywać UI wbudowane, jednak nie zawsze mamy taką możliwość. 

Jeśli mamy zaprojektowany graficznie formularz z przemyślaną obsługą błędów i komunikatów - znów musimy sięgnąć do `js`. Tym razem jednak dla mnie jest to proces bardzo przyjemny :) 

Poniżej zamieszczam pełną walidację `js` z wykorzystaniem wbudowanego mechanizmu z przeglądarki z możliwością nadania własnego wyglądu.

## Walidacja formularza FrontEnd
<p class="codepen" data-height="670" data-theme-id="dark" data-default-tab="html,result" data-user="ejo" data-slug-hash="YzPxmbJ" style="height: 670px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="YzPxmbJ">
  <span>See the Pen <a href="https://codepen.io/ejo/pen/YzPxmbJ">
  YzPxmbJ</a> by ejo (<a href="https://codepen.io/ejo">@ejo</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## Walidacja formularza BackEnd
Potrzebny plik z podstawowymi funkcjami dla obsługi formularza po stronie serwera w `PHP`

```php
<?php

  mb_internal_encoding("UTF-8");
  function removeCRLF($str) {
    return str_replace(array("\r","\n"), array(" ", " "), $str);
  }
  function removeHtml($str) {
    return strip_tags(trim($str));
  }
  function getMailContent($content_base, $boundary) {
    $content = "";
    $content .= "$content_base\n";
    return $content;
  }
?>
```

Plik `send.php` do którego wysyłane są dane z naszego formularza
```php
<?php

  mb_internal_encoding("UTF-8");
  $recipient_admin = ['adresemail@domain.com'];
  // Common attributes
  $boundary = "__BOUNDARY__";
  // Require functions
  require "./functions.php";
  // ------------------------------------
  // Start
  // ------------------------------------
  // Only process POST reqeusts.
  if ($_SERVER["REQUEST_METHOD"] != "POST") {
    // Not a POST request, set a 403 (forbidden) response code.
    http_response_code(403);
    echo "403 forbidden";
    exit;
  }
  // Get the form fields and remove whitespace.
  $name = removeCRLF(removeHtml($_POST["name"]));
  $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
  $phone = removeHtml($_POST["tel"]);
  $text = removeHtml($_POST['msg']);
  $agree = removeHtml($_POST['agree']);

  // Check that data was sent to the mailer.

  if (
    empty($name) OR
    empty($email) OR
    empty($phone) OR
    empty($text) OR
    !$agree=='on' OR
    !filter_var($email, FILTER_VALIDATE_EMAIL)
  ) {
    // Set a 400 (bad request) response code and exit.
    http_response_code(400);
    echo "400 bad request";
    exit;
  }
  // ------------------------------------
  // Start setting email headers and contents.
  // ------------------------------------
  // Set the email headers.
  $email_headers = "";
  $email_headers .= "Content-Type: text/plain; charset=\"UTF-8\"\n";
  $email_headers .= "Content-Transfer-Encoding: 8bit\n";
 
  // Build the email content.
  $email_content = "";
  $email_content .= "Imię i nazwisko: $name\n";
  $email_content .= "Email: $email\n";
  $email_content .= "Telefon: $phone\n";
  $email_content .= "Zapytanie: $text\n";
  // ------------------------------------
  // For Admin
  // ------------------------------------
  // Set the recipient email address.
  // FIXME: Update this to your desired email address.

  // Set the email subject.
  $site = "...";
  $subject_admin = mb_encode_mimeheader("Formularz dla $site od: $name ", "UTF-8");
  // Build the email content.
  $email_content_admin = "Wypełniono formularz $site:\n\n";
  $email_content_admin .= $email_content;
  $email_content_admin = getMailContent($email_content_admin, $boundary);
  // Build the email headers.
  $email_headers_admin = '';
  $email_headers_admin .= $email_headers;
  $email_headers_admin .= "From: ". mb_encode_mimeheader($name, "UTF-8"). " <$email>";

  // ------------------------------------
  // Send Mail
  // ------------------------------------
  if (
    mail(
        implode(',', $recipient_admin), 
        $subject_admin, 
        $email_content_admin, 
        $email_headers_admin)
  ) {    
    // Set a 200 (okay) response code.
    http_response_code(200);

  } else {
    // Set a 500 (internal server error) response code.
    http_response_code(500);    
  }
?>

```


