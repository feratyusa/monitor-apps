<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Supplier>
 */
class SupplierFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'address' => fake()->address(),
            'phone1' => fake()->phoneNumber(),
            'phone2' => fake()->numberBetween(0, 1) == 1 ? fake()->phoneNumber() : null,
            'contact_person' => fake()->name(),
            'email' => fake()->email()
        ];
    }
}
