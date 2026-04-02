import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateSeason } from "../services"

export const useUpdateSeason = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: updateSeason,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['seasons'] })
        },
    })
}