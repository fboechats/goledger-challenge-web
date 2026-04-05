import type { WatchlistTvShowNormalized } from "../../features/watchlist/types";

export const mapToApiRefs = (items: WatchlistTvShowNormalized[]) =>
  items.map((item) => ({
    '@key': item.id,
    '@assetType': item['@assetType'],
  }))