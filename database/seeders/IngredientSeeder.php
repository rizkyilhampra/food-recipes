<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Ingredient;
use Illuminate\Database\Seeder;

final class IngredientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Ingredient::factory(count: 10)->create();
    }
}
