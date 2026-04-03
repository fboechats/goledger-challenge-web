import { api } from '../../../shared/services/api'
import { createAsset } from '../../../shared/services/assets'

export type Episode = {
    '@key': string,
    season: { '@key': string },
    episodeNumber: number,
    title: string,
    description: string,
    releaseDate: string
}

export type EpisodeNormalized = Omit<Episode, '@key'> & {
    id: string
}

export const getEpisodes = async (seasonId: string): Promise<EpisodeNormalized[]> => {
    const response = await api.post('/api/query/search', {
        query: {
            selector: {
                '@assetType': 'episodes',
                season: {
                    '@key': seasonId,
                },
            },
        },
    })

    const result = response.data?.result ?? []

    return result.map((item: Episode) => ({
        ...item,
        id: item['@key'],
    }))
}

type CreateEpisodeInput = {
    season: { '@key': string },
    episodeNumber: number,
    title: string,
    description: string,
    releaseDate: string,
}

export const createEpisode = async (data: CreateEpisodeInput) => {
    return createAsset({
        '@assetType': 'episodes',
        ...data,
    })
}