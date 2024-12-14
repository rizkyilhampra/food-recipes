<?php

declare(strict_types=1);

namespace App\Data\User;

use Spatie\LaravelData\Data;

final class UserData extends Data
{
    /**
     *  Define the data that should be validated and transformed to a DTO.
     */
    public function __construct(
        public int $id,
        public string $name,
        public string $email,
        public string $avatar,
    ) {}
}
