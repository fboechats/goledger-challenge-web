import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { updateWatchlist } from "../services"

export const useUpdateWatchlist = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: updateWatchlist,
        onError: () => toast.error('Something went wrong'),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['watchlist'] })
            toast.success('Added to watchlist!')
        },
    })
}