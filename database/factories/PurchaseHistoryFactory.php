<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PurchaseHistory>
 */
class PurchaseHistoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'location_id' => 0,
            'buyer' => fake()->randomElement(['PT', 'CV'])." ".fake()->name(),
            'amount' => fake()->numberBetween(10000,100000),
            'total_price' => fake()->numberBetween(100000000, 1000000000),
            'purchase_date' => fake()->date('Y-m-d')
        ];
    }
}
