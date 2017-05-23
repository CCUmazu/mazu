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
use Illuminate\Support\Facades\Storage;

class testController extends Controller
{
    public function test()
    {
        $data = Category::get();
        return view('test/book')->with('category', $data['categoryData']);
    }

    public function writeFile()
    {
        $data = "TY  - JOUR\nTI  - aASDFASDFASDF\nAU  - 蔣宜桓\nAB  - An Einstein nilradical is a nilpotent Lie algebra which can be the nilradical of a metric Einstein solvable Lie algebra. The classification of Riemannian Einstein solvmanifolds (possibly, of all noncompact homogeneous Einstein spaces) can be reduced to determining which nilpotent Lie algebras are Einstein nilradicals and to finding, for every Einstein nilradical, its Einstein metric solvable extension. For every nilpotent Lie algebra, we construct an (essentially unique) derivation, the pre-Einstein derivation, the solvable extension by which may carry an Einstein inner product. Using the pre-Einstein derivation, we then give a variational characterization of Einstein nilradicals. As an application, we prove an easy-to-check convex geometry condition for a nilpotent Lie algebra with a nice basis to be an Einstein nilradical and also show that a typical two-step nilpotent Lie algebra is an Einstein nilradical.\nC1  - Full publication date: AUGUST 2011\nEP  - 3958\nIS  - 8\nPB  - American Mathematical Society\nPY  - 2011\nSN  - 00029947\nSP  - 3935\nT2  - Transactions of the American Mathematical Society\nUR  - http://www.jstor.org/stable/23032205\nVL  - 363\nER  - ";
        Storage::disk('local')->delete('/public/ris/3.ris');
        Storage::disk('local')->put('/public/ris/3.ris', $data);
    }

    public function downloadFile()
    {
        $path = storage_path('/app/public/ris/3.ris');
        return response()->download($path);
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