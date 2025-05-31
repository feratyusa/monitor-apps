<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ForecastingController extends Controller
{
    public function index() 
    {
        return Inertia::render('forecasting/forecasting');
    }

    public function purchaseCreate()
    {
        return Inertia::render('forecasting/purchase-form');
    }
}
