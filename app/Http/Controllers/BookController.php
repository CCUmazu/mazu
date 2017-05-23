<?php
namespace App\Http\Controllers;

//use App\User;
use App\Objects\Category;
use Validator;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;
use Illuminate\Support\Facades\Redirect;
use App\Objects\Book;

/*
* the new use
*/
use Auth;
use DB;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Http\Request;


class BookController extends Controller
{
    public function getOne($id)
    {
        $bookData = Book::getOne($id);
        return $bookData;
    }

    public function get()
    {
        $bookData = Book::get();
        return $bookData;
    }

    public function create(Request $request)
    {
        if(Auth::check()) {
            $returnValue = Book::create($request);
            return $returnValue;
        } else {
            return response()->json(['status' => 1, 'message' => 'not sign in.']);
        }
    }

    public function update(Request $request)
    {
        if(Auth::check()) {
            $returnValue = Book::update($request);
            return $returnValue;
        } else {
            return response()->json(['status' => 1, 'message' => 'not sign in.']);
        }
    }

    public function delete(Request $request)
    {
        if(Auth::check()) {
            $returnValue = Book::delete($request->input('id'));
            return $returnValue;
        } else {
            return response()->json(['status' => 1, 'message' => 'not sign in.']);
        }
    }
}