<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

/**
 * @property string $name
 */
final class Ingredient extends Model
{
    /** @use HasFactory<\Database\Factories\IngredientFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = ['name'];

    public function getPaginated(int $perPage = 10): LengthAwarePaginator
    {
        return $this->query()->latest()->paginate($perPage);
    }

    /**
     * Define an accessor for the "name" attribute.
     */
    protected function name(): Attribute
    {
        return Attribute::make(get: fn (string $value) => str()->apa($value));
    }
}
