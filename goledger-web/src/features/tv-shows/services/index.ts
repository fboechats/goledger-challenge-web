import { api } from "../../../shared/services/api"
import type { TvShow } from "../types"

type TvShowNormalized = Omit<TvShow, '@key'> & {
  id: string
}

export const getTvShows = async (): Promise<TvShowNormalized[]> => {
  const response = await api.post('/api/query/search', {
    query: {
      selector: {
        '@assetType': 'tvShows',
      },
    },
  })

  const result = response.data?.result ?? []

  return result.map((item: TvShow) => ({
    ...item,
    id: item['@key'],
  }))
}