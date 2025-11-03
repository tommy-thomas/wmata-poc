<!-- ParentComponent.vue -->
<template>
    <div>
      <StationList @selected-code="handleStationSelect" />
      <ArrivalList
        v-if="selectedCode" 
        :selected-code="selectedCode"
        :key="selectedCode"
      />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import StationList from './StationList.vue';
  import ArrivalList from './ArrivalList.vue';
  
  const selectedCode = ref(null);
  
  const handleStationSelect = (value) => {
    selectedCode.value = value;    
  };
  </script>