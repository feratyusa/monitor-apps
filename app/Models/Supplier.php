<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Supplier extends Model
{
    /** @use HasFactory<\Database\Factories\SupplierFactory> */
    use HasFactory;

     protected $table = 'suppliers';

     protected $fillable = [
        'name',
        'address',
        'phone1',
        'phone2',
        'contact_person',
        'email'
    ];

     public function purchaseOrders(): HasMany {
        return $this->hasMany(PurchaseOrder::class);
     }

}
