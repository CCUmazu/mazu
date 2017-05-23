<?php
namespace App\Http\Controllers;
/*
* the new use
*/
use App\Objects\Type;

class TypeController extends Controller
{
    public function getOne($id)
    {
        $typeData = Type::getOne($id);
        return $typeData;
    }

    public function get()
    {
        $typeData = Type::get();
        return $typeData;
    }
}