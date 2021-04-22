import React, { useEffect, useState } from "react";
import { Alert, Badge, Button, Card, Container, Form } from "react-bootstrap";
import { BrowserRouter, Link, withRouter } from "react-router-dom";
import { storeNewProject } from "../../../services/ProjectService";
const ProjectCreate = () => {
    const [name, setName] = useState(" ");
    const [description, setDescription] = useState(" ");
    const [error, setError] = useState([]);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        // const {history}=props;
        // console.log('history props',history)
        // return false;

        const data = {
            name: name,
            description: description,
            user_id: 1,
            status: 0,
        };

        console.log("submit data ", data);
        const respose = await storeNewProject(data);
        console.log("submit respose ", respose);
        if (respose.status === "true") {
            alert("Project is successfully added");
            setName(" ");
            setDescription(" ");
            setError({ });
            // history.pushState('/projectList');
        } else {
            alert("Project is not added");
            let m = respose.errors;
            setError(m);
            console.log(" r error", m);
        }
    };

    // console.log('error s ',error.description)

    return (
        <>
            <div className="header-part">
                <div className="float-left">
                    <h2>
                        Project Lists <Badge variant="success"></Badge>
                    </h2>
                </div>
                <div className="float-right">
                    <Link to="/projectList" className="btn btn-info">
                        See all project list
                    </Link>
                </div>
                <div className="clearfix"></div>
            </div>
            <Card className="mt-2">
                <Card.Body>
                    <Form onSubmit={(e) => onSubmitHandler(e)}>
                        <Form.Group controlId="name">
                            <Form.Label>Project Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Enter Project title"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            {error && error.name && <p className='text-danger'>{error.name}</p>}
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>Project Description</Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                placeholder="Enter Project Description"
                                as="textarea"
                                rows="5"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            {error && error.description && <p className='text-danger'>{error.description}</p>}
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Save Project
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
};

export default ProjectCreate;
