import Vue from     "./lib/vue.js";
import app from     "./components/app.vue";
import store from   "./store/store.js";
import actions from  "./store/actions.js";
import api from "./api.js";
import * as filters from "./filters.js";

require('./css/app.less');

Vue.config.debug = true;

for (var filter in filters) {
    Vue.filter(filter, filters[filter]);
}

new Vue ({
    el: "#app",
    store,
    render: h => h(app)
});

actions.fetchThreads(store);   
