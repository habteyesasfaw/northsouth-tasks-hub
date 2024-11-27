<?php

namespace Database\Seeders;

use App\Models\Task;
use App\Models\TaskList;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    public function run()
    {
        // Seed tasks for each task list
        $taskLists = TaskList::all();

        foreach ($taskLists as $taskList) {
            for ($i = 1; $i <= 10; $i++) {
                Task::create([
                    'name' => 'Task ' . $i,
                    'description' => 'Description for Task ' . $i,
                    'status' => 'pending', // All tasks are set as pending initially
                    'task_list_id' => $i,
                ]);
            }
        }
    }
}
