<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('dashboard');
    })->name('home');

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
            return Inertia::render('purchase-orders/purchase-order-form');
        })->name('purchase-orders.create');

        Route::get('edit', function() {
            return Inertia::render('purchase-orders/purchase-order-form', [
                'prep' => true
            ]);
        })->name('purchase-orders.edit');

        Route::get('{id}', function() {
            return Inertia::render('purchase-orders/purchase-order-details');
        })->name('purchase-orders.detail');
    });

    Route::prefix('suppliers')->group( function() {
        Route::get('', function () {
            return Inertia::render('suppliers/suppliers');
        })->name('suppliers');

        // Route::get('create', function() {
        //     return Inertia::render('suppliers/supplier-form');
        // })->name('suppliers.create');

        // Route::get('edit', function() {
        //     return Inertia::render('suppliers/supplier-form', [
        //         'prep' => true
        //     ]);
        // })->name('suppliers.edit');

        Route::get('{id}', function() {
            return Inertia::render('suppliers/supplier-details');
        })->name('suppliers.detail');
    });

    Route::prefix('products')->group( function() {
        Route::get('', function () {
            return Inertia::render('products/products');
        })->name('products');

        // Route::get('create', function() {
        //     return Inertia::render('products/product-form');
        // })->name('products.create');

        // Route::get('edit', function() {
        //     return Inertia::render('products/product-form', [
        //         'prep' => true
        //     ]);
        // })->name('products.edit');

        Route::get('{id}', function() {
            return Inertia::render('products/product-details');
        })->name('products.detail');
    });

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
