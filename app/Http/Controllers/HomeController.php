<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\UserCollection;
use App\Models\User;
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
            ->when($request->has('search'), function ($query) use ($request) {
                $query->where('name', 'like', '%'.$request->input('search').'%');
            })
            ->latest()
            ->paginate(5)
            ->withQueryString();

        return inertia('home', [
            'users' => new UserCollection($users),
            'search' => $request->input('search'),
        ]);
    }
}
