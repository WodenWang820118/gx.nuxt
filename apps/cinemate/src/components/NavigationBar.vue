<template>
  <UHorizontalNavigation
    :links="headerLinks"
    class="border-b border-gray-200 dark:border-gray-800"
  />
</template>

<script setup lang="ts">
  const headerLinks = [
    {
      label: 'Cinemate',
      labelClass: 'text-2xl font-bold pl-14 mx-4'
    },
    {
      label: 'Home',
      to: '/',
      icon: 'i-heroicons-home'
    },
    {
      label: 'Search',
      to: '/search',
      icon: 'i-heroicons-magnifying-glass'
    },
    {
      label: 'Popular',
      to: '/popular',
      icon: 'i-heroicons-fire'
    },
    {
      label: 'Playing',
      to: '/now-playing',
      icon: 'i-heroicons-play'
    },
    {
      label: 'Top Rated',
      to: '/top-rated',
      icon: 'i-heroicons-star'
    },
    {
      label: 'Upcoming',
      to: '/upcoming',
      icon: 'i-heroicons-calendar'
    }
  ];
</script>
