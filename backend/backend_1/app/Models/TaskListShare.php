<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskListShare extends Model
{
    use HasFactory;

    protected $fillable = ['task_list_id', 'shared_with_user_id', 'permission'];

    // Relationship with TaskList
    public function taskList()
    {
        return $this->belongsTo(TaskList::class);
    }

    // Relationship with the user the task list is shared with
    public function sharedWithUser()
    {
        return $this->belongsTo(User::class, 'shared_with_user_id');
    }
}
