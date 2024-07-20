<template>
  <div :class="['main', {'justify-content-end': !selectedItem}]">
    <Card v-if="selectedItem" :selectedItem="selectedItem" @deselect-item="deselectItem" />
    <Chart v-if="jsonData" :chartData="jsonData" :selectedItem="selectedItem" @select-item="selectItem" />
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import Card from './Card.vue';
import Chart from './Chart.vue';

const selectedItem = ref(null);
const jsonData = ref(null);


// Select Item Method
const selectItem = (item) => {
  selectedItem.value = item;
};

// Deselect Item Method
const deselectItem = () => {
  selectedItem.value = null;
};

// Fetch Chart Data Method
const fetchChartData = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:3000/api/data');
    jsonData.value = response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};


onMounted(() => {
  fetchChartData();
});
</script>
