<?php
defined('BASEPATH') OR exit('No direct script access allowed');
if (!defined('BASEPATH'))
    exit('No direct script access allowed');
	/**
	*Class:    Weather
	*Objetive: Controller class
	*Author:   Wagno Sousa
	*Date:     02/11/2020
	*/
class Weather extends CI_Controller {
	/**
	*Function: index
	*Objetive: loads the application page
	*Params:
	*/
    public function index() {
        $this->load->view('weatherview');
    }
	/**
	*Function: getBackGroundImage
	*Objetive: loads the background image
	*Params:
	*/
    public function getBackGroundImage() {
		$fp = fopen('https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=pt-BR','r');
		$fp = stream_get_contents($fp);
		$fp = json_decode($fp, true);
		echo $fp['images'][0]['url'];
	}
	/**
	*Functions: getWeather,buildBaseString,buildAuthorizationHeader
	*Objetive:  modified Yahoo code, to get all weather information
	*Source:    https://developer.yahoo.com/weather/documentation.html
	*/	
	public function getWeather(){
		$cityQuery = "";
		$cityArray = $this->input->post('city');
		foreach($cityArray as $value){
			$cityQuery.= $value.'+';
		}
		
		// Copyright 2019 Oath Inc. Licensed under the terms of the zLib license see https://opensource.org/licenses/Zlib for terms.

		$url = 'https://weather-ydn-yql.media.yahoo.com/forecastrss';
		$app_id = 'your yahoo app key';
		$consumer_key = 'your yahoo consumer key';
		$consumer_secret = 'your yahoo consumer secret key';

		$query = array(
			'location' => $cityQuery,
			'format' => 'json',
			'u' => 'c'
		);

		$oauth = array(
			'oauth_consumer_key' => $consumer_key,
			'oauth_nonce' => uniqid(mt_rand(1, 1000)),
			'oauth_signature_method' => 'HMAC-SHA1',
			'oauth_timestamp' => time(),
			'oauth_version' => '1.0'
		);

		$base_info = Weather::buildBaseString($url, 'GET', array_merge($query, $oauth));
		$composite_key = rawurlencode($consumer_secret) . '&';
		$oauth_signature = base64_encode(hash_hmac('sha1', $base_info, $composite_key, true));
		$oauth['oauth_signature'] = $oauth_signature;

		$header = array(
			Weather::buildAuthorizationHeader($oauth),
			'X-Yahoo-App-Id: ' . $app_id
		);
		$options = array(
			CURLOPT_HTTPHEADER => $header,
			CURLOPT_HEADER => false,
			CURLOPT_URL => $url . '?' . http_build_query($query),
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_SSL_VERIFYPEER => false
		);

		$ch = curl_init();
		curl_setopt_array($ch, $options);
		$response = curl_exec($ch);
		curl_close($ch);
		echo $response;
	}

	public function buildBaseString($baseURI, $method, $params) {
		$r = array();
		ksort($params);
		foreach($params as $key => $value) {
			$r[] = "$key=" . rawurlencode($value);
		}
		return $method . "&" . rawurlencode($baseURI) . '&' . rawurlencode(implode('&', $r));
	}

	public function buildAuthorizationHeader($oauth) {
		$r = 'Authorization: OAuth ';
		$values = array();
		foreach($oauth as $key=>$value) {
			$values[] = "$key=\"" . rawurlencode($value) . "\"";
		}
		$r .= implode(', ', $values);
		return $r;
	}	

}
