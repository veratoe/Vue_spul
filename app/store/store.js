import Vue from "../lib/vue.js";
import Vuex from "../lib/vuex.min.js";
import mutations from "./mutations.js";
import * as actions from "./actions.js";

Vue.use(Vuex);

const state = {
    threads: [],
    activeThreadId: null,
};


export default new Vuex.Store({
    state,
    mutations,
    actions
});
