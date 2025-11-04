<template>
  <div>
    <h2>All Stations</h2>
    <div class="select is-rounded">
      <select id="station-select" v-model="selectedCode" @change="onStationSelect">
        <option value="" disabled>Please select a station</option>
        <option v-for="station in stations" :key="station.Code" :value="station.Code">
          {{ station.Name }}
        </option>
      </select>
    </div>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStations } from './composables/useStations';

const props = defineProps({
  selectedCode: String
});

const emit = defineEmits(['selectedCode']);

const { stations, errorMessage } = useStations();
const selectedCode = ref(props.selectedCode || '');

const onStationSelect = () => {
  console.log('Emitting selectedCode:', selectedCode.value);
  emit('selectedCode', selectedCode.value);
};
</script>

<style scoped>
.error {
  color: red;
}
</style>