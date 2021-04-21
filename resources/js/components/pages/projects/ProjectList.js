import axios from "axios";
import React, { useEffect, useState } from "react";
import { Badge, Button, Card, Container } from "react-bootstrap";
const ProjectLisr = () => {
    const [dataList, setDataList] = useState([]);
    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/project")
            .then((res) => {
                console.log("res", res);
                const m = res.data.data;
                console.log("data", m);
                setDataList(m);
            })
            .catch((err) => {
                console.log("err", err);
            });
    }, []);
    return (
        <>
            <h2>Project Lists</h2>
            {dataList.map((item, index) => (
                <Card key={index}>
                    <Card.Header>
                       {item.name} <Badge variant="success">9</Badge>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            {item.description}
                        </Card.Text>
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

export default ProjectLisr;
