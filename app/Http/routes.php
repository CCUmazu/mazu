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

Route::group(['middleware' => 'web'], function() {
    Route::get('/', 'Auth\authController@signInView');

    Route::group(['prefix' => 'auth'], function() {
        Route::post('signIn', 'Auth\authController@signIn');
        // Route::post('register', 'Auth\authController@register');
        Route::get('signOut', 'Auth\authController@signOut');
    });

    Route::group(['prefix' => 'api'], function() {
        Route::group(['prefix' => 'book'], function() {
            Route::get('get/{id}', 'BookController@getOne');
            Route::get('getAll', 'BookController@get');
            Route::post('create', 'BookController@create');
            Route::post('update', 'BookController@update');
            Route::post('delete', 'BookController@delete');
        });

        Route::group(['prefix' => 'type'], function() {
            Route::get('getAll', 'TypeController@get');
        });

        Route::group(['prefix' => 'category'], function() {
            Route::get('getAll', 'CategoryController@get');
        });

        Route::group(['prefix' => 'classify'], function() {
            Route::get('getAll', 'ClassifyController@get');
        });

        Route::group(['prefix' => 'download'], function() {
            Route::get('ris/{id}', 'DownloadController@ris');
        });
    });

    // just for test
    Route::group(['prefix' => 'test'], function() {
        Route::get('/', 'testController@test');
        Route::get('signIn', 'testController@signInView');
        Route::get('writeFile', 'testController@writeFile');
        Route::get('downloadFile', 'testController@downloadFile');
        // Route::get('register', 'testController@registerView');
    });

    // manager
    Route::group(['prefix' => 'manager'], function() {
        Route::get('/', 'WebController@login');
        Route::get('/manage', 'WebController@manage');
    });
});

// Guests
Route::get('/', 'WebController@search');
