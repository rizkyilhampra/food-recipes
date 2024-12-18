<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Actions\Category\CreateCategory;
use App\Actions\Category\DeleteCategory;
use App\Actions\Category\UpdateCategory;
use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryCollection;
use App\Models\Category;

final class CategoryController
{
    public function index()
    {
        $categories = CategoryCollection::make((new Category())->getPaginated());

        return inertia('Category/Index', compact('categories'));
    }

    public function create()
    {
        return inertia('Category/Create');
    }

    public function store(CategoryRequest $request)
    {
        (new CreateCategory($request->validated()))->execute();

        return redirect()->route('categories.index');
    }

    public function show(Category $category)
    {
        return inertia('Category/Detail', compact('category'));
    }

    public function edit(Category $category)
    {
        return inertia('Category/Edit', compact('category'));
    }

    public function update(CategoryRequest $request, Category $category)
    {
        (new UpdateCategory($category, $request->validated()))->execute();

        return redirect()->route('categories.index');
    }

    public function destroy(Category $category)
    {
        (new DeleteCategory($category))->execute();

        return redirect()->route('categories.index');
    }
}
