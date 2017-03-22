<?php
namespace App\Http\Controllers\Auth;

//use App\User;
use Validator;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;
use Illuminate\Support\Facades\Redirect;


/*
* the new use
*/
use Auth;
use DB;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Http\Request;


class authController extends Controller
{
    use AuthenticatesAndRegistersUsers;

    protected $redirectPath = '/check';
    protected $username = 'account';

    public function __construct()
    {
        //$this->middleware('guest', ['except' => 'getLogout']);
        //$this->middleware($this->guestMiddleware(), ['except' => ['logout', 'signInView']]);
       /*$this->auth = $auth;
       $this->registrar = $registrar;
       $this->middleware('guest', ['except' => 'getLogout']);*/
    }

    public function signInView()
    {
        return view('auth/signIn');
    }

    public function registerView()
    {
        return view('auth/register');
    }

    public function register(Request $request)
    {
        $account_data['account'] = $request->input('account');
        $account_data['name'] = $request->input('name');
        $account_data['password'] = bcrypt($request->input('password'));
        DB::table('users')->insert($account_data);

        //return response()->json(['status' => 0]);
        return Redirect::to('/');
    }

    public function signIn(Request $request)
    {
        if(Auth::attempt([
            'account' => $request->input('account'),
            'password' => $request->input('password')
        ], $request->input('remember'))) {
            Auth::user()->types = 1;
            return 0;
            /*if(Auth::check()) return Redirect::to('/');
            else return 0;*/
        } else {
            return 1;
        }
    }

    public function signOut()
    {
        Auth::logout();
        return Redirect::to('/');
    }
}
