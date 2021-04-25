import axios from "axios";
import React, { useEffect, useState } from "react";
import { Badge, Button, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { deleteProject } from "../../../services/ProjectService";
const ProjectLisr = () => {

    const [dataList, setDataList] = useState([]);




    console.log('task item',dataList)

    useEffect(() => {
        getProjectList();
    }, []);

    const getProjectList =()=>{
        axios
            .get("http://127.0.0.1:8000/api/project")
            .then((res) => {
                console.log("res", res);
                const m = res.data.data;
                console.log("data gg", m);
                setDataList(m);

                console.log("data task", m);
            })
            .catch((err) => {
                console.log("err", err);
            });
    }

    const onProjectDelete =async(id)=>{
        const respose = await deleteProject(id);
        //console.log("respose.status", respose.status);
        // if(respose.status ===true){
        //     getProjectList();
        // }
        getProjectList();
    }

    return (
        <>
            <div className="header-part">
                <div className="float-left">
                    <h2>
                        Project Lists{" "}
                        <Badge variant="success">{dataList.length}</Badge>
                    </h2>
                </div>
                <div className="float-right">
                    <Link to="create" className="btn btn-info">
                        + Create New
                    </Link>
                </div>
                <div className="clearfix"></div>
            </div>
            {dataList.map((item, index) => (
                <Card key={index} className="mt-3">
                    <Card.Header>
                        {item.name} <Badge variant="success">{dataList[index].task.length}</Badge>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>{item.description}</Card.Text>
                        <Button variant="primary" className="mr-2">
                            Edit
                        </Button>

                        <Link to={`/project/view/${item.id}`}>
                            <Button variant="info" className="mr-2">
                                View
                            </Button>
                        </Link>

                        <Button
                        variant="danger"
                        className="mr-2"
                        onClick={()=>onProjectDelete(item.id)}
                        >
                            Delete
                        </Button>
                    </Card.Body>
                </Card>
            ))}
        </>
    );
};

export default ProjectLisr;
