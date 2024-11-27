<?php

namespace App\Http\Controllers;

use App\Models\TaskList;
use Illuminate\Http\Request;
use App\Http\Resources\TaskListResource;
use App\Http\Requests\StoreTaskListRequest;
use App\Http\Requests\TaskListStoreRequest;
use App\Http\Requests\TaskListUpdateRequest;
use App\Http\Requests\UpdateTaskListRequest;

class TaskListController extends Controller
{
    // Fetch all task lists for the authenticated user
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $taskLists = auth()->user()->taskLists()->with('tasks')->paginate($perPage); // Fetch task lists with tasks of the authenticated user
        return TaskListResource::collection($taskLists);
    }

    // Store a new task list
    public function store(TaskListStoreRequest $request)
    {
        $taskList = auth()->user()->taskLists()->create($request->validated());
        return new TaskListResource($taskList);
    }

    // Show a specific task list
    public function show(TaskList $taskList)
    {
        // Ensure the authenticated user owns the task list
        if ($taskList->user_id !== auth()->id()) {
            return response()->json(['error' => 'Task list not found'], 404);
        }

        // Load the tasks relationship
        $taskList->load('tasks');

        return new TaskListResource($taskList);
    }

    // Update a specific task list
    public function update(TaskListUpdateRequest $request, TaskList $taskList)
    {
        // Ensure the authenticated user owns the task list
        if ($taskList->user_id !== auth()->id()) {
            return response()->json(['error' => 'Task list not found'], 404);
        }

        $taskList->update($request->validated());
        // Load the tasks relationship
        $taskList->load('tasks');
        return new TaskListResource($taskList);
    }

    // Delete a specific task list
    public function destroy(TaskList $taskList)
    {
        // Ensure the authenticated user owns the task list
        if ($taskList->user_id !== auth()->id()) {
            return response()->json(['error' => 'Task list not found'], 404);
        }

        $taskList->delete();
        return response()->json(['message' => 'Task list deleted successfully']);
    }
}
