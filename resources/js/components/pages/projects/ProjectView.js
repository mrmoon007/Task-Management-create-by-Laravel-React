import React, { useEffect, useState } from "react";
import { Badge, Button, Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { getProjectDetails } from "../../../services/ProjectService";
const ProjectView = () => {
    const [project, setProject] = useState({});
    const [taskList, setTaskList] = useState([]);

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
                    <Link to="create" className="btn btn-info">
                        + Create New Task
                    </Link>
                </div>
                <div className="clearfix"></div>
                <div>
                    {project.description}
                </div>
            </div>
            {taskList.map((item, index) => (
                <Card key={index} className="mt-3">
                    <Card.Header>
                        {item.name} <Badge variant="success">1</Badge>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>{item.description}</Card.Text>
                        <Button variant="primary" className="mr-2">
                            Edit
                        </Button>
                        <Button variant="success" className="mr-2">
                            View
                        </Button>
                        <Button variant="danger" className="mr-2">
                            Delete
                        </Button>
                    </Card.Body>
                </Card>
            ))}
        </>
    );
};

export default ProjectView;
