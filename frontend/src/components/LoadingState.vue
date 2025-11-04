<template>
    <div>
      <slot v-if="loading" name="loading">
        <div class="loading">{{ loadingText }}</div>
      </slot>
      
      <slot v-else-if="error" name="error" :error="error">
        <div class="error">Error: {{ error }}</div>
      </slot>
      
      <slot v-else-if="!data || (Array.isArray(data) && data.length === 0)" name="empty">
        <div class="empty">{{ emptyText }}</div>
      </slot>
      
      <slot v-else :data="data"></slot>
    </div>
  </template>
  
  <script setup>
  defineProps({
    loading: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: null
    },
    data: {
      type: [Array, Object],
      default: null
    },
    loadingText: {
      type: String,
      default: 'Loading...'
    },
    emptyText: {
      type: String,
      default: 'No data found'
    }
  });
  </script>
  
  <style scoped>
  .loading, .error, .empty {
    padding: 1rem;
    text-align: center;
  }
  
  .error {
    color: #d32f2f;
  }
  
  .empty {
    color: #666;
  }
  </style>