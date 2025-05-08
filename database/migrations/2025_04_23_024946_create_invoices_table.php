<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->string('nomor');
            $table->date('invoice_date');
            $table->foreignId('purchase_order_id')->constrained()->cascadeOnDelete();
            $table->integer('discount');
            $table->integer('total_amount');
            $table->date('due_date');
            $table->boolean('payment_status');
            $table->string('bank');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
