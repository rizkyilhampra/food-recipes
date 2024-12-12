<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;
use Inertia\Response;
use Inertia\ResponseFactory;
use Laravel\Socialite\Facades\Socialite;

final class AuthenticatedGoogleController
{
    /**
     * Display the login view.
     */
    public function index(): Response|ResponseFactory
    {
        return inertia('Auth/Login', [
            'status' => session('status'),
        ]);
    }

    /**
     * Redirect the user to the Google authentication page.
     */
    public function create(): \Symfony\Component\HttpFoundation\RedirectResponse
    {
        return Socialite::driver('google')->redirect();
    }

    /**
     * Obtain the user information from Google.
     */
    public function store(): RedirectResponse
    {
        try {
            $googleUser = Socialite::driver('google')->user();
        } catch (Exception) {
            return redirect()
                ->route('login')
                ->with('status', 'Unable to authenticate with Google. Please try again.');
        }

        $user = User::query()->firstOrCreate([
            'email' => $googleUser->getEmail(),
        ], [
            'name' => $googleUser->getName(),
            'password' => Hash::make(\Illuminate\Support\Str::random(32)),
            'email_verified_at' => now(),
        ]);

        auth('web')->login($user);

        session()->regenerate();

        return redirect()->intended(route('home', absolute: false));
    }

    /**
     * Log the user out of the application.
     */
    public function destroy(): RedirectResponse
    {
        auth('web')->logout();

        request()->session()->invalidate();

        request()->session()->regenerateToken();

        return redirect('/');
    }
}
