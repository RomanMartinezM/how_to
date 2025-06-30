<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SearchController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/getUsers', function (Request  $request) {    
    $connection = DB::connection('mongodb');
    $users = DB::collection('users')->get();
    // $msg = 'MongoDB is accessible!';
    $msg = $users;
    try {  
            $connection->command(['ping' => 1]);  
        } catch (\Exception  $e) {  
            $msg = 'MongoDB is not accessible. Error: ' . $e->getMessage();
        }
        return ['msg' => $msg];
});

Route::post('/searches', [SearchController::class, 'create'])->name('searches.create');
Route::get('/searches/most-recent', [SearchController::class, 'getMostRecentSearches'])->name('searches.getMostRecentSearches');
Route::get('/searches/most-querying-topics', [SearchController::class, 'getSearchTopicsMostQuerying'])->name('searches.getSearchTopicsMostQuerying');


// estas rutas se pueden acceder sin proveer de un token válido.
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);


// Route::post('/login', 'AuthController@login');
// Route::post('/register', 'AuthController@register');
// estas rutas requiren de un token válido para poder accederse.
// Route::group(['middleware' => 'auth.jwt'], function () {
    Route::group(['middleware' => ['jwt.verify']], function() {
// Route::group(['middleware' => JWTAuth], function () {
    // Route::post('/logout', 'AuthController@logout');
    Route::post('/logout', [AuthController::class, 'logout']);
});