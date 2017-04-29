<template>
    <div class="app">
        <ThreadList></ThreadList>
        <ThreadView v-if="activeThreadId" :thread="getActiveThread"></ThreadView>
    </div>
</template>

<script>

    import ThreadList from "./threadlist.vue";
    import ThreadView from "./threadview.vue";
    import getters from "../store/getters.js";
    import { mapGetters } from "../lib/vuex.min.js";

    export default {
        name: 'App',
        components: { ThreadList, ThreadView },
        computed: Object.assign(mapGetters(['getActiveThread']), {
            activeThreadId() {
                return this.$store.state.activeThreadId
            }
        })
    }

</script>
