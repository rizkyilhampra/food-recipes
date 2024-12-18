<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Actions\FlashMessage;
use App\Http\Requests\IngredientRequest;
use App\Http\Resources\IngredientCollection;
use App\Models\Ingredient;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Inertia\ResponseFactory;

final class IngredientController
{
    public function index(): Response|ResponseFactory
    {
        $ingredients = IngredientCollection::make(
            (new Ingredient())->getPaginated()
        );

        return inertia('Ingredient/Index', compact('ingredients'));
    }

    public function create(): Response|ResponseFactory
    {
        return inertia('Ingredient/Create');
    }

    public function store(IngredientRequest $request): RedirectResponse
    {
        $ingredient = Ingredient::query()->create($request->validated());

        (new FlashMessage(
            'success',
            'Ingredient named '.$ingredient->name.' created'
        ))->execute();

        return to_route('ingredients.index');
    }

    public function show(Ingredient $ingredient): Response|ResponseFactory
    {
        // TODO: Getting recipe for ingredient

        return inertia('Ingredient/Show', compact('ingredient'));
    }

    public function edit(Ingredient $ingredient): Response|ResponseFactory
    {
        return inertia('Ingredient/Edit', compact('ingredient'));
    }

    public function update(IngredientRequest $request, Ingredient $ingredient): RedirectResponse
    {
        $ingredient->update($request->validated());

        (new FlashMessage(
            'success',
            'Ingredient named '.$ingredient->name.' updated'
        ))->execute();

        return to_route('ingredients.index');
    }

    public function destroy(Ingredient $ingredient): RedirectResponse
    {
        $ingredient->delete();

        (new FlashMessage(
            'success',
            'Ingredient named '.$ingredient->name.' deleted'
        ))->execute();

        return to_route('ingredients.index');
    }
}
