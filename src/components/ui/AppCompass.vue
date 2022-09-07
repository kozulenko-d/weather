<template>
  <div class="wind">
    <div class="wind__compass">
      <span class="wind__compass-sign wind__compass-sign--n">n</span>
      <span class="wind__compass-sign wind__compass-sign--e">e</span>
      <span class="wind__compass-sign wind__compass-sign--w">w</span>
      <span class="wind__compass-sign wind__compass-sign--s">s</span>
      <svg class="wind__circle">
        <circle cx="50%" cy="50%" r="40%"></circle>
      </svg>
      <svg class="wind__compass-arrow" :style="{ transform: `translateX(-50%) rotateZ(${windDirection}deg)` }">
        <line x1="5" y1="5" x2="5" y2="60"></line>
        <polygon points="5,0 2,8 5,5 8,8" />
        <circle cx="50%" cy="95%" r="4%"></circle>
      </svg>
      <p class="wind__compass-speed">
        {{ Math.round(wind?.speed) }}{{ speed }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useWeatherStore } from '@/stores/weather';

const weatherStore = useWeatherStore();
const { selectedUnit } = storeToRefs(weatherStore);

const props = defineProps({
  wind: {
    type: Object,
    required: true,
    description: 'Object containing wind‘s data',
  }
});

const { speed } = selectedUnit.value;
const windDirection = computed(() => (props?.wind?.deg + 180) || 0);
</script>

<style scoped lang="scss">
.wind {
  &__compass {
    width: 60px;
    height: 60px;
    position: relative;
    &-speed {
      font-size: 12px;
      text-align: center;
      line-height: 0.8;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
    &-sign {
      position: absolute;
      text-transform: uppercase;
      font-size: 8px;
      &--n {
        top: -8px;
        left: 50%;
        transform: translateX(-50%);
      }
      &--e {
        top: 50%;
        right: -4px;
        transform: translateY(-50%);
      }
      &--w {
        top: 50%;
        left: -6px;
        transform: translateY(-50%);
      }
      &--s {
        left: 50%;
        bottom: -8px;
        transform: translateX(-50%);
      }
    }
    &-arrow {
      width: 10px;
      height: 60px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      line {
        transform-origin: center;
        stroke: var(--main-color-text);
        stroke-dasharray: 35%, 48%;
      }
      polygon {
        fill: var(--main-color-text);
      }
      circle {
        fill: none;
        stroke: var(--main-color-text);
        stroke-width: 1px;
      }
    }
  }
  &__circle {
    position: absolute;
    width: 60px;
    height: 60px;
    circle {
      transform: rotateZ(0);
      transform-origin: center;
      fill: none;
      stroke: #fafafa88;
      stroke-width: 10%;
      stroke-dasharray: 1%, 3%;
    }
  }
}
</style>
