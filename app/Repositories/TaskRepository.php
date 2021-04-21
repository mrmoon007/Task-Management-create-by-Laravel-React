<?php
namespace App\Repositories;
use App\Interfaces\CrudInterface;
use App\Models\TaskModel;
use Illuminate\Http\Request;


class TaskRepository implements CrudInterface
{

    public function getAll()
    {
        $data=TaskModel::get();
        return $data;
    }

    public function findById($id)
    {
        $data=TaskModel::with('project')->find($id);
        return $data;
    }
    public function create(Request $request){

        $data= new TaskModel();
        $data->name=$request->name;
        $data->description=$request->description;
        $data->status=$request->status;
        $data->project_id=$request->project_id;
        $data->save();

        return $data;

    }
    public function delete($id)
    {
        $data= $this->findById($id);
        $data->delete();
        return $data;
    }
    public function edit(Request $request,$id)
    {
        $data= $this->findById($id);
        $data->name=$request->name;
        $data->description=$request->description;
        $data->status=$request->status;
        $data->project_id=$request->project_id;
        $data->save();

        return $data;
    }

}
