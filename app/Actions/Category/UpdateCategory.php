<?php

declare(strict_types=1);

namespace App\Actions\Category;

use App\Actions\FlashMessage;
use App\Models\Category;

final readonly class UpdateCategory
{
    public function __construct(
        private readonly Category $category,
        /** @var array<string, mixed> */
        private readonly array $data,
    ) {}

    public function execute(): void
    {
        $this->category->update($this->data);

        (new FlashMessage(
            'success',
            'Category named '.$this->category->name.' updated successfully.'
        ))->execute();
    }
}
