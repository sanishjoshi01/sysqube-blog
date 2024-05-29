<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

// Route::get('/', [HomeController::class, 'home']);
Route::get('/posts', [PostController::class, 'index']);
