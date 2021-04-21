<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Repositories\ProjectRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProjectController extends Controller
{
    public $projectRepository;

    public function __construct (ProjectRepository $projectRepository)
    {
        $this->projectRepository = $projectRepository;
    }


    /**
     * Inbox() get all Project list
     *
     * @return respose
     */

    public function index(){

        $data=$this->projectRepository->getAll();

        return response()->json([
            "status"=> "true",
            "data"=> $data,
            "message"=> "Project list"
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

        $data=$this->projectRepository->findById($id);

        if(is_null($data))
        {
            return response()->json([
                "status"=> "false",
                "data"=> null,
                "message"=> "Project Details"
            ]);
        }

        return response()->json([
            "status"=> "true",
            "data"=> $data,
            "message"=> "Project Details"
        ]);
    }

    /**
     * create() new project
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

        $data=$this->projectRepository->create($request);

        return response()->json([
            "status"=> "true",
            "data"=> $data,
            "message"=> "Project store"
        ]);
    }

    /**
     * update() project find by $id
     *
     * @param Request $request
     * @param integer $id
     *
     * @return respose
     */

    public function update(Request $request,$id)
    {
        $data=$this->projectRepository->findById($id);
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

        $data=$this->projectRepository->edit($request,$id);

        return response()->json([
            "status"=> "true",
            "data"=> $data,
            "message"=> "Project data update"
        ]);
    }

    /**
     * destroy() project find by $id
     *
     * @param integer $id
     *
     * @return respose
     */

    public function destroy($id)
    {
        $data=$this->projectRepository->findById($id);
        if(is_null($data)){
            return response()->json([
                "status"=> "false",
                "data"=> null,
                "message"=> "Data not found"
            ]);
        }

        $data=$this->projectRepository->delete($id);

        return response()->json([
            "status"=> "true",
            "data"=> $data,
            "message"=> "Project delete"
        ]);
    }
}
