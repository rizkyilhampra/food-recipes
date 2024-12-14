<?php

declare(strict_types=1);

use App\Data\AuthData;
use App\Data\User\UserData;
use App\Models\User;
use App\Services\Avatar;

it('have defined properties', function () {
    $data = [
        'user' => UserData::from([
            'id' => 1,
            'name' => 'rizky ilham',
            'email' => 'rizkyilhamp16@gmail.com',
            'avatar' => (new Avatar(User::factory()->make()))->url(),
        ])->toArray(),
    ];

    $authData = AuthData::from($data);

    expect($authData->toArray())->toBe($data);
});
