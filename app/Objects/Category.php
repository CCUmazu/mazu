<?php
namespace App\Objects;

use Auth;
use DB;

class Category
{
    static function get()
    {
        $categoryData = DB::table('bookCategory')->get();
        return ['status' => 0, 'message' => 'get data ok.', 'categoryData' => $categoryData ];
    }
}