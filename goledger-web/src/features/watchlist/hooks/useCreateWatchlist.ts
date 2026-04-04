import { useMutation } from '@tanstack/react-query'
import { createWatchlist } from '../services'

export const useCreateWatchlist = () => {
    return useMutation({
        mutationFn: createWatchlist,
    })
}