<?php
declare(strict_types=1);
namespace App\Http\Controllers;

use App\Enums\TaskStatus;
use App\Http\Requests\TaskRequest;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use App\Models\Task;
use Illuminate\Support\Facades\Log;
use Yajra\DataTables\DataTables;

class TaskController extends Controller
{
    /**
     * This function will return list of task or empty
     *
     * @return JsonResponse
     * */
    public function index(): JsonResponse
    {
        $tasks = Task::select(['id', 'title', 'status', 'due_date']);
        $datatable = DataTables::of($tasks);
        $request = request();


        return $datatable
            ->filter(function ($query) {
                if (request()->has('search')) {
                    $searchValue = request('search')['value'];
                    Log::error('search: '.$searchValue);
                    $query->where('title', 'like', "%" . $searchValue . "%");
                }
            })
            ->filterColumn('status', function($query, $keyword) {
                $status = array_search(ucfirst($keyword), TaskStatus::getOptions());
                if ($status !== false) {
                    $query->where('status', $status);
                }
            })
            ->filterColumn('due_date', function($query, $keyword) {
                try{
                    $date = Carbon::parse($keyword);
                    Log::error('due_date: '. $date);
                    $query->where('due_date', '=', $date->format('Y-m-d'));
                } catch (\Exception $exception){
                    Log::error('due_date parse error: '. $exception->getMessage());
                }
            })
            ->make(true);
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
