<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

/*
 * new use
 */
use App\Objects\Category;
use App\Objects\Type;
use App\Objects\Classify;
use App\Objects\Book;

class WebController extends Controller
{
    //
    public function search(Request $request) {
        $types = Type::Get();
        $categories = Category::Get();
        $classify = Classify::Get();
        $books = Book::Get();

        return view('search')
            ->with('books', $books['bookData'])
            ->with('types', $types['typeData'])
            ->with('categories', $categories['categoryData'])
            ->with('classify', $classify['classifyData']);
    }

    public function login(Request $request) {
        return view('login');
    }

    public function manage(Request $request) {
        $types = Type::Get();
        $categories = Category::Get();
        $classify = Classify::Get();
        $books = Book::Get();

        return view('manage')
            ->with('books', $books['bookData'])
            ->with('types', $types['typeData'])
            ->with('categories', $categories['categoryData'])
            ->with('classify', $classify['classifyData']);
    }
}
