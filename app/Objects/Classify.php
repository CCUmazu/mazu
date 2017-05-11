<?php
namespace App\Objects;

use Auth;
use DB;

class Classify
{
    static function get()
    {
        $classifyData = DB::table('bookClassification')->get();
        return ['status' => 0, 'message' => 'get data ok.', 'classifyData' => $classifyData];
    }

    static function create($bookId, $classificationData)
    {
        $typeId = $classificationData['typeId'];
        foreach ($classificationData['classification'] as $key => $value) {
            DB::table('bookClassification')->insertGetId(['bookId' => $bookId, 'typeId' => $typeId, 'categoryId' => $value]);
        }
    }

    static function delete($bookId)
    {
        DB::table('bookClassification')->where('bookId', '=', $bookId)->delete();
    }
}