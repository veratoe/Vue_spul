import Vue from "../lib/vue.js";
import Vuex from "../lib/vuex.min.js";
import mutations from "./mutations.js";
import getters from "./getters.js";
import actions from "./actions.js";

Vue.use(Vuex);

const state = {
    threads: [],
    activeThreadId: null,
    logged_in: null,
    timeout: null
};


export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
});
