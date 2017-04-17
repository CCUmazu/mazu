<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

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
        return view('manage');
    }
}
