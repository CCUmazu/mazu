<?php
namespace App\Http\Controllers;
/*
* the new use
*/
use App\Objects\Classify;

class ClassifyController extends Controller
{
    public function get()
    {
        $classifyData = Classify::get();
        return $classifyData;
    }
}