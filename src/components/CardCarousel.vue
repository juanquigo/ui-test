<template>
  <div class="card-carousel">
    <Card v-for="person in persons" :key="person.id" :person="person" />
  </div>
</template>

<script setup>
import Card from './Card.vue';

defineProps({
  persons: {
    type: Array,
    required: true
  }
});
</script>

<style lang="scss" scoped>
.card-carousel {
  display: flex;
  gap: 6px;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-snap-type: x proximity;
  margin: 0 -36px;
  padding: 0 -36px;

  @media screen and (width >= 768px) {
    display: none;
  }
}
</style>
