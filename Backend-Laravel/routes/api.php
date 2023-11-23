<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
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


Route::post('auth/login', [AuthController::class, 'login']);

// rutas protegidas por JWT
Route::middleware('jwt.verify')->group(function(){
    Route::get('auth/index',[AuthController::class,'index']);
    Route::post('auth/register', [AuthController::class, 'create']);
    Route::put('auth/update/users/{user}', [AuthController::class,'update']);
    Route::delete('auth/delete/{user}', [AuthController::class,'destroy']);
    Route::post('auth/logout', [AuthController::class, 'logout']);
});
