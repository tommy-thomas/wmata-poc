// src/components/ProductList.vue
<script setup>
import { ref,computed, onMounted } from 'vue';
import axios from 'axios'; // or use native fetch

const stations = ref(null);
const selectedStation = ref('');
const errorMessage = ref('');

const fetchStations = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/stations'); // Adjust URL as needed
        stations.value = response.data.slice().sort((a, b) => a.Name.localeCompare(b.Name));        
    } catch (error) {
        console.error('Error fetching stations:', error);
        errorMessage.value = 'Failed to load stations. Please try again later.';
    }
}

onMounted(() => {
  fetchStations();
});

</script>

<template>
    <h1>All Stations</h1>
    <div>
      <!-- <label for="station-select">All Stations</label> -->
      <select id="station-select" v-model="selectedStation">
        <option value="" disabled>Please select one</option>
        <option v-for="station in stations" :key="station.Code" :value="station.Code">
          {{ station.Name }}
        </option>
      </select>
      <p v-if="selectedStation">You selected: {{ selectedStation }}</p>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </template>