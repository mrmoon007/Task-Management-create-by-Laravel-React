import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { updateProject } from "../../../services/ProjectService";

const ProjectEdit = (props) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [error, setError] = useState([]);


    useEffect(() => {
        setName(props.project.name);
        setDescription(props.project.description);
        setStatus(props.project.status)
        console.log("update props id ", props.id);
    }, [])

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const data = {

            name: name,
            description: description,
            user_id: 1,
            status: status,
        };

        console.log("update data ggg ", data);

        const respose = await updateProject(props.project.id,data);
        console.log("update respose ", respose);
        if (respose.status === "true") {
            alert("Project is successfully updated");
            setName(" ");
            setDescription(" ");
            setStatus('');
            setError({});
            console.log('project id',props.project.id)
            props.onCompleteProject(props.project.id);
        } else {

            alert("Project is not updated");
            let m = respose.message;
            console.log(" r error", respose.message);
            setError(m);
            console.log(" r error", m);
            console.log("update props id ", props.id);
        }
    };



    return (
        <>
            <Card className="mt-2">
                <Card.Body>
                    <Form onSubmit={(e) => onSubmitHandler(e)}>
                        <div className="row">
                            <div className="col-6">
                                <Form.Group controlId="name">
                                    <Form.Label>Project Title</Form.Label>
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
                                <Form.Group controlId="Status">
                                    <Form.Label>Status select</Form.Label>
                                    <Form.Control as="select"
                                     name="status"
                                      value={status}
                                      onChange={(e) =>
                                        setStatus(e.target.value)
                                    }
                                      >
                                        <option >Select</option>
                                        <option value={0} >Padding</option>
                                        <option value={1} >Completed</option>

                                    </Form.Control>
                                </Form.Group>
                            </div>
                            <div className="col-6">
                                <Form.Group controlId="description">
                                    <Form.Label>Project Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="description"
                                        placeholder="Enter Project Description"
                                        as="textarea"
                                        rows="5"
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
                            Update Project
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
};

export default ProjectEdit;
