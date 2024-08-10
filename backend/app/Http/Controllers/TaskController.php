<?php
declare(strict_types=1);
namespace App\Http\Controllers;

use App\Http\Requests\TaskRequest;
use Illuminate\Http\JsonResponse;
use App\Models\Task;
class TaskController extends Controller
{
    /**
     * This function will return list of task or empty
     *
     * @return JsonResponse
     * */
    public function index(): JsonResponse
    {
        $filters = \request()->query();
        $per_page = ($filters['per_page'] ?? 10);
        $tasks = Task::query();
        if(!empty($filters['title'])){
            $tasks = $tasks->where('title', 'LIKE', '%'.$filters['title'].'%');
        }
        if(!empty($filters['status'])){
            $tasks = $tasks->where('status', $filters['status']);
        }
        if(!empty($filters['due_date'])){
            $tasks = $tasks->where('due_date', '>=', $filters['due_date']);
        }
        $tasks->orderBy('created_at', 'DESC');
        $tasks = $tasks->paginate($per_page);

        return response()->json([
            'success' => false,
            'tasks' => $tasks->items(),
            'message' => $tasks->total() > 0 ? 'List of tasks' : 'No task(s) found'
        ]);
    }

    /**
     * This function will return task details or not found results
     *
     * @param int $id
     *
     * @return JsonResponse
     * */
    public function show(int $id): JsonResponse
    {
        $task = Task::find($id);
        if (empty($task)){
            return response()->json([
               'success' => false,
               'message' => 'Task not found'
            ],404);
        }
        return response()->json([
           'success' => true,
            'task' => $task,
           'message' => 'Task details'
        ]);
    }
    /**
     * This function will create and task and return success response or error
     *
     * @param TaskRequest $request
     *
     * @return JsonResponse
     * */
    public function store(TaskRequest $request): JsonResponse
    {
        $data = $request->only(['title', 'description', 'status', 'due_date']);
        $data['user_id'] = (auth()->id() ?? 1);
        $task = Task::create($data);
        if($task){
            return response()->json([
                'success' => true,
                'task' => $task,
                'message' => 'Task created successfully'
            ],201);
        }
        return response()->json([
            'success' => false,
           'message' => 'Failed to create task'
        ],500);
    }
    /**
     * This function will update details of as task
     *
     * @param int $id
     * @param TaskRequest $request
     *
     * @return JsonResponse
     * */
    public function update(int $id, TaskRequest $request): JsonResponse
    {
        $task = Task::find($id);
        if (empty($task)){
            return response()->json([
               'success' => false,
               'message' => 'Task not found'
            ],404);
        }
        $data = $request->only(['title', 'description', 'status', 'due_date','status']);

        if($task->update($data)){
            return response()->json([
                'success' => true,
                'task' => $task,
                'message' => 'Task updated successfully'
            ]);
        }
        return response()->json([
            'success' => false,
           'message' => 'Failed to update task'
        ],500);

    }
    /**
     * This function will delete a task record from tasks table
     *
     * @param int $id
     *
     * @return JsonResponse
     * */
    public function destroy(int $id): JsonResponse
    {
        $task = Task::find($id);
        if (empty($task)){
            return response()->json([
               'success' => false,
               'message' => 'Task not found'
            ],404);
        }
        if($task->delete()) {
            return response()->json([
                'success' => true,
                'message' => 'Task deleted successfully'
            ]);
        }
        return response()->json([
            'success' => false,
           'message' => 'Failed to delete task'
        ],500);
    }

}
