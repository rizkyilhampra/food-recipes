<?php

declare(strict_types=1);

namespace App\Data;

use Spatie\LaravelData\Data;

final class LinksData extends Data
{
    /**
     * The data that should be transformed
     */
    public function __construct(
        public string $first,
        public string $last,
        public ?string $prev,
        public ?string $next,
    ) {}
}
