import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useItemStore = defineStore('item', () => {
  // State
  const item: Ref<Movie | Series | undefined> = ref(undefined);

  // Actions
  const fetchItem = () => {
    try {
      return item.value;
    } catch (err) {
      console.error('Error fetching movies and series:', err);
    }
  };

  const setItem = (newItem: Movie | Series) => {
    item.value = newItem;
  };

  return {
    item,
    setItem,
    fetchItem
  };
});
