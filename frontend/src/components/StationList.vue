
<template>
    <h1>All Stations</h1>
    <div>
      <!-- <label for="station-select">All Stations</label> -->
      <select @change="onStationSelect" id="selected-code" v-model="selectedCode">
        <option value="" disabled>Please select station</option>
        <option v-for="station in stations" :key="station.Code" :value="station.Code">
          {{ station.Name }}
        </option>
      </select>
      <p v-if="selectedCode">You selected: {{ selectedCode }}</p>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </template>

<script setup>
import { ref , onMounted } from 'vue';
import axios from 'axios'; // or use native fetch

const stations = ref(null);
const selectedCode = ref(null);
const emit = defineEmits(['selected-code']);
const errorMessage = ref('');

const onStationSelect = () => {
  emit('selected-code', selectedCode.value);
};

const fetchStations = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/stations');
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
