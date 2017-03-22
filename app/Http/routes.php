<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', 'Auth\authController@signInView');

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/

Route::group(['prefix' => 'auth'], function() {
    Route::post('signIn', 'Auth\authController@signIn');
    Route::post('register', 'Auth\authController@register');
    Route::get('signOut', 'Auth\authController@signOut');

    Route::get('signIn', 'Auth\authController@signInView');
    Route::get('register', 'Auth\authController@registerView');
});