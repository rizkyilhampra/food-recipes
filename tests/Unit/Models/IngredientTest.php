<?php

declare(strict_types=1);

use App\Models\Ingredient;

use function PHPUnit\Framework\assertEquals;

it('had correct fillable properties', function () {
    $ingredient = new Ingredient();

    assertEquals([
        'name',
    ], $ingredient->getFillable());
});

it('had correct mutable properties', function () {
    $ingredient = new Ingredient();

    assertEquals([
        'name',
    ], $ingredient->getMutatedAttributes());
});

it('had getPaginated method', function () {
    $ingredient = Ingredient::factory()->create();

    $paginated = $ingredient->getPaginated();

    assertEquals(10, $paginated->perPage());
});
