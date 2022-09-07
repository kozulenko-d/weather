<template>
  <div id="app">
    <AppHeader />
    <main class="main-container">
      <CityList />
      <div class="city-cards-container">
        <CityCard
          v-for="city in selectedCities"
          :key="city.id"
          :city="city"
        />
      </div>
    </main>
    <AppLoader v-if="loading" full-screen />
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import AppHeader from '@/components/AppHeader.vue';
import AppLoader from '@/components/ui/AppLoader.vue';
import CityCard from '@/components/CityCard.vue';
import CityList from '@/components/CityList.vue';
import { useWeatherStore } from '@/stores/weather';

const weatherStore = useWeatherStore();
const { loading, selectedCities } = storeToRefs(weatherStore);
Promise.all(selectedCities.value.map(city => weatherStore.fetchWeatherInfo(city)));
</script>

<style lang="scss">

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;

  font-weight: normal;
  position: relative;


  @include breakpoint(desktop) {
    max-width: 1240px;
  }

  @include breakpoint(large-tablet) {
    max-width: 940px;
  }

  @include breakpoint(tablet) {
    max-width: 740px;
  }

  @include breakpoint(small) {
    max-width: 520px;
  }

  @include breakpoint(xsmall) {
    max-width: 380px;
  }
}

.main-container {
  position: relative;
  margin-bottom: 40px;
  z-index: 400;
  display: flex;
  gap: var(--flex-gap);
  flex-wrap: nowrap;

  @include breakpoint(small) {
    flex-wrap: wrap;
  }
}

.city-cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: var(--flex-gap);
  flex-grow: 1;
}
</style>
