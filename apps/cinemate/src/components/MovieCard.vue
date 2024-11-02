<template>
  <UCard>
    <template #header>
      <div class="h-8">
        {{ title }}
      </div>
    </template>
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
    <p
      v-if="overview"
      class="inline-flex items-center break-all rounded-lg bg-blue-700 px-3 py-2 text-justify
        text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4
        focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700
        dark:focus:ring-blue-800"
    >
      {{ overview.slice(0, 75) }}...
    </p>
    <p
      v-else
      class="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-sm font-medium
        text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300
        dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      No overview available
    </p>
  </UCard>
</template>

<script setup lang="ts">
  import { useItemStore } from '../stores/item';
  import { Movie } from '../utils/movie.interface';
  import { Ref, ref } from 'vue';
  defineProps<Movie>();
  const imageUrl: Ref<string> = ref('https://image.tmdb.org/t/p/w500');
  const itemStore = useItemStore();
</script>
