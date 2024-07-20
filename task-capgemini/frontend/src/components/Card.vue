<template>
  <div class="card">
    <div>
      <h3>{{ selectedItem.name }}</h3>
      <div>{{ selectedItem.description }}</div>
    </div>
    <div><button @click="$emit('deselect-item')" class="btn-icon"><CloseIcon /></button></div>
  </div>
</template>

<script setup>
import CloseIcon from './icons/IconClose.vue';
import { defineProps } from 'vue';

const props = defineProps({
  selectedItem: Object
});
</script>
