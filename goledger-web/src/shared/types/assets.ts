import type { Season } from "../../features/seasons/services";
import type { TvShow } from "../../features/tv-shows/types";

export type AssetsCreate = Omit<TvShow, "@key"> | Omit<Season, "@key">;

export type AssetsRead = Pick<TvShow, "@key">;

export type AssetsDelete = Pick<TvShow, "@key" | "@assetType"> | Pick<Season, "@key" | "@assetType">;

export type AssetsUpdate = Pick<TvShow, "@key" | "description"> | Pick<Season, "@key" | 'year'>;