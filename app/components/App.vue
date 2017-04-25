<template>
    <div id="app">
        <h2>Le app</h2>
        <ThreadList></ThreadList>
        <ThreadView v-if="activeThreadId"></ThreadView>
    </div>
</template>

<script>

import ThreadList from "./ThreadList.vue";
import ThreadView from "./ThreadView.vue";

export default {
    components: { ThreadList, ThreadView },
    computed: {
        activeThreadId() {
            return this.$store.state.activeThreadId
        }
    }
}
</script>
