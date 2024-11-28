<?php

namespace Database\Seeders;

use App\Models\TaskList;
use Illuminate\Database\Seeder;

class TaskListSeeder extends Seeder
{
    public function run()
    {
        // Seed task lists for two users (user 1 and user 2)
        for ($i = 1; $i <= 10; $i++) {
            TaskList::create([
                'name' => 'Task List ' . $i,
                'description' => "description" . $i,
                'user_id' => rand(1, 2), // Randomly assign task list to user 1 or user 2
            ]);
        }
    }
}
