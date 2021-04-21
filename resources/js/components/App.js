import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./layouts/Header";
import About from "./pages/About";
import Home from "./pages/Home";
import ProjectLisr from "./pages/projects/ProjectList";


function App() {
    
    return (
        <div >
            <Router>
                <Header/>
                <div>

                    <Switch>
                        <Route path="/about">
                            <About />
                        </Route>
                        <Route path="/ProjectList">
                            <ProjectLisr />
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                </div>
            </Router>

        </div>
    );
}

export default App;


if (document.getElementById("example")) {
    ReactDOM.render(<App />, document.getElementById("example"));
}