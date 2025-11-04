<template>
  <LoadingState 
    :loading="loading" 
    :error="error" 
    :data="arrivals"
    loading-text="Loading arrivals..."
    empty-text="No arrivals found"
  >
    <ArrivalsTable
      title="Next Train"
      :items="arrivals"
      :columns="columns"
      :last-updated="lastUpdated"
    >
      <!-- Optional: Custom cell formatting -->
      <template #cell-Min="{ value }">
        <span :class="{ 'urgent': parseInt(value) <= 2 }">
          {{ value }}
        </span>
      </template>
    </ArrivalsTable>
  </LoadingState>
</template>

<script setup>
import { watch } from 'vue';
import { useArrivals } from './composables/useArrivals';
import { usePolling } from './composables/usePolling';
import ArrivalsTable from './ArrivalsTable.vue';
import LoadingState from './LoadingState.vue';

const props = defineProps({
  selectedCode: {
    type: String,
    required: true,
  },
  pollInterval: {
    type: Number,
    default: 5000
  }
});

// Use composables
const { arrivals, loading, error, lastUpdated, fetchArrivals } = useArrivals();
const { startPolling, stopPolling, restartPolling } = usePolling(
  () => fetchArrivals(props.selectedCode),
  props.pollInterval
);

// Table configuration
const columns = [
  { key: 'Line', label: 'Line' },
  { key: 'Car', label: 'Cars' },
  { key: 'DestinationName', label: 'Destination' },
  { key: 'Min', label: 'Minutes' }
];

// Watch for station code changes
watch(
  () => props.selectedCode,
  (code) => {
    if (code) {
      restartPolling();
    } else {
      stopPolling();
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.urgent {
  color: #d32f2f;
  font-weight: bold;
}
</style>