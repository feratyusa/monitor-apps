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

    Route::prefix('invoices')->group(function() {
        Route::get('', function () {
            return Inertia::render('invoices/invoices');
        })->name('invoices');

        Route::get('create', function() {
            return Inertia::render('invoices/invoice-form');
        })->name('invoices.create');

        Route::get('edit', function() {
            return Inertia::render('invoices/invoice-form', [
                'prep' => true
            ]);
        })->name('invoices.edit');

        Route::get('{id}', function() {
            return Inertia::render('invoices/invoice-details');
        })->name('invoices.detail');
    });

    Route::prefix('purchase-orders')->group( function() {
        Route::get('', function () {
            return Inertia::render('purchase-orders/purchase-orders');
        })->name('purchase-orders');

        Route::get('create', function() {
            return Inertia::render('purchase-orders/purchase-orders-form');
        })->name('purchase-orders.create');

        Route::get('edit', function() {
            return Inertia::render('purchase-orders/purchase-orders-form', [
                'prep' => true
            ]);
        })->name('purchase-orders.edit');

        Route::get('{id}', function() {
            return Inertia::render('purchase-orders/purchase-orders-details');
        })->name('purchase-orders.detail');
    });


    Route::get('suppliers', function () {
        return Inertia::render('suppliers');
    })->name('suppliers');

    Route::get('products', function () {
        return Inertia::render('products');
    })->name('products');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
