<template>
    <div class="app">
        <NavigationBar></NavigationBar>
        <div class="main_view">
            <ThreadList></ThreadList>
            <ThreadView v-if="activeThreadId" :thread="getActiveThread"></ThreadView>
        </div>    
    </div>
</template>

<script>

    import NavigationBar from "./navigationbar.vue";
    import ThreadList from "./threadlist.vue";
    import ThreadView from "./threadview.vue";
    import getters from "../store/getters.js";
    import { mapGetters } from "../lib/vuex.min.js";

    export default {
        name: 'App',
        components: { NavigationBar, ThreadList, ThreadView },
        computed: Object.assign(mapGetters(['getActiveThread']), {
            activeThreadId() {
                return this.$store.state.activeThreadId
            }
        })
    }

</script>

<style lang="less">

    .app {
        display: flex;
        flex-direction: column;

        .main_view {
            display: flex;
            flex: 1 1 0;
        }
    }

</style>
