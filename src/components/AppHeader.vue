<template>
  <header class="app-header">
    <div class="wrapper">
      <div class="main-banner">
        <p class="app-name">Weather app</p>

        <div class="units">
          <button
            v-for="unit in units"
            :key="unit.value"
            class="units__item"
            :class="{ 'units__item--active': selectedUnit.value === unit.value }"
            @click="changeUnit(unit)"
          >
            {{ unit.name }}
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useWeatherStore } from '@/stores/weather';
import { units } from '@/constants/units';

const weatherStore = useWeatherStore();
const { changeUnit, selectedUnit } = weatherStore;
</script>

<style scoped lang="scss">

.app-header {
  display: flex;
  line-height: 1.5;
  height: 100px;

  & .wrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}

.main-banner {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.app-name {
  color: var(--main-color-text);
  font-weight: 500;
  font-size: 2.6rem;
  text-transform: uppercase;
}

.units {
  display: flex;
  align-items: baseline;
  &__item {
    background: transparent;
    width: 30px;
    height: 30px;
    margin-left: 10px;
    padding: 0;
    font-size: 14px;
    border: 0;
    color: var(--main-color-text);
    cursor: pointer;
    &--active {
      font-size: 26px;
      pointer-events: none;
      cursor: default;
    }
  }
}


@include breakpoint(small) {
  .app-name {
    font-size: 1.6rem;
  }
  .units {
    flex-direction: column;
  }
}
</style>
