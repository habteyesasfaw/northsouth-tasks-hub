<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;

// Public Routes (No Authentication Required)

// Register a new user
Route::post('/register', [RegisteredUserController::class, 'store']);

// Log in and get an API token
Route::post('/login', [AuthenticatedSessionController::class, 'store']);

// Protected Routes (Authentication Required)
Route::middleware('auth:sanctum')->group(function () {

    // Fetch authenticated user details
    Route::get('/user', [UserController::class, 'index']);

    // Example of an admin-only route using role middleware (if you have this setup)
    // If using spatie/laravel-permission or any custom role middleware, make sure to adjust this.
    Route::middleware('role:admin')->group(function () {
        Route::get('/admin', function () {
            return response()->json(['message' => 'Welcome, Admin!']);
        });
    });

    // Log out the user and invalidate the token
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);
});
