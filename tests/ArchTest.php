<?php

declare(strict_types=1);

arch()->preset()->php();
arch()->preset()->laravel();
arch('strict types')
    ->expect('App')
    ->toUseStrictTypes();

arch('avoid open for extension')
    ->expect('App')
    ->classes()
    ->toBeFinal()
    ->ignoring([]);

arch('ensure no extends')
    ->expect('App')
    ->classes()
    ->not->toBeAbstract()
    ->ignoring([
        'App\Http\Resources',
    ]);

arch('avoid inheritance')
    ->expect('App')
    ->classes()
    ->toExtendNothing()
    ->ignoring([
        'App\Console\Commands',
        'App\Http\Resources',
        'App\Exceptions',
        'App\Http\Requests',
        'App\Jobs',
        'App\Livewire',
        'App\Mail',
        'App\Models',
        'App\Notifications',
        'App\Providers',
        'App\View',
        'App\Http\Middleware',
        'App\Data',
    ]);

arch('annotations')
    ->expect('App')
    ->toHavePropertiesDocumented();
