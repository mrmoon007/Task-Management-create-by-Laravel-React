<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Repositories\TaskRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
    public $taskRepository;

    public function __construct (TaskRepository $taskRepository)
    {
        $this->taskRepository = $taskRepository;
    }


    /**
     * Inbox() get all Task list
     *
     * @return respose
     */

    public function index(){

        $data=$this->taskRepository->getAll();

        return response()->json([
            "status"=> "true",
            "data"=> $data,
            "message"=> "Task list"
        ]);
    }


    /**
     * Show() get data Project find by Id
     *
     *
     * @param Integer $id
     *
     * @return respose
     */

    public function show($id){

        $data=$this->taskRepository->findById($id);

        if(is_null($data))
        {
            return response()->json([
                "status"=> "false",
                "data"=> null,
                "message"=> "Task Details"
            ]);
        }

        return response()->json([
            "status"=> "true",
            "data"=> $data,
            "message"=> "Task Details"
        ]);
    }

    /**
     * create() new Task
     *
     * @param Request $request
     *
     * @return respose
     */

    public function store(Request $request)
    {
        // $validated = $request->validate([
        //     'name' => 'required|unique:posts|max:255',
        //     'description' => 'required',
        // ]);
        $formData=$request->all();

        $validator = Validator::make($formData, [
            'name' => 'required|max:255',
            'description' => 'required',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                "status"=> "false",
                "message"=> $validator->getMessageBag()->first(),
                "errors"=> $validator->getMessageBag(),
            ]);
        }

        $data=$this->taskRepository->create($request);

        return response()->json([
            "status"=> "true",
            "data"=> $data,
            "message"=> "Task store"
        ]);
    }

    /**
     * update() Task find by $id
     *
     * @param Request $request
     * @param integer $id
     *
     * @return respose
     */

    public function update(Request $request,$id)
    {
        $data=$this->taskRepository->findById($id);
        if(is_null($data)){
            return response()->json([
                "status"=> "false",
                "data"=> null,
                "message"=> "Data not found"
            ]);
        }

        $formData=$request->all();

        $validator = Validator::make($formData, [
            'name' => 'required|max:255',
            'description' => 'required',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                "status"=> "false",
                "message"=> $validator->getMessageBag()->first(),
                "errors"=> $validator->getMessageBag(),
            ]);
        }

        $data=$this->taskRepository->edit($request,$id);

        return response()->json([
            "status"=> "true",
            "data"=> $data,
            "message"=> "Task data update"
        ]);
    }

    /**
     * destroy() Task find by $id
     *
     * @param integer $id
     *
     * @return respose
     */

    public function destroy($id)
    {
        $data=$this->taskRepository->findById($id);
        if(is_null($data)){
            return response()->json([
                "status"=> "false",
                "data"=> null,
                "message"=> "Data not found"
            ]);
        }

        $data=$this->taskRepository->delete($id);

        return response()->json([
            "status"=> "true",
            "data"=> $data,
            "message"=> "Task delete"
        ]);
    }
}
