import { useQuery } from "@tanstack/react-query"
import { getWatchlists } from "../services"

export const useWatchlists = () => {
    return useQuery({
        queryKey: ['watchlist'],
        queryFn: getWatchlists,
    })
}