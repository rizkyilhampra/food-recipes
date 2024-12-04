<?php

declare(strict_types=1);

use function Pest\Laravel\get;

it('shows the login page', function () {
    $response = get('/login');
    $response->assertStatus(200)->assertInertia(function ($page) {
        return $page->component('auth/login');
    });
});
