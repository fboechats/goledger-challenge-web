import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateWatchlist } from "../services"

export const useUpdateWatchlist = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: updateWatchlist,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['watchlist'] })
        },
    })
}