<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('invoices', function () {
        return Inertia::render('invoices/invoices');
    })->name('invoices');

    Route::get('purchase-orders', function () {
        return Inertia::render('purchase-orders');
    })->name('purchase-orders');

    Route::get('suppliers', function () {
        return Inertia::render('suppliers');
    })->name('suppliers');

    Route::get('products', function () {
        return Inertia::render('products');
    })->name('products');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
