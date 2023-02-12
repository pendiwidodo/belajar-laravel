<?php

use App\Http\Controllers\content;
use App\Models\content as ModelsContent;
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

Route::get('/', function () {
    return view('home',[
        "title"=>"Home"
    ]);
});

Route::get('/produk', function () {
    return view('produk',[
        "title"=>"Produk"
    ]);
});

Route::get('/contents', [content::class, 'index']);
// Route::get('map', [content::class, 'indextojson']);
Route::get('/content/{content:slug_content}', [content::class, 'show']);


