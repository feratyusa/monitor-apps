<?php

namespace App\Http\Controllers;

use App\Http\Requests\PurchaseOrderFormRequest;
use App\Models\Invoice;
use App\Models\Product;
use App\Models\PurchaseOrder;
use App\Models\Supplier;
use App\TransformToSelectOptions;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PurchaseOrderController extends Controller
{
    use TransformToSelectOptions;

    public function index()
    {
        return Inertia::render('purchase-orders/purchase-orders', [
            'purchase_orders' => PurchaseOrder::all(),
            'supplierOptions' => $this->transformToSelectOptions(Supplier::all()->toArray(), 'name', 'name'),
        ]);
    }

    public function show(string $id)
    {
        $purchase_order = PurchaseOrder::findOrFail($id);
        return Inertia::render('purchase-orders/purchase-order-details', [
            'purchase_order' => $purchase_order,
            'invoices' => Invoice::where('purchase_order_id', $purchase_order->id)->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('purchase-orders/purchase-order-form', [
            'supplierOptions' => $this->transformToSelectOptions(Supplier::all()->toArray(), 'id', 'name'),
            'productOptions' => $this->transformToSelectOptions(Product::all()->toArray(), 'id', 'name'),
            'products' => Product::all(),
        ]);
    }

    public function store(PurchaseOrderFormRequest $request)
    {
        $validated = $request->validated();

        $product = Product::findOrFail($validated['product_id']);

        $newProduct = PurchaseOrder::create([
            'supplier_id' => $validated['supplier_id'],
            'product_id' => $validated['product_id'],
            'nomor' => $validated['nomor'],
            'purchase_date' => $validated['purchase_date'],
            'quantity' => $validated['quantity'],
            'price' => $product->price_per_unit * $validated['quantity'],
        ]);

        return redirect()->route('purchase-orders.detail', ['id' => $newProduct->id]);
    }

    public function edit(string $id) {
        return Inertia::render('purchase-orders/purchase-order-form', [
            'purchase_order' => PurchaseOrder::findOrFail($id),
            'supplierOptions' => $this->transformToSelectOptions(Supplier::all()->toArray(), 'id', 'name'),
            'productOptions' => $this->transformToSelectOptions(Product::all()->toArray(), 'id', 'name'),
            'products' => Product::all(),
        ]);
    }

    public function update(PurchaseOrderFormRequest $request, string $id)
    {
        $validated = $request->validated();

        $product = Product::findOrFail($validated['product_id']);

        $purchase_order = PurchaseOrder::findOrFail($id)->update([
            'supplier_id' => $validated['supplier_id'],
            'product_id' => $validated['product_id'],
            'nomor' => $validated['nomor'],
            'purchase_date' => $validated['purchase_date'],
            'quantity' => $validated['quantity'],
            'price' => $product->price_per_unit * $validated['quantity'],
        ]);

        return redirect()->route('purchase-orders.detail', ['id' => $id]);
    }

    public function destroy(string $id)
    {
        PurchaseOrder::findOrFail($id)->deleteOrFail();

        return redirect()->route('purchase-orders');
    }
}
