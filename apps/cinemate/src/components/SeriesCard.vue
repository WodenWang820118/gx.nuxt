<template>
  <div
    class="max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700
      dark:bg-gray-800"
  >
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
    <div class="p-5">
      <span href="#">
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {{ name }}
        </h5>
      </span>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
        First air Date: {{ first_air_date }}
      </p>
      <p
        v-if="overview"
        class="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm
          font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4
          focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700
          dark:focus:ring-blue-800"
      >
        {{ overview }}
      </p>
      <p
        v-else
        class="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm
          font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4
          focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700
          dark:focus:ring-blue-800"
      >
        No overview available
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Series } from '../utils/movie.interface';
  import { useItemStore } from '../stores/item';
  import { Ref, ref } from 'vue';
  defineProps<Series>();

  const imageUrl: Ref<string> = ref('https://image.tmdb.org/t/p/w500');
  const itemStore = useItemStore();
</script>
