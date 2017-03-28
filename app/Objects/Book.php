<?php
namespace App\Objects;
use Illuminate\Support\Facades\Redirect;

use Auth;
use DB;

class Book
{
    static function get()
    {
        $bookData = DB::table('bookData')->get();
        return $bookData;
    }

    static function create($request)
    {
        foreach ($request->input() as $key => $value) {
            if($key == '_token') continue;
            $createData[$key] = $value;
        }
        if(Auth::check()) {
            $id = DB::table('bookData')->insertGetId($createData);
            return $id;
        } else {
            return response()->json(['status' => 1, 'message' => 'not sign in.']);
        }
    }

    static function update()
    {
        if(Auth::check()) {
            $bookData = DB::table('bookData')->get();
            return $bookData;
        } else {
            return response()->json(['status' => 1, 'message' => 'not sign in.']);
        }
    }

    static function delete($id)
    {
        if(Auth::check()) {
            $bookData = DB::table('bookData')->get();
            return $bookData;
        } else {
            return response()->json(['status' => 1, 'message' => 'not sign in.']);
        }
    }
}
