<?php

declare(strict_types=1);

namespace App\Data;

use Spatie\LaravelData\Data;

final class IngredientData extends Data
{
    public function __construct(
        public readonly int $id,
        public readonly string $name,
        public readonly string $updated_at,
    ) {}
}
