<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Data\CategoryData;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

final class CategoryCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return CategoryData::collect($this->collection)->toArray();
    }
}
