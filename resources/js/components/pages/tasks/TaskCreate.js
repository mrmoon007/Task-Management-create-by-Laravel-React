import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { storeNewProject, storeNewTask } from "../../../services/ProjectService";

const TaskCreate = (props) => {
    const [name, setName] = useState(" ");
    const [description, setDescription] = useState(" ");
    const [error, setError] = useState([]);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const data = {
            name: name,
            description: description,
            status: 1,
            project_id: props.project_id,

        };

        console.log("submit data ", data);
        const respose = await storeNewTask(data);
        console.log("submit respose ", respose);
        if (respose.status === "true") {
            alert("Task is successfully added");
            setName(" ");
            setDescription(" ");
            setError({});
            props.onCompleteTask(respose.data)
            // history.pushState('/projectList');
        } else {
            alert("Task is not added");
            let m = respose.errors;
            setError(m);
            console.log(" r error", m);
        }
    };

    return (
        <>
            <Card className="p-2">
                <h2>New Task</h2>
                <Card.Body>
                    <Form onSubmit={(e) => onSubmitHandler(e)}>
                        <div className="row">
                            <div className="col-6">
                                <Form.Group controlId="name">
                                    <Form.Label>Task Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        placeholder="Enter Project title"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    />
                                    {error && error.name && (
                                        <p className="text-danger">
                                            {error.name}
                                        </p>
                                    )}
                                </Form.Group>
                            </div>

                            <div className="col-6">
                                <Form.Group controlId="description">
                                    <Form.Label>Project Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="description"
                                        placeholder="Enter Task Description"
                                        as="textarea"
                                        rows="3"
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                    />
                                    {error && error.description && (
                                        <p className="text-danger">
                                            {error.description}
                                        </p>
                                    )}
                                </Form.Group>
                            </div>
                        </div>
                        <Button variant="primary" type="submit">
                            Save Task
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
};

export default TaskCreate;
