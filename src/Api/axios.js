import axios from "axios";

const axiosInstance = axios.create({
    baseURL:"http://127.0.0.1:5001/amzon-clone-9c35d/us-central1/api",
    baseURL:"https://amazon-api-wrho.onrender.com/"
});

export{axiosInstance}