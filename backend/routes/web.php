<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    $text = "Text";
    return response()->json($text);
});
