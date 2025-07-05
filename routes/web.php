<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ForecastingController;
use App\Http\Controllers\PurchasePredictionController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PurchaseOrderController;
use App\Http\Controllers\SupplierController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', function() {
        return Inertia::render('dashboard');
    })->name('home');

    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::prefix('invoices')->group(function() {
        Route::get('', [InvoiceController::class, 'index'])->name('invoices');

        Route::get('create', [InvoiceController::class, 'create'])->name('invoices.create');

        Route::post('store', [InvoiceController::class, 'store'])->name('invoices.store');

        Route::get('{id}', [InvoiceController::class, 'show'])->name('invoices.detail');

        Route::get('{id}/edit', [InvoiceController::class, 'edit'])->name('invoices.edit');

        Route::put('{id}/update', [InvoiceController::class, 'update'])->name('invoices.update');

        Route::delete('{id}', [InvoiceController::class, 'destroy'])->name('invoices.destroy');

        Route::put('{id}/change-status-paymnet', [InvoiceController::class, 'switchStatusPayment'])->name('invoices.switch-payment');

    });

    Route::prefix('purchase-orders')->group( function() {
        Route::get('', [PurchaseOrderController::class, 'index'])->name('purchase-orders');
        Route::get('create', [PurchaseOrderController::class, 'create'])->name('purchase-orders.create');
        Route::post('store', [PurchaseOrderController::class, 'store'])->name('purchase-orders.store');
        Route::get('{id}',[PurchaseOrderController::class, 'show'])->name('purchase-orders.detail');
        Route::get('{id}/edit', [PurchaseOrderController::class, 'edit'])->name('purchase-orders.edit');
        Route::put('{id}/update', [PurchaseOrderController::class, 'update'])->name('purchase-orders.update');
        Route::delete('{id}', [PurchaseOrderController::class, 'destroy'])->name('purchase-orders.destroy');

    });

    Route::prefix('suppliers')->group( function() {
        Route::get('', [SupplierController::class, 'index'])->name('suppliers');
        Route::get('{id}', [SupplierController::class, 'show'])->name('suppliers.detail');
    });

    Route::prefix('products')->group( function() {
        Route::get('', [ProductController::class, 'index'])->name('products');
    });

    Route::prefix('forecasting')->group( function() {
        Route::get('', [ForecastingController::class, 'index'])->name('forecasting.index');
        Route::get('data', [ForecastingController::class, 'getData'])->name('forecasting.data');
        Route::prefix('{year}')->group(function(){
            Route::get('', [ForecastingController::class, 'getMonth'])->name('forecasting.month');
            Route::get('/{month}', [ForecastingController::class, 'getWeek'])->name('forecasting.week');
        });
    });

    Route::prefix('purchase-predictions')->group( function() {
        Route::get('', [PurchasePredictionController::class, 'index'])->name('purchase-predictions.index');
        Route::prefix('purchase-history')->group(function() {
            Route::get('create', [PurchasePredictionController::class, 'purchaseCreate'])->name('purchase-predictions.purchase.create');
            Route::post('store', [PurchasePredictionController::class, 'purchaseStore'])->name('purchase-predictions.purchase.store');
        });
    });

    Route::prefix('locations')->group( function() {
        Route::get('', [LocationController::class, 'index'])->name('locations');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
