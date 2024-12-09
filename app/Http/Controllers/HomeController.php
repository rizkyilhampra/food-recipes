<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\UserCollection;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\ResponseFactory;

final class HomeController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): Response|ResponseFactory
    {
        /** @var string $search */
        $search = $request->input('search', '');
        /** @var string $sort */
        $sort = $request->input('sort', '');
        /** @var string $order */
        $order = $request->input('order', 'ascending') === 'ascending' ? 'asc' : 'desc';

        $users = User::query()
            ->when($search, fn (Builder $query) => $query->where('name', 'like', "%{$search}%"))
            ->when($sort, fn (Builder $query) => $query->orderBy($sort, $order), fn (Builder $query) => $query->latest())
            ->paginate(5)
            ->appends($request->only('search', 'sort', 'order'));

        return inertia('home', [
            'users' => new UserCollection($users),
            'search' => $search,
            'sort' => $sort,
            'order' => $request->input('order', 'ascending'),
        ]);
    }
}
