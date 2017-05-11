<?php
namespace App\Http\Controllers;
/*
* the new use
*/
use App\Objects\Category;

class CategoryController extends Controller
{
    public function get()
    {
        $categoryData = Category::get();
        return $categoryData;
    }
}