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
        $receivables = [];
        $temp = date('Y-m-d', strtotime("-11 months"));
        for ($i=0; $i < 12; $i++) {
            $m = date('Y-m', strtotime("+ {$i} months", strtotime($temp)));
            $e = explode('-', $m);
            $receivables[] = $this->getReceivableData($e[0], $e[1]);
        }

        $currYear = date('Y');

        return Inertia::render('dashboard', [
            'receivables' => $receivables,
            'counts' => $this->getInvoiceCounts($currYear),
            'revenue' => $this->getRevenueData(),
            'suppliers' => $this->getSuppliersCollectbility(),
        ]);
    }

    private function getReceivableData(string $year, string $month): object
    {
        $first = "{$year}-{$month}-01";
        $last = date('Y-m-d', strtotime('last day of this month', strtotime($first)));

        $paid = Invoice::where('payment_status', 1)
                        ->whereBetween('invoice_date', [$first, $last])
                        ->sum('total_amount');

        $unpaid = Invoice::where('payment_status', 0)
                        ->where('due_date', '>=', date('Y-m-d'))
                        ->whereBetween('invoice_date', [$first, $last])
                        ->sum('total_amount');

        $overdue = Invoice::where('payment_status', 0)
                            ->where('due_date', '<', date('Y-m-d'))
                            ->whereBetween('invoice_date', [$first, $last])
                            ->sum('total_amount');

        return (Object)[
            'year' => $year,
            'month' => $month,
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

    private function getRevenueData()
    {
        $nowF = date('Y-m-d', strtotime('first day of this month'));
        $nowL = date('Y-m-d', strtotime('last day of this month'));
        $lastMonthF = date('Y-m-d', strtotime('first day of last month'));
        $lastMonthL = date('Y-m-d', strtotime('last day of last month'));

        $total_revenue = Invoice::where('payment_status', true)->sum('total_amount');

        $nowRevenue = Invoice::where('payment_status', true)
                                ->whereBetween('invoice_date', [$nowF, $nowL])
                                ->sum('total_amount');

        $lastMonthRevenue = Invoice::where('payment_status', true)
                                        ->whereBetween('invoice_date', [$lastMonthF, $lastMonthL])
                                        ->sum('total_amount');

        return (Object)[
            'thisMonthRevenue' => (int) $nowRevenue,
            'lastMonthRevenue' => (int) $lastMonthRevenue,
            'total_revenue' => (int) $total_revenue,
        ];
    }

    private function getLossData()
    {
        $nowF = date('Y-m-d', strtotime('first day of this month'));
        $nowL = date('Y-m-d', strtotime('last day of this month'));
        $lastMonthF = date('Y-m-d', strtotime('first day of last month'));
        $lastMonthL = date('Y-m-d', strtotime('last day of last month'));

        $total_loss = Invoice::where('payment_status', false)->sum('total_amount');

        $nowLoss = Invoice::where('payment_status', false)
                                ->whereBetween('invoice_date', [$nowF, $nowL])
                                ->sum('total_amount');

        $lastMonthLoss = Invoice::where('payment_status', false)
                                        ->whereBetween('invoice_date', [$lastMonthF, $lastMonthL])
                                        ->sum('total_amount');

        return (Object)[
            'thisMonthLoss' => (int) $nowLoss,
            'lastMonthLoss' => (int) $lastMonthLoss,
            'total_loss' => (int) $total_loss,
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
