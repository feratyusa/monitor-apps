<?php

namespace App\Http\Controllers;

use App\GetCollecbility;
use App\Models\Invoice;
use App\Models\PurchaseOrder;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SupplierController extends Controller
{
    use GetCollecbility;
    public function index() {
        $suppliers = Supplier::all();

        foreach ($suppliers as $supplier) {
            $supplier['kolekbilitas'] = $this->getCollectbiityStatus($supplier->id);
        }

        return Inertia::render('suppliers/suppliers', [
            'suppliers' => $suppliers,
        ]);
    }

    public function show(string $id)
    {
        $supplier = Supplier::findOrFail($id);

        return Inertia::render('suppliers/supplier-details', [
            'supplier' => $supplier,
            'kolekbilitas' => $this->getCollectbiityStatus($supplier->id),
            'purchase_orders' => PurchaseOrder::where('supplier_id', $supplier->id)->orderByDesc('purchase_date')->get(),
            'invoices' => Invoice::whereHas('purchaseOrder', function($query) use($supplier) {
                $query->where('supplier_id', $supplier->id);
            })->orderByDesc('due_date')->get(),
        ]);
    }
}
