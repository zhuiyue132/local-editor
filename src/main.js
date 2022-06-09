import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { createPersistedStatePlugin } from "pinia-plugin-persistedstate-2";
import localforage from 'localforage';
import "normalize.css/normalize.css";
import "bytemd/dist/index.css";
import "github-markdown-css/github-markdown-light.css";
import 'highlight.js/styles/vs.css'
import 'katex/dist/katex.css'
import "./styles/style.less";


const app = createApp(App);
const store = createPinia();

store.use(createPersistedStatePlugin({
  storage: {
    getItem: (key) => localforage.getItem(key),
    setItem: (key, value) => localforage.setItem(key, value),
    removeItem: (key) => localforage.removeItem(key),
  },
}));

app.use(store).mount("#app");
