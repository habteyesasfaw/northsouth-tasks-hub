<?php

use Illuminate\Support\Facades\Route;

// Root endpoint for debugging
Route::get('/', function () {
    return response()->json(['message' => 'Welcome to the Laravel API'], 200);
});
