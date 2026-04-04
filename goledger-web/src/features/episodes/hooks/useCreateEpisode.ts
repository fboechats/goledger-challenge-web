import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { createEpisode } from "../services"

export const useCreateEpisode = (seasonId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createEpisode,
        onError: () => toast.error('Something went wrong'),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['episodes', seasonId] })
            toast.success('Episode Created!')
        },
    })
}