export interface Movie {
  id: number
  genre_ids: number[]
  original_language: string
  original_title: string
  title: string
  overview: string
  poster_path: string
  release_date: string
  popularity: number
  vote_average: number
  vote_count: number
  video: boolean
  adult: boolean
}

export interface Series {
  adult: boolean
  genre_ids: number[]
  id: number
  original_language: string
  original_name: string
  overview: string
  popularity: number,
  poster_path: string
  first_air_date: string,
  name: string
  vote_average: number
  vote_count: number
}

export interface TMDBResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

export type MediaItem = Movie | Series;
