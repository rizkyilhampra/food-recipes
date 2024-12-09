<?php

declare(strict_types=1);

use Inertia\Testing\AssertableInertia;

use function Pest\Laravel\get;
use function Pest\Laravel\getJson;

it('can access homepage', function () {
    $response = get('/');

    $response->assertInertia(function (AssertableInertia $page) {
        $page->component('home')
            ->hasAll([
                'users.data',
                'users.links',
                'users.meta',
                'search',
            ]);
    });
});

it('can search for users', function () {
    App\Models\User::factory()->create(['name' => 'John Doe']);
    App\Models\User::factory()->create(['name' => 'Jane Smith']);
    App\Models\User::factory()->create(['name' => 'Another User']);

    $response = getJson('/?search=John');

    $response->assertInertia(function (AssertableInertia $page) {
        $page->component('home')
            ->has('users.data', 1, function (AssertableInertia $page) {
                $page->hasAll(['id', 'name', 'email', 'avatar'])
                    ->where('name', 'John Doe');
            })->where('search', 'John');
    });
});

it('paginates users correctly', function () {
    App\Models\User::factory(10)->create();

    $response = get('/');

    $response->assertInertia(function (AssertableInertia $page) {
        $page->component('home')
            ->has('users.data', 5)
            ->has('users.meta')
            ->has('users.links');
    });
});
