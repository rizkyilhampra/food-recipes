<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use Inertia\Response;
use Inertia\ResponseFactory;

final class AuthenticatedSessionController
{
    /**
     * Display the login view.
     */
    public function create(): Response|ResponseFactory
    {
        return inertia('auth/login');
    }
}
