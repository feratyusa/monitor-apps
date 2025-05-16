<?php

namespace App;

use App\Models\Invoice;

trait GetCollecbility
{
    public function getCollectbiityStatus(int $supplierId) {
        $invoice = Invoice::whereHas('purchaseOrder', function($query) use($supplierId) {
            $query->where('supplier_id', $supplierId);
        })->where('payment_status', false)->orderBy('due_date')->first();

        if($invoice == null) return "1";

        $diffDays = (strtotime($invoice->due_date) - strtotime(date('Y-m-d'))) / (3600 * 24);

        if($diffDays >= 0) return "1";
        else if($diffDays >= -90) return "2";
        else if($diffDays >= -120) return "3";
        else if($diffDays >= -180) return "4";
        return "5";
    }
}
