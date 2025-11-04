// src/composables/useStations.js
import { ref, onMounted } from 'vue';
import axios from 'axios';

export function useStations() {
  const stations = ref([]);
  const errorMessage = ref('');

  const fetchStations = async () => {
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await axios.get(baseUrl  + '/stations');
      stations.value = response.data.sort((a, b) => a.Name.localeCompare(b.Name));
      errorMessage.value = '';
    } catch (error) {
      console.error('Error fetching stations:', error);
      errorMessage.value = 'Failed to load stations. Please try again later.';
      stations.value = [];
    }
  };

  onMounted(fetchStations);

  return { stations, errorMessage };
}