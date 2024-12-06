<?php

declare(strict_types=1);

use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertGuest;

it('logs out the user successfully', function () {
    $user = User::factory()->create();

    $response = actingAs($user)->delete(route('logout'));

    assertGuest();
    $response->assertRedirect(route('home'));
});
