import axios from "axios";

export const storeNewProject = async(data) => {
    console.log("service data", data);
    return  await axios
        .post("http://127.0.0.1:8000/api/project",data)
        .then((res) => {
            console.log("res", res);
            return res.data;
        })
        .catch((err) => {
            console.log("err", err);
        });
};

export const updateProject = async(h,data) => {

    return  await axios
        .put(`http://127.0.0.1:8000/api/project/${h}`,data)
        .then((res) => {
            console.log("update res", res);
            return res.data;
        })
        .catch((err) => {
            console.log("update err", err);
        });
};


export const deleteProject = async(h) => {

    return  await axios
        .delete(`http://127.0.0.1:8000/api/project/${h}`)
        .then((res) => {
            console.log("delete res", res);
            return res.data;
        })
        .catch((err) => {
            console.log("delete err", err);
        });
};

export const storeNewTask = async(data) => {
    console.log("service data", data);
    return  await axios
        .post("http://127.0.0.1:8000/api/task/",data)
        .then((res) => {
            console.log("res", res);
            return res.data;
        })
        .catch((err) => {
            console.log("err", err);
        });
};

export const updateTask = async(id,data) => {

    return  await axios
        .put(`http://127.0.0.1:8000/api/task/${id}`,data)
        .then((res) => {
            console.log("update res", res);
            return res.data;
        })
        .catch((err) => {
            console.log("update err", err);
        });
};

// export const getProjectDetails = (id) => {
//     axios
//         .get(`http://127.0.0.1:8000/api/project/${id}`)
//         .then((res) => {
//             console.log("res", res);
//             const project = res.data.data;
//             const task = res.data.data.task;
//             console.log("project", project);
//             console.log("task", task);
//             setProject(project);
//             setTaskList(task);
//         })
//         .catch((err) => {
//             console.log("err", err);
//         });
// };
