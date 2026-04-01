import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTvShow } from '../services'

export const useCreateTvShow = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createTvShow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tvShows'] })
    },
  })
}