import React, { useEffect, useState } from "react";
import { Badge, Button, Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { updateTask } from "../../../services/ProjectService";

import TaskCreate from "../tasks/TaskCreate";
import ProjectEdit from "./ProjectEdit";

const ProjectView = () => {
    const [project, setProject] = useState({});
    const [taskList, setTaskList] = useState([]);
    const [toggleAddTask, setToggleAddTask] = useState(false);
    const [toggleEditProject, setToggleEditProject] = useState(false);

    let { id } = useParams();
    //console.log("route para", id);

    useEffect(() => {
        getProjectDetails(id);

    }, [id]);

    const getProjectDetails = (id) => {
        axios
            .get(`http://127.0.0.1:8000/api/project/${id}`)
            .then((res) => {
                console.log("res", res);
                const project = res.data.data;
                const task = res.data.data.task;
                console.log("project", project);
                console.log("task", task);
                setProject(project);
                setTaskList(task);
            })
            .catch((err) => {
                console.log("err", err);
            });
    };

    const addTask = () => {
        setToggleAddTask(!toggleAddTask);
        setToggleEditProject(false);
    };

    const onCompleteTask = (value) => {
        addTask();
        const cloneTaskList = taskList;
        cloneTaskList.push(value);
        setTaskList(cloneTaskList);
    };

    const editProject = () => {
        setToggleEditProject(!toggleEditProject);
        setToggleAddTask(false);
    };

    const onCompleteProject = () => {
        getProjectDetails(id);
        editProject();
    };

    const toggleCompleteStatus =async(item)=>{

        if(item.status===1)
        {
            item.status=0
        }else{
            item.status=1
        }
        console.log('item for update',item)
        const respose = await updateTask(item.id,item);
        getProjectDetails(id);

    }
    // let { id } = useParams();
    // console.log('route para',id)
    return (
        <>
            <div className="header-part">
                <div className="float-left">
                    {!toggleEditProject && (
                        <>
                            <h2>
                                {project.name}
                                <Badge variant="success">
                                    {taskList.length}
                                </Badge>
                            </h2>
                            <div>{project.description}</div>
                        </>
                    )}
                    {toggleEditProject && (
                        <ProjectEdit
                            project={project}
                            onCompleteProject={onCompleteProject}
                        />
                    )}
                </div>
                <div className="float-right">
                    <button
                        className={`btn btn-outline-${
                            project.status === 1 ? "success" : "info"
                        } mr-2`}
                        disabled
                    >
                        {project.status && <span>✔ Completed</span>}
                        {!project.status && <span> Pending</span>}
                    </button>
                    <button
                        className="btn btn-success mr-2"
                        onClick={() => editProject()}
                    >
                        {!toggleEditProject && <span>Edit Project</span>}
                        {toggleEditProject && <span>Cancel Editing</span>}
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={() => addTask()}
                    >
                        {!toggleAddTask && <span>+ Add Task</span>}
                        {toggleAddTask && <span>Cancel</span>}
                    </button>
                </div>
                <div className="clearfix"></div>

                {toggleAddTask && (
                    <TaskCreate
                        project_id={id}
                        onCompleteTask={onCompleteTask}
                    />
                )}
            </div>
            {taskList.map((item, index) => (
                <Card key={index} className="mt-3">
                    <Card.Body>
                        <div className="">
                            <div className="float-left">
                                {item.status === 1 && (
                                    <del className="text-success">
                                        <strong>{item.name}</strong>
                                    </del>
                                )}

                                {item.status === 0 && <span>{item.name}</span>}
                                <div>
                                <Card.Text>{item.description}</Card.Text>
                                </div>
                            </div>
                            <div className="float-right">
                                <button
                                    className={`btn btn-outline-${
                                        item.status === 1
                                            ? "success"
                                            : "info"
                                    } `}
                                    onClick={()=>toggleCompleteStatus(item)}
                                >
                                    {item.status && <span>✔ Mark as Completed</span>}
                                    {!item.status && <span>  Mark as Pending</span>}
                                </button>
                            </div>
                        </div>

                    </Card.Body>
                </Card>
            ))}
        </>
    );
};

export default ProjectView;
