import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { deleteSeason } from "../services"

export const useDeleteSeason = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteSeason,
        onError: () => toast.error('Something went wrong'),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['seasons'] })
            toast.success('Season Deleted!')
        },
    })
}