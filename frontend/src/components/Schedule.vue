<template>
  <div class="header">
      <img src="../assets/rail.png" alt="logo" />
     <h1 class="title">WMATA POC</h1>
  </div>
 
  <div>
    <StationList @selectedCode="handleStationSelect" />

    <div v-if="selectedCode">
      <ArrivalList :selected-code="selectedCode" :key="selectedCode" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import StationList from './StationList.vue';
import ArrivalList from './Arrivals.vue';

const selectedCode = ref('');

const handleStationSelect = (value) => {
  console.log('Parent received selectedCode:', value);
  selectedCode.value = value;
};
</script>

<style>
/* Global styles */
body {
  margin-top: 1.5em;
}

.header img {
  float: left;
  width: 6.25em;
  height: 6.25em;
}

.header h1 {
  position: relative;
  top: 1.3em;
  left: .625em;
  margin-bottom: 100px;
}
</style>