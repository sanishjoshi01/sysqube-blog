<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\LoginController;
use Illuminate\Support\Facades\Route;

Route::get('api/posts', [PostController::class, 'index']);
Route::get('api/posts/{post:slug}', [PostController::class, 'show']);

Route::post('api/register', [RegisterController::class, 'register']);
Route::post('api/login', [LoginController::class, 'login']);
Route::post('api/logout', [LoginController::class, 'logout'])
    ->middleware('auth:sanctum');

Route::get('api/dashboard', [PostController::class, 'dashboard'])
    ->middleware('auth:sanctum');

Route::post('api/create', [PostController::class, 'create'])
    ->middleware('auth:sanctum');
