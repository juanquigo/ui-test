<template>
  <div class="selector">
    <p class="selector__title">Previous Rulings</p>
    <div class="selector__input">
      <div class="selector__item" @click="isMenuOpen = !isMenuOpen">
        <p>{{ currentSelected }}</p>
        <img src="../assets/img/arrow.svg" alt="icon of select input" />
      </div>
      <div v-if="isMenuOpen" class="selector__options">
        <div
          v-for="option in OPTIONS"
          :key="`select-opt-${option}`"
          class="selector__item"
          :data-test="`item-${option}`"
          @click="onSelect(option)"
        >
          <p>
            {{ option }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const OPTIONS = ['list', 'grid'];

const emit = defineEmits(['selected']);
const isMenuOpen = ref(false);
const currentSelected = ref(OPTIONS[0]);

function onSelect(type) {
  currentSelected.value = type;
  isMenuOpen.value = !isMenuOpen.value;
  emit('selected', type);
}
</script>

<style lang="scss" scoped>
.selector {
  margin-bottom: 24px;

  &__title {
    font-size: 24px;
    line-height: 28.8px;
    font-weight: 300;
    color: var(--color-dark-gray);
  }

  &__input {
    display: none;
  }

  @media screen and (width >= 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 173px;
      height: 36px;
      border: 2px solid black;
      user-select: none;
      cursor: pointer;
      background: white;

      & > p {
        width: 122px;
        text-align: center;
        font-size: 10.5px;
        line-height: 10.5px;
      }

      & > p::first-letter {
        text-transform: uppercase;
      }
    }

    &__input {
      display: block;
      position: relative;
    }

    &__options {
      position: absolute;
      z-index: 2;

      & > div:first-child {
        border-top-width: 0px;
        border-bottom-width: 0px;
      }
    }
  }

  @media screen and (width >= 1100px) {
    &__title {
      font-size: 45px;
      line-height: 54px;
    }

    &__item {
      & > p {
        font-size: 13.5px;
        line-height: 13.5px;
      }
    }
  }
}
</style>
