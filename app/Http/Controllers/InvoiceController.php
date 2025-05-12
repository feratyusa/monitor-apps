<?php

namespace App\Http\Controllers;

use App\Http\Requests\InvoiceFormRequest;
use App\Models\Invoice;
use App\Models\PurchaseOrder;
use App\TransformToSelectOptions;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    use TransformToSelectOptions;
    public function index()
    {
        return Inertia::render('invoices/invoices', [
            'invoices' => Invoice::with('purchaseOrder')->get(),
            'kolSelection' => $this->generateKolSelection(),
            'paidmentSelection' => $this->generatePaidmentSelection()
        ]);
    }

    public function show(string $id)
    {
        return Inertia::render('invoices/invoice-details', [
            'invoice' => Invoice::with('purchaseOrder')->findOrFail($id)
        ]);
    }

    public function create()
    {
        return Inertia::render('invoices/invoice-form', [
            'purchase_orders' => PurchaseOrder::all(),
            'purchase_order_options' => $this->getPOSelectOption(),
        ]);
    }

    public function store(InvoiceFormRequest $request)
    {
        $validated = $request->validated();

        $purchase_order = PurchaseOrder::findOrFail($validated['purchase_order_id']);

        $invoice = Invoice::create([
            'nomor' => $validated['nomor'],
            'purchase_order_id' => $purchase_order->id,
            'invoice_date' => $validated['invoice_date'],
            'due_date' => $validated['due_date'],
            'discount' => $validated['discount'],
            'bank' => $validated['bank'],
            'total_amount' => $purchase_order->price * (100 - $validated['discount']) / 100,
            'payment_status' => $validated['payment_status'],
        ]);

        return redirect()->route('invoices.detail', [$invoice->id]);
    }

    public function edit(string $id)
    {
        return Inertia::render('invoices/invoice-form', [
            'invoice' => Invoice::with('purchaseOrder')->findOrFail($id),
            'purchase_orders' => PurchaseOrder::all(),
            'purchase_order_options' => $this->getPOSelectOption(),
        ]);
    }

    public function update(string $id, InvoiceFormRequest $request)
    {
        $validated = $request->validated();

        $purchase_order = PurchaseOrder::findOrFail($validated['purchase_order_id']);

        Invoice::findOrFail($id)->update([
            'nomor' => $validated['nomor'],
            'purchase_order_id' => $purchase_order->id,
            'invoice_date' => $validated['invoice_date'],
            'due_date' => $validated['due_date'],
            'discount' => $validated['discount'],
            'bank' => $validated['bank'],
            'total_amount' => $purchase_order->price * (100 - $validated['discount']) / 100,
            'payment_status' => $validated['payment_status'],
        ]);

        return redirect()->route('invoices.detail', [$id]);
    }

    public function destroy(string $id)
    {
        Invoice::findOrFail($id)->deleteOrFail();

        return redirect()->route('invoices');
    }

    public function switchStatusPayment(string $id)
    {
        $invoice = Invoice::findOrFail($id);

        $status = $invoice->payment_status;

        $invoice->update([
            'payment_status' => !$status
        ]);

        return redirect()->route('invoices.detail', [$id]);
    }

    private function generateKolSelection() {
        return [
            ['value' => '1', 'label' => 'KOL 1'],
            ['value' => '2', 'label' => 'KOL 2'],
            ['value' => '3', 'label' => 'KOL 3'],
            ['value' => '4', 'label' => 'KOL 4'],
            ['value' => '5', 'label' => 'KOL 5'],
        ];
    }

    private function generatePaidmentSelection() {
        return [
            ['label' => "Paid", 'value' => "1",],
            ['label' => "Unpaid", 'value' => "0",]
        ];
    }

    private function getPOSelectOption() {
        $pos = PurchaseOrder::all()->toArray();

        $options = [];
        foreach($pos as $p) {
            $options[] = (Object)['value' => $p['id'], 'label' => $p['nomor']." - ".$p['supplier']['name']];
        }

        return $options;
    }
}
