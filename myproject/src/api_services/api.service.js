import axios from "axios";

const commonConfig = {
    headers: {
        // "Content-Type": "*",
        // "Content-Type":"multipart/form-data",
        // Accept: "application/json",
        // Accept: "multipart/form-data",
    },
};


export default (baseURL) => {
    return axios.create({
        baseURL,
        ...commonConfig,
    });
};
