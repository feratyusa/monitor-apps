<?php

namespace Database\Seeders;

use App\Models\Location;
use App\Models\PurchaseHistory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ForecastingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $locationTemps = [
            'Ketapang', 'Banjarmasin', 'Banjar Baru', 'Tanah Baru', 'Pontianak'
        ];

        $locations = [];
        foreach ($locationTemps as $location) {
            $locations[] = Location::factory()->create([
                'name' => $location
            ]);
        }

        foreach ($locations as $location) {
            $this->generatePurchaseHistory(2024, $location->id);
            $this->generatePurchaseHistory(2025, $location->id, 5);
        }
    }

    private function generatePurchaseHistory(int $year, int $location_id, int $length = 12) {
        for ($i = 1; $i <= $length; $i++) {
            $month = str_pad($i, 2,'0', STR_PAD_LEFT);
            $day = str_pad(fake()->numberBetween(1, 28), 2,'0', STR_PAD_LEFT);
            PurchaseHistory::factory()->create([
                'purchase_date' => "{$year}-{$month}-{$day}",
                'location_id' => $location_id
            ]); 
        }
    }
}
