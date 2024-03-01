<template>
  <div class="card-actions">
    <div class="card-actions__buttons-container">
      <ThumbButton
        variant="up"
        :is-clickable="!hasVoted"
        :is-active="currentThumb === 'up'"
        @thumb-click="counterStore.setCurrentThumb(id, $event)"
      />
      <ThumbButton
        variant="down"
        :is-clickable="!hasVoted"
        :is-active="currentThumb === 'down'"
        @thumb-click="counterStore.setCurrentThumb(id, $event)"
      />
      <button
        data-test="vote-button"
        class="card-actions__vote-btn"
        :class="{ 'card-actions__vote-btn--disabled': !currentThumb }"
        :disabled="!currentThumb"
        @click="counterStore.setVote(id)"
      >
        {{ hasVoted ? 'Vote again' : 'Vote now' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from '../stores/counter';
import ThumbButton from './ThumbButton.vue';

defineProps({
  id: {
    type: String,
    required: true
  },
  currentThumb: {
    type: String,
    required: false
  },
  hasVoted: {
    type: Boolean,
    required: false
  }
});

const counterStore = useCounterStore();
</script>

<style lang="scss" scoped>
.card-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;

  &__buttons-container {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__vote-btn {
    font-size: 15px;
    line-height: 18px;
    width: 107px;
    height: 38px;
    color: white;
    background-color: rgba(0, 0, 0, 0.6);
    border: 1px solid white;
    cursor: pointer;

    &--disabled {
      background-color: rgba(48, 48, 48, 0.6);
      cursor: not-allowed;
    }
  }
}
</style>
