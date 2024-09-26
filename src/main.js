import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router';
import { createI18n } from 'vue-i18n';

// Importer les fichiers de traduction
import english from './translate/english.json';
import french from './translate/french.json';

const i18n = createI18n({
  locale: 'fr', // Langue par défaut
  fallbackLocale: 'en', // Langue de repli
  messages: {
    en: english,
    fr: french,
  }
});


const app = createApp(App);
app.use(createPinia());
app.use(i18n);
app.use(router);
app.mount('#app');
