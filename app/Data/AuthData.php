<?php

declare(strict_types=1);

namespace App\Data;

use App\Data\User\UserData;
use Spatie\LaravelData\Data;

final class AuthData extends Data
{
    /**
     * The data that should be transformed
     */
    public function __construct(
        public UserData $user
    ) {}
}
