<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Auth;

class WebController extends Controller
{
    //
    public function search(Request $request) {
        return view('search');
    }

    public function login(Request $request) {
        return view('login');
    }

    public function manage(Request $request) {
        if(Auth::check()) {
            return view('manage');
        } else {
            return view('login');
        }
    }

    public function insert(Request $request) {
        return view('insert');
    }
}
