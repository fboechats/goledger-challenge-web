import type { TvShow } from "../../features/tv-shows/types";

export type AssetsCreation = Omit<TvShow, "@key">;

export type AssetsDeletion = Pick<TvShow, "@key" | "@assetType">;