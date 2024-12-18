<?php

declare(strict_types=1);

use App\Models\Ingredient;
use Inertia\Testing\AssertableInertia;

use function Pest\Laravel\assertDatabaseEmpty;
use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\delete;
use function Pest\Laravel\get;
use function Pest\Laravel\post;
use function Pest\Laravel\put;
use function PHPUnit\Framework\assertEquals;

it('can access index page', function () {
    $response = get('/ingredients');

    $response->assertInertia(function (AssertableInertia $page) {
        $page->component('Ingredient/Index')
            ->hasAll([
                'ingredients.data',
                'ingredients.links',
                'ingredients.meta',
            ]);
    });
});

it('can access create page', function () {
    $response = get('/ingredients/create');

    $response->assertInertia(function (AssertableInertia $page) {
        $page->component('Ingredient/Create');
    });
});

it('can create a ingredient', function () {
    $data = [
        'name' => 'garam',
    ];

    $response = post('/ingredients', $data);

    $response->assertRedirect('/ingredients')
        ->assertSessionHas('type', 'success')
        ->assertSessionHas('message', 'Ingredient named '.ucfirst($data['name']).' created');

    assertDatabaseHas('ingredients', $data);
});

it('can access edit page', function () {
    $ingredient = Ingredient::factory()->create();

    $response = get("/ingredients/{$ingredient->id}/edit");

    $response->assertInertia(function (AssertableInertia $page) use ($ingredient) {
        $page->component('Ingredient/Edit')
            ->has('ingredient')
            ->whereAll([
                'ingredient.id' => $ingredient->id,
                'ingredient.name' => $ingredient->name,
            ]);
    });
});

it('can see detail ingredient', function () {
    $ingredient = Ingredient::factory()->create();

    $response = get("/ingredients/{$ingredient->id}");

    $response->assertInertia(function (AssertableInertia $page) use ($ingredient) {
        $page->component('Ingredient/Show')
            ->has('ingredient')
            ->where('ingredient.id', $ingredient->id)
            ->where('ingredient.name', $ingredient->name);
    });
});

it('can update a ingredient', function () {
    $ingredient = Ingredient::factory()->create();

    $data = [
        'name' => 'Gula',
    ];

    $response = put("/ingredients/{$ingredient->id}", $data);

    $response->assertRedirect('/ingredients')
        ->assertSessionHas('type', 'success')
        ->assertSessionHas('message', "Ingredient named {$data['name']} updated");

    assertEquals($data['name'], $ingredient->fresh()->name);
});

it('can delete a ingredient', function () {
    $ingredient = Ingredient::factory()->create();

    $response = delete("/ingredients/{$ingredient->id}");

    $response->assertRedirect('/ingredients')
        ->assertSessionHas('type', 'success')
        ->assertSessionHas('message', "Ingredient named {$ingredient->name} deleted");

    assertDatabaseEmpty('ingredients');
});
