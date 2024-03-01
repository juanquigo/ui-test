<template>
  <button
    class="thumb-button"
    :class="cardClasses"
    :aria-label="`thumbs ${variant}`"
    @click="onThumbClicked"
  >
    <img :src="thumbAssetUrl" :alt="`thumbs ${variant}`" />
  </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    required: false,
    default: 'down',
    validator: (value) => ['up', 'down'].includes(value)
  },
  isClickable: {
    type: Boolean,
    required: false,
    default: true
  },
  isActive: {
    type: Boolean,
    required: false,
    default: false
  }
});
const emit = defineEmits(['thumb-click']);

const cardClasses = computed(() => {
  const classes = [
    {
      up: 'thumb-button--up',
      down: 'thumb-button--down'
    }[props.variant]
  ];

  if (props.isActive) {
    classes.push('thumb-button--active');
  }

  if (!props.isClickable) {
    classes.push('thumb-button--not-clickable');
  }

  return classes;
});

const thumbAssetUrl = computed(
  () => new URL(`../assets/img/thumbs-${props.variant}.svg`, import.meta.url).href
);

const onThumbClicked = () => {
  if (!props.isClickable) {
    return;
  }

  emit('thumb-click', props.isActive ? null : props.variant);
};
</script>

<style lang="scss" scoped>
.thumb-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border: none;
  opacity: 80%;

  &:hover {
    cursor: pointer;
  }

  &--active {
    border: 2px solid white;
  }

  &--not-clickable {
    pointer-events: none;
  }

  &:hover,
  &--active,
  &--not-clickable {
    opacity: 100%;
  }

  &--up {
    background-color: rgb(var(--color-green-positive));
  }

  &--down {
    background-color: rgb(var(--color-yellow-negative));
  }
}
</style>
