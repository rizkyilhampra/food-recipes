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
    public function index(): Response|ResponseFactory
    {
        return inertia('auth/login', [
            'status' => session('status'),
        ]);
    }

    public function create(): RedirectResponse
    {
        return Socialite::driver('google')->redirect();
    }

    public function store()
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

    public function destroy(): RedirectResponse
    {
        auth('web')->logout();

        request()->session()->invalidate();

        request()->session()->regenerateToken();

        return redirect('/');
    }
}
