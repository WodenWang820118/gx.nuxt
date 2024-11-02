<template>
  <div
    class="mx-auto flex max-w-7xl flex-col gap-8 p-6 md:p-8 lg:flex-row lg:p-10"
  >
    <!-- Poster Section -->
    <div class="lg:w-1/3">
      <img
        :src="`https://image.tmdb.org/t/p/w500${poster_path}`"
        :alt="title"
        class="h-auto w-full rounded-xl object-cover shadow-lg"
        loading="lazy"
      />
    </div>

    <!-- Content Section -->
    <div class="space-y-6 lg:w-2/3">
      <!-- Header -->
      <div class="space-y-4">
        <h1
          class="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white"
        >
          {{ title }}
        </h1>
        <div
          class="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300"
        >
          <span class="flex items-center gap-2">
            <UIcon name="i-heroicons-calendar" />
            {{ new Date(release_date).getFullYear() }}
          </span>
          <span class="flex items-center gap-2">
            <UIcon
              name="i-heroicons-star"
              class="text-yellow-400"
            />
            {{ vote_average.toFixed(1) }}/10
          </span>
          <span class="flex items-center gap-2">
            <UIcon name="i-heroicons-users" />
            {{ vote_count.toLocaleString() }} votes
          </span>
          <span class="uppercase">{{ original_language }}</span>
        </div>
      </div>

      <!-- Overview -->
      <div class="space-y-2">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white"
          >Overview</h2
        >
        <p class="leading-relaxed text-gray-700 dark:text-gray-300">
          {{ overview }}
        </p>
      </div>

      <!-- Additional Details -->
      <div class="grid grid-cols-1 gap-4 pt-4 md:grid-cols-2">
        <div class="space-y-2">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white"
            >Details</h3
          >
          <ul class="space-y-2 text-gray-700 dark:text-gray-300">
            <li class="flex items-center gap-2">
              <span class="font-medium">Original Title:</span>
              {{ original_title }}
            </li>
            <li class="flex items-center gap-2">
              <span class="font-medium">Popularity:</span>
              {{ popularity.toFixed(1) }}
            </li>
            <li class="flex items-center gap-2">
              <span class="font-medium">Adult Content:</span>
              {{ adult ? 'Yes' : 'No' }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { Movie } from '../utils/movie.interface';
  defineProps<Movie>();
</script>
