<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TaskListShareStoreRequest extends FormRequest
{
    public function authorize()
    {
        // Authorization logic, can be customized for user roles
        return true;
    }

    public function rules()
    {
        return [
            'task_list_id' => 'required|exists:task_lists,id', // Ensure task list exists
            'shared_with_user_id' => 'required|exists:users,id|different:user_id', // Ensure the user to share with exists and is not the same user
            'permission' => 'required|in:view,edit', // Permission can be 'view' or 'edit'
        ];
    }

    public function messages()
    {
        return [
            'shared_with_user_id.different' => 'You cannot share a task list with yourself.',
            'permission.in' => 'The permission must be either "view" or "edit".',
        ];
    }
}
