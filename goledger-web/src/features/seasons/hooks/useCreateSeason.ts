import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { createSeason } from '../services'

export const useCreateSeason = (tvShowId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createSeason,
        onError: () => toast.error('Something went wrong'),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['seasons', tvShowId] })
            toast.success('Season Created!')
        },
    })
}