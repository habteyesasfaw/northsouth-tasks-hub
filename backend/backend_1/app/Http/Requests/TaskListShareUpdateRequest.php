<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TaskListShareUpdateRequest extends FormRequest
{
    public function authorize()
    {
        // Authorization logic, can be customized for user roles
        return true;
    }

    public function rules()
    {
        return [
            'permission' => 'required|in:view,edit', // Permission can be 'view' or 'edit'
        ];
    }

    public function messages()
    {
        return [
            'permission.in' => 'The permission must be either "view" or "edit".',
        ];
    }
}
