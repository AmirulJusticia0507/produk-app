<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
});

// Routes for product management
Route::middleware(['auth:sanctum', 'verified'])->group(function () {
    Route::get('/products', function () {
        return Inertia::render('ProductIndex');
    })->name('products.index');

    Route::get('/products/create', function () {
        return Inertia::render('ProductCreate');
    })->name('products.create');

    Route::get('/products/edit/{id}', function ($id) {
        return Inertia::render('ProductEdit', ['id' => $id]);
    })->name('products.edit');
});
