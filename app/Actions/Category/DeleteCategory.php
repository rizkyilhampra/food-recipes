<?php

declare(strict_types=1);

namespace App\Actions\Category;

use App\Actions\FlashMessage;
use App\Models\Category;

final readonly class DeleteCategory
{
    public function __construct(
        private readonly Category $category
    ) {}

    public function execute(): void
    {
        $this->category->delete();

        (new FlashMessage(
            'success',
            'Category named '.$this->category->name.' deleted successfully.'
        ))->execute();
    }
}
