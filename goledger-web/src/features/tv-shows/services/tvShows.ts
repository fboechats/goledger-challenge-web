import { api } from "../../../shared/services/api"

export const getTvShows = async () => {
    const response = await api.post('/api/query/search', {
        query: {
            selector: {
                '@assetType': 'tvShows',
            },
        },
    })

    return response.data
}