import { useQuery } from "@tanstack/react-query";
import useAxiosInstance from "./useAxiosInstance";

const useShows = () => {
    const axiosInstance = useAxiosInstance();
    const { data: shows = [] } = useQuery({
        queryKey: ["shows"],
        queryFn: async () => {
            const res = await axiosInstance.get("/search/shows?q=all");
            return res.data;
        }
    })
    return [shows]
};

export default useShows;