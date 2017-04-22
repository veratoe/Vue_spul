import Vue from     "./lib/vue.js";
import Vuex from    "./lib/vuex.min.js";
import App from     "./components/App.vue";
import store from   "./store/store.js";
import * as actions from  "./store/actions.js";

new Vue ({
    el: "#app",
    store,
    render: h => h(App)
});

actions.fetchThreads(store);   
