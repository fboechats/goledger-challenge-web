import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createEpisode } from "../services"

export const useCreateEpisode = (seasonId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createEpisode,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['episodes', seasonId] })
        },
    })
}