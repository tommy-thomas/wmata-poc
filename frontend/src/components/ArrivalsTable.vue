<template>
    <div class="table-container" style="margin-top: 1.25em;">
      <h3>{{ title }}</h3>
      <table class="table">
        <thead>
          <tr>
            <th v-for="col in columns" :key="col.key">
              {{ col.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="index">
            <td v-for="col in columns" :key="col.key">
              <slot :name="`cell-${col.key}`" :item="item" :value="item[col.key]">
                {{ item[col.key] }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
      
      <div v-if="lastUpdated" class="last-updated">
        <slot name="footer" :lastUpdated="lastUpdated">
          <p>Last Updated: {{ lastUpdated }}</p>
        </slot>
      </div>

    </div>
  </template>
  
  <script setup>
  defineProps({
    title: {
      type: String,
      default: 'Next Train'
    },
    items: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      required: true
    },
    lastUpdated: {
      type: String,
      default: null
    }
  });
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  th {
    background-color: #f2f2f2;
  }
  
  .last-updated {
    margin-top: 1rem;
    font-size: 0.9em;
    color: #666;
  }
  </style>