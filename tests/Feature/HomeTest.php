<?php

declare(strict_types=1);

use Inertia\Testing\AssertableInertia;

use function Pest\Laravel\get;

it('can access homepage', function () {
    $response = get('/');

    $response->assertInertia(function (AssertableInertia $page) {
        $page->component('home', true);
    });
});
