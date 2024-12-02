<?php

declare(strict_types=1);

namespace App\Http\Controllers;

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
        return inertia('Home');
    }
}
