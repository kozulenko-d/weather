import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

import { replacer, reviver } from '@/utils/mapObjectHelpers';

const pinia = createPinia();

// Persisted state plugin
pinia.use(({ store}) => {
  const { $id: storeId } = store;
  const fromStorage = JSON.parse(localStorage.getItem(storeId), reviver);

  if (fromStorage) {
    store.$patch(fromStorage);
  }

  store.$subscribe((mutation, state) => {
    localStorage.setItem(storeId, JSON.stringify(state, replacer));
  });
});

const app = createApp(App)
  .use(pinia)

app.mount('#app')
