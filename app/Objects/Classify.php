<?php
namespace App\Objects;

use Auth;
use DB;

class Classify
{
    static function get()
    {
        return DB::table('bookClassification')->get();
    }

    static function create($bookId, $classificationData)
    {
        foreach ($classificationData as $key => $value) {
            DB::table('bookClassification')->insertGetId(['bookId' => $bookId, 'categoryId' => $value]);
        }
    }

    static function delete($bookId)
    {
        DB::table('bookClassification')->where('bookId', '=', $bookId)->delete();
    }
}