import { useQuery } from '@tanstack/react-query'
import { getSeasons } from '../services'

export const useSeasons = (tvShowId?: string) => {
    return useQuery({
        queryKey: ['seasons', tvShowId],
        queryFn: () => getSeasons(tvShowId!),
        enabled: !!tvShowId,
    })
}