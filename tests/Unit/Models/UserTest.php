<?php

declare(strict_types=1);

use function PHPUnit\Framework\assertEquals;

it('user model has correct fillable properties', function () {
    $user = new App\Models\User();

    assertEquals([
        'name',
        'email',
        'password',
    ], $user->getFillable());
});

it('user model has correct hidden properties', function () {
    $user = new App\Models\User();

    assertEquals([
        'password',
        'remember_token',
    ], $user->getHidden());
});

it('user model has correct casts properties', function () {
    $user = new App\Models\User();

    assertEquals([
        'id' => 'int',
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ], $user->getCasts());
});

it('has correct mutate attribute', function () {
    $user = new App\Models\User();

    expect($user->getMutatedAttributes())->toBe(['avatar']);
});
