<?php

namespace Database\Seeders;

use App\Models\Invoice;
use App\Models\Product;
use App\Models\PurchaseOrder;
use App\Models\Supplier;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DummySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Product
        $products = [];
        $products[] = Product::create([
            'name' => 'BIOSOLAR 60',
            'price_per_unit' => 13500
        ]);
        $products[] = Product::create([
            'name' => 'BIOSOLAR 70',
            'price_per_unit' => 14000
        ]);
        $products[] = Product::create([
            'name' => 'BIOSOLAR 80',
            'price_per_unit' => 17300
        ]);

        // Supplier
        $suppliers = [];
        $suppliers[] = Supplier::factory()->create([
            'name' => "PT Setia Jaya",
        ]);
        $suppliers[] = Supplier::factory()->create([
            'name' => "CV Maju Makmur",
        ]);
        $suppliers[] = Supplier::factory()->create([
            'name' => "PT Bersama Dia",
        ]);
        $suppliers[] = Supplier::factory()->create([
            'name' => "CV Ada Ada Saja",
        ]);
        $suppliers[] = Supplier::factory()->create([
            'name' => "PT Indah Semukti",
        ]);

        // Purchase Orders
        $pos = [];
        foreach ($suppliers as $key => $value) {
            $s = explode(" ", $value->name)[2];
            for($i = 0; $i < fake()->numberBetween(8, 10); $i++) {

                $n = str_pad($key + $i + 1, 4, '0', STR_PAD_LEFT);

                $date = fake()->dateTimeBetween('-1 years', '-2 weeks')->format('Y-m-d');
                $year = explode("-", $date)[2];

                $p = $products[fake()->numberBetween(0, count($products) - 1)];

                $quantity = fake()->numberBetween(1000, 10000);

                $pos[] = PurchaseOrder::create([
                    'supplier_id' => $value->id,
                    'product_id' => $p->id,
                    'nomor' => "PO/{$n}/{$s}/{$year}",
                    'purchase_date' => $date,
                    'quantity' => $quantity,
                    'price' => $p->price_per_unit * $quantity,
                ]);
            }
        }

        // Invoices
        foreach($suppliers as $key => $value) {
            $ps = PurchaseOrder::where('supplier_id', $value->id)->orderBy('purchase_date')->get();

            foreach($ps as $i => $p) {
                $n = str_pad($i+1, 4, '0', STR_PAD_LEFT);

                $f = fake()->numberBetween(1, 2);
                $invoice_date = date('Y-m-d', strtotime("+{$f} weeks", strtotime($p->purchase_date)));

                $d = fake()->numberBetween(3, 6);
                $due_date = date('Y-m-d', strtotime("+{$d} months", strtotime($invoice_date)));

                $delivery_date = date('Y-m-d', strtotime('+1 months', strtotime($invoice_date)));

                Invoice::create([
                    'purchase_order_id' => $p->id,
                    'nomor' => "INV/{$n}/2025",
                    'invoice_date' => $invoice_date,
                    'tax' => 11,
                    'total_amount' => $p->price * (1 + 11/100),
                    'due_date' => $due_date,
                    'delivery_date' => $delivery_date,
                    'payment_status' => fake()->numberBetween(0, 3) == 0 ? false : true,
                    'bank' => "Bank Jatim",
                ]);

            }

        }
    }
}
