<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PurchaseHistory extends Model
{
    use HasFactory;
    protected $fillable = [
        'location_id',
        'buyer',
        'amount',
        'total_price',
        'purchase_date',
    ];

    protected $with = ['location'];

    public function location(): BelongsTo
    {
        return $this->belongsTo(Location::class);
    }
}
