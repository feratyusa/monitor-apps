<?php

namespace App\Http\Controllers;

use App\GetCollecbility;
use App\Models\Invoice;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    use GetCollecbility;
    public function index()
    {
        $currYear = (int) date('Y');
        $results = [
            $this->getReceivableData($currYear - 3),
            $this->getReceivableData($currYear - 2),
            $this->getReceivableData($currYear - 1),
            $this->getReceivableData($currYear),
        ];

        return Inertia::render('dashboard', [
            'receivables' => $results,
            'counts' => $this->getInvoiceCounts($currYear),
            'revenue' => $this->getRevenueData($currYear),
            'suppliers' => $this->getSuppliersCollectbility(),
        ]);
    }

    private function getReceivableData(int $year)
    {
        $paid = Invoice::where('payment_status', 1)
                        ->whereBetween('invoice_date', ["{$year}-01-01", "{$year}-12-31"])
                        ->sum('total_amount');

        $unpaid = Invoice::where('payment_status', 0)
                        ->where('due_date', '>=', date('Y-m-d'))
                        ->whereBetween('invoice_date', ["{$year}-01-01", "{$year}-12-31"])
                        ->sum('total_amount');

        $overdue = Invoice::where('payment_status', 0)
                            ->where('due_date', '<', date('Y-m-d'))
                            ->whereBetween('invoice_date', ["{$year}-01-01", "{$year}-12-31"])
                            ->sum('total_amount');

        return (Object)[
            'year' => $year,
            'paid' => $paid,
            'unpaid' => $unpaid,
            'overdue' => $overdue,
        ];
    }

    private function getInvoiceCounts(int $currYear)
    {
        $lastYear = $currYear - 1;

        $paid = Invoice::where('payment_status', 1)
                        ->whereBetween('invoice_date', ["{$currYear}-01-01", "{$currYear}-12-31"])
                        ->count();
        $last_paid = Invoice::where('payment_status', 1)
                        ->whereBetween('invoice_date', ["{$lastYear}-01-01", "{$lastYear}-12-31"])
                        ->count();
        $unpaid = Invoice::where('payment_status', 0)
                        ->where('due_date', '>=', date('Y-m-d'))
                        ->count();
        $overdue = Invoice::where('payment_status',0)
                        ->where('due_date', '<', date('Y-m-d'))
                        ->whereBetween('invoice_date', ["{$currYear}-01-01", "{$currYear}-12-31"])
                        ->count();
        $last_overdue = Invoice::where('payment_status', 1)
                        ->where('due_date', '<', date('Y-m-d'))
                        ->whereBetween('invoice_date', ["{$lastYear}-01-01", "{$lastYear}-12-31"])
                        ->count();
        return (Object)[
            'paid' => $paid,
            'last_paid' => $last_paid,
            'unpaid' => $unpaid,
            'overdue' => $overdue,
            'last_overdue' => $last_overdue
        ];
    }

    private function getRevenueData(int $year)
    {
        $revenue = Invoice::sum('total_amount');
        $last_revenue = Invoice::where('invoice_date', '<', "{$year}-01-01")
                                ->sum('total_amount');

        return (Object)[
            'revenueIncrease' => (int) $revenue - (int) $last_revenue,
            'total_revenue' => (int) $revenue,
        ];
    }

    private function getSuppliersCollectbility()
    {
        $suppliers = Supplier::all();

        foreach ($suppliers as $supplier) {
            $supplier['kolekbilitas'] = $this->getCollectbiityStatus($supplier->id);
        }

        $suppliers =  $suppliers->collect();

        return [
            ['kolekbilitas' => "kol1", 'value' => $suppliers->where('kolekbilitas', "1")->count()],
            ['kolekbilitas' => "kol2", 'value' => $suppliers->where('kolekbilitas', "2")->count()],
            ['kolekbilitas' => "kol3", 'value' => $suppliers->where('kolekbilitas', "3")->count()],
            ['kolekbilitas' => "kol4", 'value' => $suppliers->where('kolekbilitas', "4")->count()],
            ['kolekbilitas' => "kol5", 'value' => $suppliers->where('kolekbilitas', "5")->count()],
        ];
    }
}
