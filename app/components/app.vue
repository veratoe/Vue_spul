<template>
    <div class="app">
        <ThreadList></ThreadList>
        <ThreadView v-if="activeThreadId"></ThreadView>
    </div>
</template>

<script>

    import ThreadList from "./threadlist.vue";
    import ThreadView from "./threadview.vue";

    export default {
        components: { ThreadList, ThreadView },
        computed: {
            activeThreadId() {
                return this.$store.state.activeThreadId
            }
        }
    }

</script>
