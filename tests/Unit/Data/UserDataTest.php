<?php

declare(strict_types=1);
use App\Data\UserData;

it('have defined properties', function () {
    $data = [
        'name' => 'rizky ilham',
        'email' => 'rizyilhampra@gmail.com',
        'password' => 'password',
    ];

    $userData = UserData::from($data);

    expect($userData->toArray())->toBe($data);
});
