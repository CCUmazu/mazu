<?php
namespace App\Objects;

use Auth;
use DB;

class Type
{
    static function get()
    {
        $typeData = DB::table('bookType')->get();
        return ['status' => 0, 'message' => 'get data ok.', 'typeData' => $typeData];
    }
}