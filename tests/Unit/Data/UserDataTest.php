<?php

declare(strict_types=1);
use App\Data\UserData;

it('have defined properties', function () {
    $data = [
        'id' => 1,
        'name' => 'rizky ilham',
        'email' => 'rizyilhampra@gmail.com',
    ];

    $userData = UserData::from($data);

    expect($userData->toArray())->toBe($data);
});
