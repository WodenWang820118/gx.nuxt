<template>
  <UCard>
    <template #header>
      <div class="h-8">
        {{ name }}
      </div>
    </template>
    <NuxtLink
      :to="`/item/${name}`"
      @click="
        itemStore.setItem({
          id: id,
          name: name,
          poster_path: poster_path,
          first_air_date: first_air_date,
          overview: overview,
          genre_ids: genre_ids,
          original_name: original_name,
          adult: adult,
          vote_average: vote_average,
          vote_count: vote_count,
          original_language: original_language,
          popularity: popularity
        })
      "
    >
      <img
        class="rounded-t-lg"
        :src="`${imageUrl}${poster_path}`"
        alt="item Image"
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
  import { Series } from '../utils/movie.interface';
  import { useItemStore } from '../stores/item';
  import { Ref, ref } from 'vue';
  defineProps<Series>();

  const imageUrl: Ref<string> = ref('https://image.tmdb.org/t/p/w500');
  const itemStore = useItemStore();
</script>
