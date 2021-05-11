<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/Pdf_laporan', [
    \App\Http\Controllers\PacuJalurController::class, 'laporan'
]);

Route::get('/', [App\Http\Controllers\HomeController::class, 'index']);


Auth::routes();
Route::get('/{slug?}', [App\Http\Controllers\HomeController::class, 'index']);
Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
// Route::get('/home',function(){
//     return view('welcome');
// });