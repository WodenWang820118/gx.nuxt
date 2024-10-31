<template>
  <div>
    <MovieCard
      v-if="item && isMovie(item)"
      v-bind="getMovieProps(item)"
    />

    <SeriesCard
      v-if="item && isSeries(item)"
      v-bind="getSeriesProps(item)"
    />
  </div>
</template>

<script setup lang="ts">
  import { useItemStore } from '../../stores/item';
  import { Series, Movie } from '../../utils/movie.interface';
  import { ref, Ref, onMounted } from 'vue';
  const itemStore = useItemStore();
  const item: Ref<(Movie | Series) | undefined> = ref(undefined);
  function getMovieProps(movie: Movie) {
    return {
      id: movie.id,
      poster_path: movie.poster_path,
      title: movie.title,
      overview: movie.overview,
      release_date: movie.release_date,
      popularity: movie.popularity,
      item: movie,
      original_language: movie.original_language,
      adult: movie.adult,
      vote_average: movie.vote_average,
      vote_count: movie.vote_count,
      video: movie.video,
      genre_ids: movie.genre_ids,
      original_title: movie.original_title
    };
  }

  function getSeriesProps(series: Series) {
    return {
      id: series.id,
      poster_path: series.poster_path,
      name: series.name,
      overview: series.overview,
      first_air_date: series.first_air_date,
      popularity: series.popularity,
      item: series,
      original_language: series.original_language,
      adult: series.adult,
      vote_average: series.vote_average,
      vote_count: series.vote_count,
      genre_ids: series.genre_ids,
      original_name: series.original_name
    };
  }

  onMounted(() => {
    item.value = itemStore.fetchItem();
  });
</script>
