<?php
namespace App\Repositories;
use App\Interfaces\CrudInterface;
use App\Models\ProjectModel;
use Illuminate\Http\Request;

class ProjectRepository implements CrudInterface
{

    public function getAll()
    {
        $data=ProjectModel::with('task')->get();
        return $data;
    }

    public function findById($id)
    {
        $data=ProjectModel::with('task')->find($id);
        return $data;
    }
    public function create(Request $request){

        $data= new ProjectModel();
        $data->name=$request->name;
        $data->description=$request->description;
        $data->status=$request->status;
        $data->user_id=1;
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
        $data->user_id=1;
        $data->save();

        return $data;
    }

}
