<template>
  <div class="banner-list">
    <Banner v-for="person in persons" :key="person.id" :person="person" />
  </div>
</template>

<script setup>
import Banner from './Banner.vue';

defineProps({
  persons: {
    type: Array,
    required: true
  }
});
</script>

<style lang="scss" scoped>
.banner-list {
  display: none;

  @media screen and (width >= 768px) {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
}
</style>
