<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

final class Category extends Model
{
    /** @use HasFactory<\Database\Factories\CategoryFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'description',
    ];

    /**
     * Define an accessor for the "name" attribute.
     */
    protected function name(): Attribute
    {
        return Attribute::make(get: fn (string $value) => str()->apa($value));
    }

    public function getPaginated(int $perPage = 10): LengthAwarePaginator
    {
        return $this->query()->latest()->paginate($perPage);
    }
}
