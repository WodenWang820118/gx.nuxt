<template>
  <div>
    <nav class="border-gray-200 bg-gray-50 dark:bg-gray-900">
      <div class="mx-auto max-w-screen-xl px-4 py-3">
        <UHorizontalNavigation :links="navigationLinks">
          <template #default="{ link }">
            <!-- Logo section for the first link -->
            <div
              v-if="link.isLogo"
              class="flex items-center space-x-3"
            >
              <Icon
                name="uil:shop"
                size="20"
                color="red"
                aria-hidden="true"
              />
              <span class="self-center text-xl font-semibold dark:text-white">
                {{ link.label }}
              </span>
            </div>
            <!-- Profile Dropdown -->
            <template v-else-if="link.isProfile">
              <UDropdown
                :items="profileMenuItems"
                :popper="{ placement: 'bottom-end' }"
              >
                <span
                  class="group-hover:text-primary-500 relative flex cursor-pointer items-center gap-2"
                  >Profile</span
                >
              </UDropdown>
            </template>
            <!-- Regular navigation items -->
            <span
              v-else
              class="group-hover:text-primary-500 relative"
            >
              {{ link.label }}
            </span>
          </template>
        </UHorizontalNavigation>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
  import { usePublicNav } from './navigtaion.script';
  const { navigationLinks, profileMenuItems } = usePublicNav();
</script>
