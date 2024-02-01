import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://api.tvmaze.com"
})

const useAxiosInstance = () => {
    return axiosInstance;
};

export default useAxiosInstance;