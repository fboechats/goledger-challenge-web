import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteSeason } from "../services"

export const useDeleteSeason = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteSeason,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['seasons'] })
        },
    })
}