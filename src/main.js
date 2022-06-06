import { createApp } from "vue";
import App from "./App.vue";

import { createPinia } from "pinia";
import { createPersistedState } from "pinia-persistedstate-plugin";
import "normalize.css/normalize.css";
import "bytemd/dist/index.css";
import "github-markdown-css/github-markdown-light.css";
import "./styles/style.less";

const app = createApp(App);
const store = createPinia();

store.use(createPersistedState());

app.use(store).mount("#app");
