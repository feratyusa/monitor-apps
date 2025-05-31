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
        Schema::create('locations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('name');
            $table->string('address', 1024);
            $table->timestamps();
        });

        Schema::create('purchase_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('location_id')->constrained()->nullOnDelete();
            $table->string('buyer');
            $table->integer('amount');
            $table->integer('total_price');
            $table->date('purchase_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchase_histories');
        Schema::dropIfExists('locations');
    }
};
