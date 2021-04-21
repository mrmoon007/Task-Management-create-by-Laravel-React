import React from 'react';
import { Container } from 'react-bootstrap';
const Home = () => {
    return (
        <Container>
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">App Component</div>

                        <div className="card-body">I'm an App component!</div>
                    </div>
                </div>
            </div>
        </Container>
     );
}

export default Home;
