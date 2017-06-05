<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

/*
 * new use
 */
use App\Objects\Category;
use App\Objects\Type;

class WebController extends Controller
{
    //
    public function search(Request $request) {
        $types = Type::Get();
        $categories = Category::Get();

        return view('search')
            ->with('types', $types['typeData'])
            ->with('categories', $categories['categoryData']);
    }

    public function login(Request $request) {
        return view('login');
    }

    public function manage(Request $request) {
        $types = Type::Get();
        $categories = Category::Get();

        return view('manage')
            ->with('types', $types['typeData'])
            ->with('categories', $categories['categoryData']);
    }
}
