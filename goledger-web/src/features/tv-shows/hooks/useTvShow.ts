import { useQuery } from '@tanstack/react-query'
import { getTvShowById } from '../services'

export const useTvShow = (id?: string) => {
    return useQuery({
        queryKey: ['tvShow', id],
        queryFn: () => getTvShowById(id!),
        enabled: !!id,
    })
}