import Vue from     "./lib/vue.js";
import app from     "./components/app.vue";
import api from     "./api.js";
import store from   "./store/store.js";
import actions from  "./store/actions.js";
import * as filters from "./filters.js";
import { mapGetters } from 'vuex'

require('./css/app.less');

Vue.config.debug = true;

for (var filter in filters) {
    Vue.filter(filter, filters[filter]);
}

new Vue ({
    el: "#app",
    store,
    render: h => h(app),

    computed: {

        ...mapGetters([
            'connectionStatus'
        ])

    },

    watch: {

        'connectionStatus': function(value) {
            if (value) {
                this.$store.dispatch('fetchThreads');
            }
        }

    }

});
