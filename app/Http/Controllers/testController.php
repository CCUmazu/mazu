<?php
namespace App\Http\Controllers;

//use App\User;
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
use App\Objects\Category;
use App\Objects\Classification;

class testController extends Controller
{
    public function test()
    {
        $data = Category::get();
        return view('test/book')->with('category', $data['categoryData']);
    }

    public function signInView()
    {
        return view('auth/signIn');
    }

    public function registerView()
    {
        return view('auth/register');
    }

}