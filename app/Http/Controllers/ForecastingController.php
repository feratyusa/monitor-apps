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

    public function getMonth(string $year)
    {
        return Inertia::render('forecasting/forecasting-month', [
            'year' => $year
        ]);
    }

    public function getWeek(string $year, string $month) 
    {
        return Inertia::render('forecasting/forecasting-week', [
            'year' => $year,
            'month' => $month
        ]);
    }

    public function getData()
    {
        return Inertia::render('forecasting/forecasting-data');
    }
}
