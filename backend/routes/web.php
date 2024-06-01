<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('api/posts', [PostController::class, 'index']);
Route::get('api/posts/{post:slug}', [PostController::class, 'show']);

Route::post('api/register', [RegisterController::class, 'register']);
