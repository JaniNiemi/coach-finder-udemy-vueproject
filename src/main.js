import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import BaseBadge from "./components/UI/BaseBadge.vue";
import BaseButton from "./components/UI/BaseButton.vue";
import BaseCard from "./components/UI/BaseCard.vue";
import BaseSpinner from "./components/UI/BaseSpinner.vue";

const app = createApp(App);

app.use(store);
app.use(router);

app.component("base-badge", BaseBadge);
app.component("base-button", BaseButton);
app.component("base-card", BaseCard);
app.component("base-spinner", BaseSpinner);

app.mount('#app');
