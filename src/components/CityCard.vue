<template>
  <div class="city-card">
    <div class="city-card__text">
      <p class="city-card__name">{{ cityName }}</p>
    </div>
    <div class="city-card__main">
      <p class="city-card__temperature">{{ `${ temperature }${ temperatureUnit }` }}</p>
      <img class="city-card__picture" :src="weatherIconSource" :alt="weatherIconDescription">
      <p class="city-card__description">{{ weatherIconDescription }}</p>
    </div>
    <div class="city-card__footer">
      <div class="city-card__precipitation-info">
        <span>{{ precipitation }}</span>
        <span v-if="windInfo?.gust">Wind gust: {{ Math.round(windInfo?.gust) }}{{ speed }}</span>
      </div>
      <AppCompass :wind="windInfo" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useWeatherStore } from '@/stores/weather';
import AppCompass from '@/components/ui/AppCompass.vue';

const props = defineProps({
  city: {
    type: Object,
    required: true,
    description: 'Object containing city‘s data',
  }
});

const weatherStore = useWeatherStore();
const { getWeatherByCity, selectedUnit, cities } = storeToRefs(weatherStore);

const cityInfo = computed(() => getWeatherByCity.value(props?.city.id)) || {};
const cityName = computed(() => cities.value.find(item => item.id === props?.city.id)?.name) || '';
const temperature = computed(() => Math.round(cityInfo.value?.main?.temp) || '');
const currentWeather = computed(() => cityInfo.value?.weather?.[0] || {});
const weatherIconDescription = computed(() => currentWeather.value?.description || '');
const weatherIconSource = computed(() => {
  const { icon } = currentWeather.value || {};
  return icon ? `https://openweathermap.org/img/wn/${icon}@2x.png` : '';
});

const windInfo = computed(() => getWeatherByCity.value(props?.city.id)?.wind || {});
const rainInfo = computed(() => getWeatherByCity.value(props?.city.id)?.rain || {});
const snowInfo = computed(() => getWeatherByCity.value(props?.city.id)?.snow || {});

const precipitation = computed(() => {
  const result = [];
  if (rainInfo.value.hasOwnProperty('1h')) result.push(`Rain ${Math.round(rainInfo.value?.['1h'])}mm`);
  if (snowInfo.value.hasOwnProperty('1h')) result.push(`Snow ${Math.round(snowInfo.value?.['1h'])}mm`);
  if (!rainInfo.value.hasOwnProperty('1h') && !snowInfo.value.hasOwnProperty('1h')) result.push('No precipitation');
  return result.join(', ');
});
const { name: temperatureUnit, speed } = selectedUnit.value;
</script>

<style scoped lang="scss">
.city-card {
  display: flex;
  flex-direction: column;
  width: calc(33.333% - calc(var(--flex-gap) * 2 / 3));
  height: 340px;
  color: var(--main-color-text);
  text-shadow: var(--text-shadow) 0 0 5px;
  box-shadow: var(--main-color-text) 0 0 5px;
  border-radius: 8px;
  padding: 8px 16px;
  background-color: rgba(255, 255, 255, 0.1);

  &__text {
    text-align: center;
  }

  &__name {
    font-size: 36px;
  }

  &__main {
    flex: 2 0 50%;
    position: relative;
    isolation: isolate;
    text-align: center;
  }

  &__temperature {
    top: 50%;
    transform: translateY(calc(-50%));
    font-size: 50px;
    z-index: 1;
  }

  &__picture {
    position: absolute;
    top: 24%;
    left: 44%;
    z-index: 0;
  }

  &__description {
    position: relative;
    top: 64px;
    left: 4px;
    &:first-letter {
      text-transform: capitalize;
    }
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    flex: 1 0 0%;
  }

  &__precipitation-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}

@include breakpoint(small-desktop) {
  .city-card {
    width: calc(50% - calc(var(--flex-gap) / 2));
    height: 300px;

    &__description {
      top: 40px;
    }
  }
}

@include breakpoint(tablet) {
  .city-card {
    width: 100%;
  }
}
</style>
