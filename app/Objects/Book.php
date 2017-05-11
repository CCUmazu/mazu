<?php
namespace App\Objects;

use Auth;
use DB;
use App\Objects\Classify;

class Book
{
    static function get()
    {
        $bookData = DB::table('bookData')->get();
        return ['status' => 0, 'message' => 'get data ok.', 'bookData' => $bookData];
    }

    static function create($request)
    {
        if(Auth::check()) {
            foreach ($request->input() as $key => $value) {
                if($key == '_token') continue;
                else if($key == 'bookClassification') $classificationData = $value;
                else $createData[$key] = $value;
            }

            if(!empty($createData)) {
                $id = DB::table('bookData')->insertGetId($createData);
                if(!empty($classificationData)) {
                    Classify::create($id, $classificationData);
                }
                $returnData = DB::table('bookData')->where('id', $id)->get();
                return ['status' => 0, 'message' => 'create data ok.', 'createdBookData' => $returnData];
            } else {
                return ['status' => 0, 'message' => 'input empty.'];
            }
        } else {
            return ['status' => 1, 'message' => 'not sign in.'];
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
                else if($key == 'bookClassification') $classificationData = $value;
                else $updateData[$key] = $value;
            }

            DB::table('bookData')->where('id', $id)->update($updateData);
            if(!empty($classificationData)) {
                Classify::delete($id);
                Classify::create($id, $classificationData);
            }
            $returnData = DB::table('bookData')->where('id', $id)->get();
            return ['status' => 0, 'message' => 'update data ok.', 'updatedBookData' => $returnData];
        } else {
            return ['status' => 1, 'message' => 'not sign in.'];
        }
    }

    static function delete($id)
    {
        if(Auth::check()) {
            DB::table('bookData')->where('id', $id)->delete();
            Classify::delete($id);
            return ['status' => 0, 'message' => 'delete data ok.'];
        } else {
            return ['status' => 1, 'message' => 'not sign in.'];
        }
    }
}
