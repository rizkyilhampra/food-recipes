<?php

declare(strict_types=1);

use App\Data\CategoryData;

it('have defined properties', function () {
    $data = [
        'id' => 1,
        'name' => 'vegetables',
        'description' => 'vegetables',
    ];

    $categoryData = CategoryData::from($data);

    expect($categoryData->toArray())->toBe($data);
});
