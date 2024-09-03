import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas);
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fab);
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(far);
import { dom } from "@fortawesome/fontawesome-svg-core";
dom.watch();

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from '@router'


const app =createApp(App)
app.component("font-awesome-icon", FontAwesomeIcon);
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.mount('#app')
