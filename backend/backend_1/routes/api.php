<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TaskListController;
use App\Http\Controllers\TaskListShareController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

// Public Routes (No Authentication Required)

// Register a new user
Route::post('/register', [RegisteredUserController::class, 'store']);

// Log in and get an API token
Route::post('/login', [AuthenticatedSessionController::class, 'store']);

// API Routes
Route::middleware(['auth:sanctum'])->group(function () {
    // Fetch authenticated user details
    Route::apiResource('users', UserController::class);

    // Task List Routes
    Route::apiResource('task-lists', TaskListController::class);

    // Task Routes (Nested under Task List)
    Route::apiResource('tasks', TaskController::class);

    // Task List Share Routes
    Route::apiResource('task-list-shares', TaskListShareController::class);

    // Additional Routes for Sharing Functionality
    Route::post('task-list-shares/{taskList}/share', [TaskListShareController::class, 'share'])
        ->name('task-list-shares.share'); // Custom route for sharing task lists
});