<template>
  <div class="card-grid">
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
.card-grid {
  display: none;

  @media screen and (width >= 768px) {
    display: grid;
    gap: 21px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media screen and (width >= 1100px) {
    gap: 27px;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
