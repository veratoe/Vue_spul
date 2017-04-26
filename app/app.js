import Vue from     "./lib/vue.js";
import Vuex from    "./lib/vuex.min.js";

import app from     "./components/app.vue";
import store from   "./store/store.js";
import actions from  "./store/actions.js";

require('./css/app.less');

new Vue ({
    el: "#app",
    store,
    render: h => h(app)
});

actions.fetchThreads(store);   
