<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\TaskList;
use Illuminate\Http\Request;
use App\Models\TaskListShare;
use App\Http\Resources\TaskListShareResource;
use App\Http\Requests\TaskListShareStoreRequest;
use App\Http\Requests\TaskListShareUpdateRequest;

class TaskListShareController extends Controller
{
    // Fetch all task lists shared with the authenticated user
    public function index()
    {
        $sharedTaskLists = auth()->user()->sharedTaskLists; // Fetch task lists shared with the authenticated user
        return TaskListShareResource::collection($sharedTaskLists);
    }

    // Store a new task list share
    public function store(TaskListShareStoreRequest $request)
    {
        $taskListShare = TaskListShare::create($request->validated());
        return new TaskListShareResource($taskListShare);
    }

    // Show a specific task list share
    public function show(TaskListShare $taskListShare)
    {
        return new TaskListShareResource($taskListShare);
    }

    // Update a specific task list share
    public function update(TaskListShareUpdateRequest $request, TaskListShare $taskListShare)
    {
        $taskListShare->update($request->validated());
        return new TaskListShareResource($taskListShare);
    }

    // Delete a specific task list share
    public function destroy(TaskListShare $taskListShare)
    {
        $taskListShare->delete();
        return response()->json(['message' => 'Task list share removed successfully']);
    }

    // Custom route to share a task list with another user
    public function share(Request $request, TaskList $taskList)
    {
        // Validate shared user exists
        $sharedUser = User::find($request->shared_with_user_id);

        if (!$sharedUser) {
            return response()->json(['error' => 'User not found'], 404);
        }

        // Create the share entry
        $taskListShare = $taskList->shares()->create([
            'shared_with_user_id' => $request->shared_with_user_id,
            'permission' => $request->permission,
        ]);

        return new TaskListShareResource($taskListShare);
    }
}
