import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createSeason } from '../services'

export const useCreateSeason = (tvShowId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createSeason,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['seasons', tvShowId] })
        },
    })
}