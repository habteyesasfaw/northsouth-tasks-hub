<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TaskListShareResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'task_list_id' => $this->task_list_id,
            'shared_with_user_id' => $this->shared_with_user_id,
            'permission' => $this->permission,
            'shared_with_user' => new UserResource($this->sharedWithUser), // Assuming there's a UserResource to format the user details
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
