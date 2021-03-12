import Vue from 'vue';

import App from './App.vue';

import { library } from "@fortawesome/fontawesome-svg-core";
import { faGlobeAmericas, faUserCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import VueMaterial from 'vue-material';
import 'vue-material/dist/theme/default.css';

Vue.use(VueMaterial);


library.add(faGlobeAmericas);
library.add(faUserCog);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
