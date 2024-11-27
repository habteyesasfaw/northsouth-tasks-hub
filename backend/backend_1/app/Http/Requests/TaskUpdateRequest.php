<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TaskUpdateRequest extends FormRequest
{
    public function authorize()
    {
        // Authorization logic, can be customized for user roles
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:pending,completed',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Task name is required.',
            'status.in' => 'Status must be either "pending" or "completed".',
        ];
    }
}
