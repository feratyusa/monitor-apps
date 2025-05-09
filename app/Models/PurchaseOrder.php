<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PurchaseOrder extends Model
{
    use HasFactory;
    protected $table = 'purchase_orders';

     protected $fillable = [
        'supplier_id',
        'product_id',
        'nomor',
        'purchase_date',
        'quantity',
        'price'
    ];

    protected $with = ['supplier', 'product'];

    public function invoices(): HasMany {
        return $this->hasMany(Invoice::class);
    }

    public function product(): BelongsTo {
        return $this->belongsTo(Product::class);
    }

    public function supplier(): BelongsTo {
        return $this->belongsTo(Supplier::class);
    }
}
