<?php

declare(strict_types=1);

use App\Models\Category;

use function PHPUnit\Framework\assertEquals;

it('had correct fillable properties', function () {
    $category = new Category();

    assertEquals([
        'name',
        'description',
    ], $category->getFillable());
});

it('had correct mutable properties', function () {
    $category = new Category();

    assertEquals([
        'name',
    ], $category->getMutatedAttributes());
});

it('had getPaginated method', function () {
    $category = Category::factory()->create();

    $paginated = $category->getPaginated();

    assertEquals(10, $paginated->perPage());
});
