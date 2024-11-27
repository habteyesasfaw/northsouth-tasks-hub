<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\TaskList;
use Illuminate\Http\Request;
use App\Http\Resources\TaskResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\TaskStoreRequest;
use App\Http\Requests\TaskUpdateRequest;

class TaskController extends Controller
{
    // Fetch all tasks in a specific task list
    public function index(Request $request)
    {
        // Fetch the 'per_page' value from the request, default to 10 if not provided
        $perPage = $request->input('per_page', 10);
    
        // Get the IDs of task lists associated with the authenticated user
        $taskListIds = auth()->user()->taskLists()->pluck('id');
    
        // Fetch tasks for the authenticated user only, and filter by task list
        $tasks = Task::whereIn('task_list_id', $taskListIds) // Ensure task belongs to one of the user's task lists
            ->paginate($perPage);
    
        // Return paginated data using the TaskResource collection
        return TaskResource::collection($tasks);
    }

    // Store a new task in a specific task list
    public function store(TaskStoreRequest $request, TaskList $taskList)
    {
        $task = $taskList->tasks()->create($request->validated());
        return new TaskResource($task);
    }

    // Show a specific task from a task list
    public function show(TaskList $taskList, Task $task)
    {
        // Ensure the task is part of the given task list
        if ($taskList->id !== $task->task_list_id) {
            return response()->json(['error' => 'Task not found in this task list'], 404);
        }

        return new TaskResource($task);
    }

    // Update a specific task in a task list
    public function update(TaskUpdateRequest $request, TaskList $taskList, Task $task)
    {
        // Ensure the task is part of the given task list
        if ($taskList->id !== $task->task_list_id) {
            return response()->json(['error' => 'Task not found in this task list'], 404);
        }

        $task->update($request->validated());
        return new TaskResource($task);
    }

    // Delete a specific task from a task list
    public function destroy(TaskList $taskList, Task $task)
    {
        // Ensure the task is part of the given task list
        if ($taskList->id !== $task->task_list_id) {
            return response()->json(['error' => 'Task not found in this task list'], 404);
        }

        $task->delete();
        return response()->json(['message' => 'Task deleted successfully']);
    }
}
