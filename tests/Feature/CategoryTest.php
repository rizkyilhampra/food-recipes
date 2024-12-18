<?php

declare(strict_types=1);

use App\Models\Category;
use Inertia\Testing\AssertableInertia;

use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\assertDatabaseMissing;
use function Pest\Laravel\delete;
use function Pest\Laravel\get;
use function Pest\Laravel\post;
use function Pest\Laravel\put;

it('can access index page', function () {
    $response = get('/categories');

    $response->assertInertia(function (AssertableInertia $page) {
        $page->component('Category/Index')
            ->hasAll([
                'categories.data',
                'categories.links',
                'categories.meta',
            ]);
    });
});

it('can access create page', function () {
    $response = get('/categories/create');

    $response->assertInertia(function (AssertableInertia $page) {
        $page->component('Category/Create');
    });
});

it('can create a category', function () {
    $data = [
        'name' => 'Test Category',
        'description' => 'Test Category Description',
    ];

    $response = post('/categories', $data);

    $response->assertRedirect('/categories')
        ->assertSessionHas('type', 'success')
        ->assertSessionHas('message', "Category named {$data['name']} created successfully.");

    assertDatabaseHas('categories', $data);
});

it('can access edit page', function () {
    $category = Category::factory()->create();

    $response = get("/categories/{$category->id}/edit");

    $response->assertInertia(function (AssertableInertia $page) use ($category) {
        $page->component('Category/Edit')
            ->has('category')
            ->whereAll([
                'category.id' => $category->id,
                'category.name' => $category->name,
            ]);
    });
});

it('can see detail category', function() {
    $category = Category::factory()->create();

    $response = get("/categories/{$category->id}");

    $response->assertInertia(function (AssertableInertia $page) use ($category) {
        $page->component('Category/Detail')
            ->has('category')
            ->where('category.id', $category->id)
            ->where('category.name', $category->name);
    });
});

it('can update a category', function () {
    $category = Category::factory()->create();

    $data = [
        'name' => 'Test Category',
        'description' => 'Test Category Description',
    ];

    $response = put("/categories/{$category->id}", $data);

    $response->assertRedirect('/categories')
        ->assertSessionHas('type', 'success')
        ->assertSessionHas('message', "Category named {$data['name']} updated successfully.");

    assertDatabaseHas('categories', $data);
});


it('can delete a category', function () {
    $category = Category::factory()->create();

    $response = delete("/categories/{$category->id}");

    $response->assertRedirect('/categories')
        ->assertSessionHas('type', 'success')
        ->assertSessionHas('message', "Category named {$category->name} deleted successfully.");

    assertDatabaseMissing('categories', [
        'id' => $category->id,
    ]);
});
