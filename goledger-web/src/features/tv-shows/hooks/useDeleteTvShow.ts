import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { deleteTvShow } from '../services'

export const useDeleteTvShow = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteTvShow,
        onError: () => toast.error('Something went wrong'),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tvShows'] })
            toast.success('TV Show Deleted!')
        },
    })
}