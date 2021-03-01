<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?><!DOCTYPE html>
<html lang="pt">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
	<link rel="stylesheet" href=<?= base_url("/assets/css/style.css");?>>
	<!-- JavaScript libraries -->
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>	
    <title>Tempo</title>
  </head>
  <body>
  <!--Main tag that has all the weather application interactivity-->
	<div class="conteiner">
		<!--Input element used to search any city's weather information-->
		<div class="input">
			<img src=<?= base_url('/assets/img/44.svg')?> height="24px" width="24px" style="margin-top:5px;">
			<input type="text" spellcheck="false"/>
		</div>  
		  <!--Div for today's image and information-->
		  <div class="row">
			<div id="c1" class="col-sm odd">

			</div>
			<div id="c2"  class="col-sm even">

			</div>			
		  </div>
		  <!--Div for tomorrow's image and information-->
		  <div class="row">
			<div id="c3"  class="col-sm odd">

			</div>
			<div id="c4"  class="col-sm even">

			</div>			
		  </div>
		  <!--Div for after tomorrow's image and information-->
		  <div class="row">
			<div id="c5"  class="col-sm odd">

			</div>
			<div id="c6"  class="col-sm even">

			</div>			
		  </div>
    </div>
	<!-- JavaScript -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>
	<script src=<?=base_url("/assets/js/script.js");?>></script>
  </body>
</html>		