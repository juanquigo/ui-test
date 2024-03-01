<template>
  <div class="card" :style="{ backgroundImage: `url(${person.picture})` }">
    <div class="card__container">
      <div class="card__title-container">
        <ThumbButton :variant="person.votes.positive > person.votes.negative ? 'up' : 'down'" />
        <p class="card__text card__text--clamp card__title">
          {{ person.name }}
        </p>
      </div>
      <div class="card__body">
        <p class="card__text card__text--clamp card__description">
          {{ person.description }}
        </p>
        <p class="card__text card__date" data-test="card-message">
          {{ person.hasVoted ? 'Thank you for your vote!' : person.info }}
        </p>
        <CardActions
          :id="person.id"
          :current-thumb="person.currentThumb"
          :has-voted="person.hasVoted"
        />
      </div>
      <GaugeBar :votes="person.votes" />
    </div>
  </div>
</template>

<script setup>
import ThumbButton from './ThumbButton.vue';
import CardActions from './CardActions.vue';
import GaugeBar from './GaugeBar.vue';

defineProps({
  person: {
    type: Object,
    required: true
  }
});
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 300px;
  height: 300px;
  background-size: cover;
  position: relative;
  scroll-snap-align: center;

  &:first-child {
    margin-left: 36px;
  }

  &:last-child {
    margin-right: 36px;
  }

  &__container {
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.6) 100%);
  }

  &__title-container {
    display: flex;
    align-items: flex-end;
    gap: 6px;
  }

  &__text {
    color: white;

    &--clamp {
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }

  &__title {
    width: 240px;
    font-size: 30px;
    line-height: 36px;
  }

  &__description {
    width: 228px;
    font-size: 15px;
    line-height: 18px;
  }

  &__description-container {
    margin-top: 7px;
  }

  &__body {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 12px;
    margin-top: 7px;
    padding: 0 36px;
  }

  &__date {
    font-size: 12px;
    line-height: 14.4px;
    font-weight: 700;
  }

  @media screen and (width >= 500px) {
    width: 351px;
    height: 351px;
    margin: 0 auto;

    &:first-child {
      margin-left: 0px;
    }

    &:last-child {
      margin-right: 0px;
    }

    &__title {
      width: 280px;
    }

    &__description {
      width: 280px;
    }
  }

  @media screen and (width >= 1100px) {
    width: 348px;
    height: 348px;

    &__title {
      font-size: 36px;
      line-height: 40px;
    }
  }
}
</style>
