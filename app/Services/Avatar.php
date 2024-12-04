<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\User;

final readonly class Avatar
{
    /**
     * Create a new avatar for the given name and email address.
     */
    public function __construct(
        private User $user
    ) {}

    /**
     * Get the avatar URL.
     */
    public function url(int $size = 200): string
    {
        $gravatarHash = hash('sha256', mb_strtolower($this->user->email));
        $gravatarUrl = "https://gravatar.com/avatar/{$gravatarHash}?s={$size}&d=monsterid";

        return $gravatarUrl;
    }
}
