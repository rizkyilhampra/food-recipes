<?php

declare(strict_types=1);

namespace App\Data;

use Spatie\LaravelData\Data;

final class UserData extends Data
{
    /**
     *  Define the data that should be validated and transformed to a DTO.
     */
    public function __construct(
        public string $name,
        public string $email,
        public string $password,
    ) {}
}
