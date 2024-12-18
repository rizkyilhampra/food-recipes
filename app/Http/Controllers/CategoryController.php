<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Actions\Category\CreateCategory;
use App\Actions\Category\DeleteCategory;
use App\Actions\Category\UpdateCategory;
use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryCollection;
use App\Models\Category;
use Illuminate\Http\RedirectResponse;

final class CategoryController
{
    public function index(): \Inertia\ResponseFactory|\Inertia\Response
    {
        $categories = CategoryCollection::make((new Category())->getPaginated());

        return inertia('Category/Index', compact('categories'));
    }

    public function create(): \Inertia\ResponseFactory|\Inertia\Response
    {
        return inertia('Category/Create');
    }

    public function store(CategoryRequest $request): RedirectResponse
    {
        (new CreateCategory($request->validated()))->execute();

        return to_route('categories.index');
    }

    public function show(Category $category): \Inertia\ResponseFactory|\Inertia\Response
    {
        return inertia('Category/Detail', compact('category'));
    }

    public function edit(Category $category): \Inertia\ResponseFactory|\Inertia\Response
    {
        return inertia('Category/Edit', compact('category'));
    }

    public function update(CategoryRequest $request, Category $category): RedirectResponse
    {
        (new UpdateCategory($category, $request->validated()))->execute();

        return to_route('categories.index');
    }

    public function destroy(Category $category): RedirectResponse
    {
        (new DeleteCategory($category))->execute();

        return to_route('categories.index');
    }
}
