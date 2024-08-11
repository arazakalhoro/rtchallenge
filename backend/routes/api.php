<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
//Auth Routes
Route::group(['prefix' => 'users','middleware' => 'auth:api'], function() {
    Route::get('profile', [UserController::class, 'profile']);
    Route::put('update-password', [UserController::class, 'updatePassword']);
    Route::put('update-details', [UserController::class, 'updateDetails']);

});
Route::group(['prefix' => 'auth'], function() {
    Route::post('signup', [AuthController::class, 'signUp']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('reset-password', [AuthController::class, 'resetPassword']);
    Route::group(['middleware' => 'auth:api'], function (){
        Route::post('logout', [AuthController::class, 'logout']);
        Route::post('refresh', [AuthController::class, 'refresh']);
    });
});
//Task Routes
Route::group(['prefix' => 'tasks'], function (){
    Route::get('/', [TaskController::class, 'index']);
    Route::post('/', [TaskController::class, 'store']);
    Route::get('/{id}', [TaskController::class, 'show']);
    Route::put('/{id}', [TaskController::class, 'update']);
    Route::delete('/{id}', [TaskController::class, 'destroy']);
})->middleware(\App\Http\Middleware\AuthenticateWithJwt::class);
