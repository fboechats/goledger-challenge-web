import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { updateEpisode } from "../services"

export const useUpdateEpisode = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: updateEpisode,
        onError: () => toast.error('Something went wrong'),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['episodes'] })
            toast.success('Episode Updated!')
        },
    })
}