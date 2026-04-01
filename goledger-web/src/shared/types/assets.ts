import type { TvShow } from "../../features/tv-shows/types";

export type AssetsCreation = Omit<TvShow, "@key">;