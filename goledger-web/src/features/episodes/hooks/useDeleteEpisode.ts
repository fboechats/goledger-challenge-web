import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { deleteEpisode } from "../services"

export const useDeleteEpisode = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteEpisode,
        onError: () => toast.error('Something went wrong'),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['episodes'] })
            toast.success('Episode Deleted!')
        },
    })
}