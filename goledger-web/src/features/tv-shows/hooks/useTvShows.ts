import { useQuery } from "@tanstack/react-query"
import { getTvShows } from "../services"

export const useTvShows = () => {
    return useQuery({
        queryKey: ['tvShows'],
        queryFn: getTvShows,
    })
}