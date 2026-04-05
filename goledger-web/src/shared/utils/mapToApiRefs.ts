import type { WatchlistNormalized } from "../../features/watchlist/services";

export const mapToApiRefs = (items: WatchlistNormalized['tvShows']) =>
  items.map((item) => ({
    '@key': item.id,
    '@assetType': item['@assetType'],
  }))