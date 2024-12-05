<?php

declare(strict_types=1);

use App\Http\Controllers\Auth\AuthenticatedGoogleController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');

Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthenticatedGoogleController::class, 'index'])
        ->name('login');
    Route::get('/login/google', [AuthenticatedGoogleController::class, 'create'])
        ->name('login.google');
    Route::get('/auth/google/callback', [AuthenticatedGoogleController::class, 'store']);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::delete('/logout', [AuthenticatedGoogleController::class, 'destroy'])
        ->name('logout');
});
