<?php

declare(strict_types=1);

use App\Data\IngredientData;

it('have defined properties', function () {
    $data = [
        'id' => 1,
        'name' => 'vegetables',
        'updated_at' => now()->toDateTimeString(),
    ];

    $ingredient = IngredientData::from($data);

    expect($ingredient->toArray())->toBe($data);
});
