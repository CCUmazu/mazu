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


class testController extends Controller
{
    public function test()
    {
        return view('test/book');
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