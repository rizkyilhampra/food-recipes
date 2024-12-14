<?php

declare(strict_types=1);

namespace App\Data;

use Spatie\LaravelData\Data;

final class MetaData extends Data
{
    /**
     * The data that should be transformed
     */
    public function __construct(
        public int $current_page,
        public int $from,
        public int $last_page,
        public int $path,
        public int $per_page,
        public int $to,
        public int $total,
        /** @var array<LinksData> */
        public array $links,
    ) {}
}
