<?php

namespace Database\Seeders;

use App\Models\TaskList;
use App\Models\TaskListShare;
use App\Models\User;
use Illuminate\Database\Seeder;

class TaskListShareSeeder extends Seeder
{
    public function run()
    {
        // Seed task list shares for two users
        $taskLists = TaskList::all();

        foreach ($taskLists as $taskList) {
            // Share each task list with another user
            $sharedUser = User::where('id', '!=', $taskList->user_id)->inRandomOrder()->first();

            TaskListShare::create([
                'task_list_id' => $taskList->id,
                'shared_with_user_id' => $sharedUser->id,
                'permission' => 'view', // Can adjust permission (view/edit)
            ]);
        }
    }
}
