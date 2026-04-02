import { api } from '../../../shared/services/api'

export const getSeasons = async (tvShowId: string) => {
    const response = await api.post('/api/query/search', {
        query: {
            selector: {
                '@assetType': 'seasons',
                tvShowId,
            },
        },
    })

    return response.data.result
}