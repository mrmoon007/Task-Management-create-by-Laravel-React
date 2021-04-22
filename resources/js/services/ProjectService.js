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
