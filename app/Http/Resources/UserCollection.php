<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Data\UserData;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

final class UserCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return UserData::collect($this->collection)->toArray();
    }
}
