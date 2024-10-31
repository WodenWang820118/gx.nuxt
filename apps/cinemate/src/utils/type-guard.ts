import { MediaItem, Movie, Series } from './movie.interface';

export function isMovie(item: MediaItem): item is Movie {
  return 'release_date' in item && 'title' in item;
}

export function isSeries(item: MediaItem): item is Series {
  return 'first_air_date' in item && 'name' in item;
}
