<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\User as SocialiteUser;

use function Pest\Laravel\assertDatabaseCount;
use function Pest\Laravel\get;

beforeEach(function () {
    Mockery::close();
});

it('shows the login page', function () {
    $response = get('/login');
    $response->assertStatus(200)
        ->assertInertia(function ($page) {
            return $page->component('Auth/Login');
        });
});

it('redirects to Google OAuth when initiating Google login', function () {
    $response = get(route('login.google'));
    $response->assertRedirectContains('https://accounts.google.com/o/oauth2/auth');
});

it('creates a new user and logs in when authenticating with Google for the first time', function () {
    $user = [
        'email' => 'rizkyilhamp16@gmail.com',
        'name' => 'Rizky Ilham',
    ];

    $mockSocialiteUser = Mockery::mock(SocialiteUser::class);
    $mockSocialiteUser->shouldReceive('getEmail')->andReturn($user['email']);
    $mockSocialiteUser->shouldReceive('getName')->andReturn($user['name']);

    $socialiteProvider = Mockery::mock(Laravel\Socialite\Two\GoogleProvider::class);
    $socialiteProvider->shouldReceive('user')->once()->andReturn($mockSocialiteUser);
    Socialite::shouldReceive('driver')->with('google')->once()->andReturn($socialiteProvider);

    $response = get(route('login.google.callback'));

    $user = User::where('email', $user['email'])->first();
    assertDatabaseCount('users', 1);
    expect($user)->not()->toBeNull();
    expect(Auth::user()->id)->toBe($user->id);

    $response->assertRedirect(route('home'));
});

it('logs in existing user when authenticating with Google', function () {
    $user = User::factory()->create([
        'email' => 'rizkyilhamp16@gmail.com',
        'name' => 'Rizky Ilham',
    ]);

    $mockSocialiteUser = Mockery::mock(SocialiteUser::class);
    $mockSocialiteUser->shouldReceive('getEmail')->andReturn($user->email);
    $mockSocialiteUser->shouldReceive('getName')->andReturn($user->name);

    $socialiteProvider = Mockery::mock(Laravel\Socialite\Two\GoogleProvider::class);
    $socialiteProvider->shouldReceive('user')->once()->andReturn($mockSocialiteUser);
    Socialite::shouldReceive('driver')->with('google')->once()->andReturn($socialiteProvider);

    $response = get(route('login.google.callback'));

    expect(Auth::user()->id)->toBe($user->id);
    assertDatabaseCount('users', 1);

    $response->assertRedirect(route('home'));
});

it('handles Google authentication failure gracefully', function () {
    Socialite::shouldReceive('driver->user')
        ->once()
        ->andThrow(new Exception('Google authentication failed'));

    $response = get(route('login.google.callback'));

    $response->assertRedirect(route('login'))
        ->assertSessionHas('status', 'Unable to authenticate with Google. Please try again.');
});
