import { api } from '../../../shared/services/api'
import { createAsset, deleteAsset, updateAsset } from '../../../shared/services/assets'
import type { CreateEpisodeInput, Episode, EpisodeNormalized, UpdateEpisodeInput } from '../types'

export const getEpisodes = async (seasonId: string): Promise<EpisodeNormalized[]> => {
    const response = await api.post('/query/search', {
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



export const createEpisode = async (data: CreateEpisodeInput) => {
    return createAsset({
        '@assetType': 'episodes',
        ...data,
    })
}

export const deleteEpisode = async (id: string) => {
    return deleteAsset({
        '@assetType': 'episodes',
        '@key': id
    })
}

export const updateEpisode = async (data: UpdateEpisodeInput) => {
    return updateAsset({
        '@assetType': 'episodes',
        ...data,
    })
}