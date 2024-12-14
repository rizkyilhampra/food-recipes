<?php

declare(strict_types=1);

namespace App\Data;

use Spatie\LaravelData\Data;

final class MetaLinksData extends Data
{
    /**
     * The data that should be transformed
     */
    public function __construct(
        public ?string $url,
        public string $label,
        public bool $active,
    ) {}
}
