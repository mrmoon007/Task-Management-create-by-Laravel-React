import React, { useState } from "react";
import { Container } from "react-bootstrap";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./layouts/Header";
import About from "./pages/About";
import Home from "./pages/Home";
import ProjectCreate from "./pages/projects/ProjectCreate";
import ProjectLisr from "./pages/projects/ProjectList";
import ProjectView from "./pages/projects/ProjectView";

function App() {
    return (
        <Container>
            <Router>
                <Header />
                <div>
                    <Switch>
                        <Route path="/about">
                            <About />
                        </Route>
                        <Route path="/ProjectList">
                            <ProjectLisr />
                        </Route>
                        <Route path="/project/view/:id" exact={true} >
                            <ProjectView />
                        </Route>
                        <Route path="/create" >
                            <ProjectCreate />
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>

                    </Switch>
                </div>
            </Router>
        </Container>
    );
}

export default App;

if (document.getElementById("example")) {
    ReactDOM.render(<App />, document.getElementById("example"));
}
