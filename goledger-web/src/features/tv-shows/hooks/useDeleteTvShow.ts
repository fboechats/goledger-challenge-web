import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTvShow } from '../services'

export const useDeleteTvShow = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteTvShow,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tvShows'] })
        },
    })
}