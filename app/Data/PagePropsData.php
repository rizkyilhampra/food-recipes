<?php

declare(strict_types=1);

namespace App\Data;

use Spatie\LaravelData\Data;

final class PagePropsData extends Data
{
    /**
     * The data that should be transformed
     */
    public function __construct(
        public AuthData $auth,
        public FlashMessageData $flashMessage
    ) {}
}
