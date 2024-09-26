// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap/dist/js/bootstrap.js'
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// import { fas } from '@fortawesome/free-solid-svg-icons'
// library.add(fas);
// import { fab } from '@fortawesome/free-brands-svg-icons';
// library.add(fab);
// import { far } from '@fortawesome/free-regular-svg-icons';
// library.add(far);
// import { dom } from "@fortawesome/fontawesome-svg-core";
// dom.watch();

// import { createApp } from 'vue'
// import App from './App.vue'
// import { createPinia } from 'pinia'
// import router from '@router'

// const app =createApp(App)
// app.component("font-awesome-icon", FontAwesomeIcon);
// const pinia = createPinia()
// app.use(pinia)
// app.use(router)
// app.mount('#app')

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import '@fortawesome/fontawesome-free/css/all.css';

import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import { createI18n } from "vue-i18n";

// Importer les fichiers de traduction
import english from "./translate/english.json";
import french from "./translate/french.json";

const i18n = createI18n({
  locale: "fr", // Langue par défaut
  fallbackLocale: "en", // Langue de repli
  messages: {
    en: english,
    fr: french,
  },
});

const app = createApp(App);
app.use(createPinia());
app.use(i18n);
app.use(router);
app.mount("#app");
