<template>
  <BaseNavbar />
  <BaseHeader />
  <div class="max-centered">
    <BaseContent>
      <Selector @selected="view = $event" />
      <template v-if="counterStore.mappedPersons.length > 0">
        <CardGrid v-if="view === 'grid'" :persons="counterStore.mappedPersons" />
        <BannerList v-else-if="view === 'list'" :persons="counterStore.mappedPersons" />
        <CardCarousel :persons="counterStore.mappedPersons" />
      </template>
    </BaseContent>
    <hr role="separator" />
    <BaseFooter />
  </div>
</template>

<script setup>
import BaseNavbar from './components/base/BaseNavbar.vue';
import BaseHeader from './components/base/BaseHeader.vue';
import BaseFooter from './components/base/BaseFooter.vue';
import BaseContent from './components/base/BaseContent.vue';
import CardGrid from './components/CardGrid.vue';
import BannerList from './components/BannerList.vue';
import CardCarousel from './components/CardCarousel.vue';
import Selector from './components/Selector.vue';
import { ref, onMounted } from 'vue';
import { useCounterStore } from './stores/counter';

const counterStore = useCounterStore();
const view = ref('list');

onMounted(async () => {
  await counterStore.getPersons();
});
</script>
