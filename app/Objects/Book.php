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
        return response()->json(['status' => 0, 'message' => 'get data ok.', 'bookData' => $bookData]);;
    }

    static function create($request)
    {
        if(Auth::check()) {
            foreach ($request->input() as $key => $value) {
                if($key == '_token') continue;
                $createData[$key] = $value;
            }

            $id = DB::table('bookData')->insertGetId($createData);
            $returnData = DB::table('bookData')->where('id', $id)->get();
            return response()->json(['status' => 0, 'message' => 'create data ok.', 'createdBookData' => $returnData]);
        } else {
            return response()->json(['status' => 1, 'message' => 'not sign in.']);
        }
    }

    static function update($request)
    {
        if(Auth::check()) {
            $updateData = array();
            $id = -1;
            foreach ($request->input() as $key => $value) {
                preg_match("/_token/", $key, $matches);
                if($key == 'id') $id = $value;
                else if(!empty($matches[0])) continue;
                else $updateData[$key] = $value;
            }

            DB::table('bookData')->where('id', $id)->update($updateData);
            $returnData = DB::table('bookData')->where('id', $id)->get();
            return response()->json(['status' => 0, 'message' => 'update data ok.', 'updatedBookData' => $returnData]);
        } else {
            return response()->json(['status' => 1, 'message' => 'not sign in.']);
        }
    }

    static function delete($id)
    {
        if(Auth::check()) {
            DB::table('bookData')->where('id', $id)->delete();
            return response()->json(['status' => 0, 'message' => 'delete data ok.']);
        } else {
            return response()->json(['status' => 1, 'message' => 'not sign in.']);
        }
    }
}
