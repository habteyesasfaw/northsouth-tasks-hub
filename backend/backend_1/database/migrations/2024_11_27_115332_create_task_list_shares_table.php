<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTaskListSharesTable extends Migration
{
    public function up()
    {
        Schema::create('task_list_shares', function (Blueprint $table) {
            $table->id();
            $table->foreignId('task_list_id')->constrained()->cascadeOnDelete();
            $table->foreignId('shared_with_user_id')->constrained('users')->cascadeOnDelete();
            $table->enum('permission', ['view', 'edit']);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('task_list_shares');
    }
}
