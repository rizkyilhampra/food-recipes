<?php

declare(strict_types=1);

namespace App\Data;

use Spatie\LaravelData\Data;

final class AuthData extends Data
{
    /**
     *  Define the data that should be validated and transformed to a DTO.
     */
    public function __construct(
        public UserData $user
    ) {}
}
