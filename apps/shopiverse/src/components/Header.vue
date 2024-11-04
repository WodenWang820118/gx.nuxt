<template>
  <div>
    <PublicNav v-if="!user" />
    <UserNav v-else />
  </div>
</template>

<script setup lang="ts">
  const user = useSupabaseUser();
</script>
