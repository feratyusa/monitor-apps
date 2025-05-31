<?php

namespace App\Http\Controllers;

use App\Http\Requests\ForecastingFormRequest;
use App\Models\Location;
use App\Models\PurchaseHistory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ForecastingController extends Controller
{
    public function index() 
    {
        // return response()->json([
        //     'recaps' => $this->getForecastingValues()
        // ]);

        return Inertia::render('forecasting/forecasting', [
            'purchase_histories' => PurchaseHistory::orderByDesc('updated_at')->get(),
        ]);
    }

    public function purchaseCreate()
    {
        return Inertia::render('forecasting/purchase-form');
    }

    public function purchaseStore(ForecastingFormRequest $request)
    {
        $validated = $request->validated();

        PurchaseHistory::create([
            'location_id' => $validated['location_id'],
            'buyer'=> $validated['buyer'],
            'amount'=> $validated['amount'],
            'total_price'=> $validated['total_price'],
            'purchase_date'=> $validated['purchase_date'],
        ]);

        return redirect()->route('forecasting.index');
    }

    private function getForecastingValues() 
    {
        $result = [];

        $year = (int)date('Y');
        $monthStart = (int)date('m');
        $yearMinusOne = $year - 1;
        $yearPlusOne = $year + 1;

        $recaps = PurchaseHistory::selectRaw('location_id, MONTH(purchase_date) as month, YEAR(purchase_date) as year, SUM(amount) as amount')
                                    ->where('purchase_date', '>', "{$yearMinusOne}-01-01")
                                    ->groupByRaw('location_id, MONTH(purchase_date), YEAR(purchase_date)')
                                    ->orderByRaw('YEAR(purchase_date), MONTH(purchase_date), location_id')
                                    ->get();

        

        $locations =  $recaps->groupBy('location_id');
        // foreach ($locations as $value) {
        //     for()
        // }

        // $recaptLocations = $recaps->groupBy('location_id');
        // return $recaps;

        // Minus one year
        $temp = [];
        $r1 = $recaps->where('year', 2024)->groupBy('location_id');
        foreach($r1 as $location) {
            $t = [];
            foreach($location as $value) $t[] = (Object)['amount' => $value->amount, 'prediction' => false];
            $temp[] = (Object)['location' => $location->first()->location, 'months' => $t];
        }
        return $temp;
    }
}



