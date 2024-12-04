<?php

declare(strict_types=1);

use App\Data\UserData;
use App\Models\User;
use App\Services\Avatar;

it('have defined properties', function () {
    $data = [
        'id' => 1,
        'name' => 'rizky ilham',
        'email' => 'rizyilhampra@gmail.com',
        'avatar' => (new Avatar(User::factory()->make()))->url(),
    ];

    $userData = UserData::from($data);

    expect($userData->toArray())->toBe($data);
});
