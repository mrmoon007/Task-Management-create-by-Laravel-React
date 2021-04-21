import React from "react";
import { Button, Card, Container } from "react-bootstrap";
const ProjectLisr = () => {
    return (
        <Container>
            <h2>Project Lists</h2>
            <Card>
                <Card.Header>Featured</Card.Header>
                <Card.Body>
                    <Card.Title>Special title treatment</Card.Title>
                    <Card.Text>
                        With supporting text below as a natural lead-in to
                        additional content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ProjectLisr;
