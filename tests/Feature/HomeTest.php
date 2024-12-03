<?php

declare(strict_types=1);

use Inertia\Testing\AssertableInertia;

use function Pest\Laravel\get;

it('can access homepage', function () {
    $response = get('/');

    $response->assertStatus(200)
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('home'));
});
