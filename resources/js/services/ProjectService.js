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
