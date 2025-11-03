<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else-if="arrivals"">
      <!-- Display your fetched data -->
      <ul>
            <li v-for="arrival in arrivals" :key="arrival.DestinationCode">
               {{ arrival.Destination }}
            </li>
        </ul>
    </div>
    <div v-else>No selection made</div>
  </div>
</template>


<script setup>
import { ref, watch, onMounted } from 'vue';
import axios from 'axios'; // or use native fetch

const arrivals = ref(null);
const loading = ref(false);
const error = ref(null);

console.log("Arrivals");

const props = defineProps({
  selectedCode: String
});

const fetchArrivals = async (code) => {
  try {
      const response = await axios.get(`/api/stations/${code}`);
      arrivals.value = await response.data.slice().sort((a, b) => a.Group.localeCompare(b.Group));
      console.log("Arrivals:" + arrivals.value);
    } catch (e) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
}

const errorMessage = ref('');

// Watch for station changes and fetch data
watch(() => props.selectedCode, async (code) => {
    console.log("Watch triggered!");
  if (!code) return;
  
  console.log('Watch triggered!', { code});
  
  fetchArrivals(code);

  loading.value = true;
  error.value = null;
  
 
}, { immediate: true });
</script>