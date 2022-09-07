import { defineStore } from 'pinia';
import { Http } from '@/api/instances';
import { defaultUnit } from '@/constants/units';
import { citiesMap } from '@/constants/cities';

export const useWeatherStore = defineStore({
  id: 'weather',
  state: () => ({
    selectedUnit: {...defaultUnit},
    weatherData: new Map(),
    cities: [...citiesMap],
    loading: false,
  }),
  getters: {
    getWeatherByCity: ({ weatherData }) => (cityId) => weatherData.has(cityId) ? weatherData.get(cityId) : {},
    selectedCities: ({ cities }) => cities.filter(city => city.selected),
  },
  actions: {
    async fetchWeatherInfo(cityObj = {}) {
      const { id } = cityObj;
      this.loading = true;
      try {
        const { data } = await Http.get('', {
          params: {
            id,
            units: this.selectedUnit.value,
          }
        });
        this.weatherData.set(id, data);
      } catch (e) {
        throw e;
      } finally {
        this.loading = false;
      }
    },
    changeUnit(unit) {
      this.selectedUnit = unit;
      location.reload();
    },
    toggleCitySelection(cityObj) {
      this.cities.find(city => city.id === cityObj.id).selected = !cityObj.selected;
    }
  },
});
