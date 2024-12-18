<?php

declare(strict_types=1);

namespace App\Actions\Category;

use App\Actions\FlashMessage;
use App\Models\Category;

final readonly class CreateCategory
{
    public function __construct(
        /** @var array<string, mixed> */
        private readonly array $data,
    ) {}

    public function execute(): void
    {
        $category = Category::query()->create($this->data);

        (new FlashMessage(
            'success',
            'Category named '.$category->name.' created successfully.'
        ))->execute();
    }
}
