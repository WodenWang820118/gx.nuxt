<template>
  <div
    class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  >
    <NuxtLink
      :to="`/item/${title}`"
      @click="
        itemStore.setItem({
          id: id,
          title: title,
          poster_path: poster_path,
          overview: overview,
          release_date: release_date,
          popularity: popularity,
          original_language: original_language,
          adult: adult,
          vote_average: vote_average,
          vote_count: vote_count,
          video: video,
          genre_ids: genre_ids,
          original_title: original_title
        })
      "
    >
      <img
        class="rounded-t-lg"
        :src="`${imageUrl}${poster_path}`"
        alt="Movie Image"
      />
    </NuxtLink>
    <div class="p-5">
      <span href="#">
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {{ title }}
        </h5>
      </span>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Release Date: {{ release_date }}
      </p>
      <p
        v-if="overview"
        class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {{ overview.slice(0, 75) }}...
      </p>
      <p
        v-else
        class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        No overview available
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useItemStore } from '../stores/item';
import { Movie } from '../utils/movie.interface';
defineProps<Movie>();
const imageUrl: Ref<string> = ref('https://image.tmdb.org/t/p/w500');
const itemStore = useItemStore();
</script>
