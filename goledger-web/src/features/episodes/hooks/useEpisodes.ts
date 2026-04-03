import { useQuery } from '@tanstack/react-query'
import { getEpisodes } from '../services'

export const useEpisodes = (seasonId?: string) => {
    return useQuery({
        queryKey: ['episodes', seasonId],
        queryFn: () => getEpisodes(seasonId!),
        enabled: !!seasonId,
    })
}