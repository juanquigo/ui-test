<template>
  <div v-if="votes.total > 0" class="gauge-bar">
    <div
      v-if="parseFloat(percentages.positive) > 0"
      class="gauge-bar__item gauge-bar__item--up"
      :style="{ width: percentages.positive }"
    >
      <!-- <img src="../assets/img/thumbs-up.svg" alt="gauge bar thumbs up" /> -->
      <p class="gauge-bar__text">
        {{ percentages.positive }}
      </p>
    </div>
    <div
      v-if="parseFloat(percentages.negative) > 0"
      class="gauge-bar__item gauge-bar__item--down"
      :style="{ width: percentages.negative }"
    >
      <p class="gauge-bar__text">
        {{ percentages.negative }}
      </p>
      <!-- <img src="../assets/img/thumbs-down.svg" alt="gauge bar thumbs down" /> -->
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  votes: {
    type: Object,
    required: true
  }
});

const percentages = computed(() => {
  const {
    votes: { positive, negative, total }
  } = props;

  return {
    positive: `${((positive / total) * 100).toFixed(2) * 1}%`,
    negative: `${((negative / total) * 100).toFixed(2) * 1}%`
  };
});
</script>

<style lang="scss">
.gauge-bar {
  display: flex;
  width: 100%;
  height: 36px;

  &__item {
    display: flex;
    align-items: center;
    gap: 6px;
    min-width: max-content;
    padding: 0px 12px;

    &--up {
      width: 25.5%;
      justify-content: flex-start;
      background-color: rgba(var(--color-green-positive), 0.6);
    }

    &--down {
      width: 74.5%;
      justify-content: flex-end;
      background-color: rgba(var(--color-yellow-negative), 0.6);
    }
  }

  &__text {
    font-size: 18px;
    line-height: 21.6px;
    color: white;
  }
}
</style>
