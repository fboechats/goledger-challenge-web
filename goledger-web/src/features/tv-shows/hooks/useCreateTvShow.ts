import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { createTvShow } from '../services'

export const useCreateTvShow = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createTvShow,
    onError: () => toast.error('Something went wrong'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tvShows'] })
      toast.success('TV Show Created!')
    },
  })
}