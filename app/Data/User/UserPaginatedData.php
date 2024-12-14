<?php

declare(strict_types=1);

namespace App\Data\User;

use App\Data\LinksData;
use App\Data\MetaData;
use Spatie\LaravelData\Data;

final class UserPaginatedData extends Data
{
    /** The data that should be transformed */
    public function __construct(
        /** @var array<UserData> */
        public array $data,
        public LinksData $links,
        public MetaData $meta,
    ) {}
}
