<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientController;
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
//Route::post('auth/register', [AuthController::class, 'create']); // descomentar para registrar usuarios Admin


// rutas protegidas por JWT
Route::middleware('jwt.verify')->group(function(){

    Route::get('auth/user', [AuthController::class, 'index']);
    Route::post('auth/logout', [AuthController::class, 'logout']);

    //rutas clientes
    Route::get('auth/index/',[ClientController::class,'indexClient']);
    Route::post('auth/registerclient', [ClientController::class, 'createClient']);
    Route::put('auth/update/client/{client}', [ClientController::class,'updateClient']);
    Route::delete('auth/delete/client/{client}', [ClientController::class,'destroyClient']);
});
