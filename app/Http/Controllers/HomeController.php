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
        $users = User::query()
            ->when($request->has('search'), function (Builder $query) use ($request) {
                /** @var string $search */
                $search = $request->input('search');
                $query->where('name', 'like', '%'.$search.'%');
            })
            ->latest()
            ->paginate(5)
            ->appends($request->only('search'));

        return inertia('home', [
            'users' => new UserCollection($users),
            'search' => $request->input('search'),
        ]);
    }
}
