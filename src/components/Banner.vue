<template>
  <div class="card-banner">
    <div class="card-banner__image" :style="{ backgroundImage: `url(${person.picture})` }"></div>
    <div class="card-banner__container">
      <div class="card-banner__details">
        <ThumbButton :variant="person.votes.positive > person.votes.negative ? 'up' : 'down'" />
        <div>
          <p class="card-banner__text card-banner__text--clamp card-banner__title">
            {{ person.name }}
          </p>
          <p class="card-banner__text card-banner__text--clamp card-banner__description">
            {{ person.description }}
          </p>
        </div>
      </div>
      <div class="card-banner__actions">
        <p class="card-banner__text card-banner__date" data-test="banner-message">
          {{ person.hasVoted ? 'Thank you for your vote!' : person.info }}
        </p>
        <CardActions
          :id="person.id"
          :current-thumb="person.currentThumb"
          :has-voted="person.hasVoted"
        />
      </div>
      <div class="card-banner__gauge-bar">
        <GaugeBar :votes="person.votes" />
      </div>
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

<style lang="scss">
.card-banner {
  position: relative;
  width: 100%;
  height: 138px;

  &__gauge-bar {
    position: absolute;
    bottom: 0;
    width: 100%;
  }

  &__image {
    position: absolute;
    width: 145px;
    height: 138px;
    background-size: cover;
    background-repeat: no-repeat;
  }

  &__container {
    position: absolute;
    display: flex;
    flex-wrap: wrap;
    gap: 28px;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.0001) 0%,
      #888888 19.79%,
      #666666 50%,
      rgba(51, 51, 51, 0.6) 71.88%
    );
  }

  &__details {
    display: flex;
    gap: 128px;
  }

  &__text {
    color: white;

    &--clamp {
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }
  }

  &__title {
    font-size: 28px;
    line-height: 33.6px;
    width: 290px;
    -webkit-line-clamp: 1;
  }

  &__description {
    margin-top: 18px;
    font-size: 14px;
    line-height: 16.8px;
    width: 316px;
    -webkit-line-clamp: 2;
  }

  &__date {
    font-size: 12px;
    line-height: 14.4px;
    font-weight: 700;
  }

  &__actions {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 12px;
    padding-right: 12px;
    padding-top: 8px;
  }

  @media screen and (width >= 1100px) {
    height: 170px;

    &__image {
      width: 216px;
      height: 170px;
    }

    &__title {
      font-size: 36px;
      line-height: 63px;
      width: 490px;
    }

    &__actions {
      padding-right: 14px;
    }

    &__description {
      margin-top: 1px;
      font-size: 18px;
      line-height: 21.6px;
      width: 600px;
    }

    &__details {
      gap: 214px;
    }

    &__container {
      gap: 43px;
    }
  }
}
</style>
