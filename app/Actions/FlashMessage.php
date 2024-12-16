<?php

declare(strict_types=1);

namespace App\Actions;

final readonly class FlashMessage
{
    public function __construct(
        private readonly string $type,
        private readonly string $message,
    ) {}

    public function execute(): void
    {
        session()->flash('type', $this->type);
        session()->flash('message', $this->message);
    }
}
