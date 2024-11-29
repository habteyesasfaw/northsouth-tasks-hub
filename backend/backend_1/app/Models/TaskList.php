<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskList extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'name'];

    // Relationship with User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relationship with Tasks
    public function tasks()
    {
        return $this->belongsTo(Task::class);
    }

    // Relationship with TaskListShare
    public function shares()
    {
        return $this->hasMany(TaskListShare::class);
    }
}
