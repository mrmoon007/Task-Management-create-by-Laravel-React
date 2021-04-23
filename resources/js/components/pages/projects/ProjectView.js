import React, { useEffect, useState } from "react";
import { Badge, Button, Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";


import TaskCreate from "../tasks/TaskCreate";


const ProjectView = () => {
    const [project, setProject] = useState({});
    const [taskList, setTaskList] = useState([]);
    const [toggleAddTask, setToggleAddTask] = useState(false);

    let { id } = useParams();
    console.log("route para", id);

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
        if (toggleAddTask === false) {
            setToggleAddTask(true);
        } else {
            setToggleAddTask(false);
        }

    };

    const onCompleteTask=(value)=>{
        addTask();
        const cloneTaskList=taskList;
        cloneTaskList.push(value);
        setTaskList(cloneTaskList);
    }
    // let { id } = useParams();
    // console.log('route para',id)
    return (
        <>
            <div className="header-part">
                <div className="float-left">
                    <h2>
                        {project.name}
                        <Badge variant="success">{taskList.length}</Badge>
                    </h2>
                </div>
                <div className="float-right">
                    <Link to="create" className="btn btn-success mr-2">
                        Edit
                    </Link>
                    <button className="btn btn-info" onClick={() => addTask()}>
                        {!toggleAddTask && <span>+ Add New Task</span>}
                        {toggleAddTask && <span>Cancle</span>}
                    </button>
                </div>
                <div className="clearfix"></div>
                <div>{project.description}</div>

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
                        {item.status === 1 && (
                            <del className="text-success">
                                <strong>
                                    {item.name}
                                </strong>
                            </del>
                        )}

                        {item.status === 0 && (
                            <span>
                                {item.name}
                            </span>
                        )}
                        <Card.Text>{item.description}</Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </>
    );
};

export default ProjectView;
