<template>
  <div class="city-select-container">
    <p class="city-select-headline">
      Please, choose up to {{ quantityCitiesShown }} cities:
      <button
        class="city-select-headline__button"
        @click="toggleDropdown"
      ></button>
    </p>


    <ul
      class="city-select-list"
      :class="{'city-select-list--hide': !isDropdownActive}"
    >
      <li
        v-for="cityObj in cities"
        :key="cityObj.id"
        class="city-select-item"
        :class="{'city-select-item--disabled': isDisabled(cityObj.selected)}"
        @click="setCity(cityObj)"
      >
        <span class="city-select-item__name">{{ cityObj.name }}</span>
        <span class="city-select-item__indicator">{{ showIndicator(cityObj.selected) }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { quantityCitiesShown } from '@/constants/cities';
import { useWeatherStore } from '@/stores/weather';

const isDropdownActive = ref(false);
const weatherStore = useWeatherStore();

const { cities, selectedCities } = storeToRefs(weatherStore);

const toggleDropdown = () => isDropdownActive.value = !isDropdownActive.value;
const setCity = cityObj => {
  if (!cityObj.selected && selectedCities.value.length >= quantityCitiesShown) return;
  if (!cityObj.selected) weatherStore.fetchWeatherInfo(cityObj);
  weatherStore.toggleCitySelection(cityObj);
};
const showIndicator = selected => selected ? '✔︎' : '';
const isDisabled = selected => !selected && selectedCities.value.length >= quantityCitiesShown;
</script>

<style scoped lang="scss">
.city-select-container {
  color: var(--main-color-text);
  width: 124px;
  flex-shrink: 0;
}

.city-select-headline {
  padding: 4px;
  &__button {
    display: none;
  }
}

.city-select-list {
  padding: 0;
  overflow: hidden;
}

.city-select-item {
  $item: &;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px;
  list-style-type: none;
  cursor: pointer;
  border: 1px solid var(--main-color-text);
  border-bottom: 0;

  &__indicator {
    cursor: inherit;
    user-select: none;
    pointer-events: none;
  }

  &--disabled {
    user-select: none;
    pointer-events: none;
    #{$item}__name {
      opacity: .3;
    }
  }

  &:first-child {
    border-radius: 10px 10px 0 0;
  }

  &:last-child {
    border-radius: 0 0 10px 10px;
    border-bottom: 1px solid var(--main-color-text);
  }
}


@include breakpoint(small) {
  .city-select-container {
    width: 100%;
  }


  .city-select-headline {
    position: relative;
    &__button {
      display: block;
      width: 16px;
      height: 16px;
      border: 0;
      background: transparent;
      position: absolute;
      top: 8px;
      right: 0;
      cursor: pointer;
      &::after {
        content: '';
        width: 16px;
        height: 8px;
        border-top: 1px solid #fafafa;
        border-bottom: 1px solid #fafafa;
        position: absolute;
        top: 0;
        right: 0;
      }
      &::before {
        content: '';
        width: 8px;
        height: 8px;
        border-bottom: 1px solid #fafafa;
        position: absolute;
        bottom: 0;
        right: 0;
      }
    }
  }

  .city-select-list {
    &--hide {
      height: 0;
    }
  }
}

</style>

