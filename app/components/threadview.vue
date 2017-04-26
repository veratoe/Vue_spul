<template>

    <div class="thread_view">
        <h2>{{ thread.title }}</h2>
        <MessageView v-for="message in thread.messages" :message="message" :key="message.id"></MessageView>
        <MessageInput></MessageInput>
    </div>

</template>

<script>

    import MessageView from "./messageview.vue";
    import MessageInput from "./messageinput.vue";
    import { mapGetters } from "../lib/vuex.min.js";

    export default {
        name: 'ThreadView',
        components: { MessageView, MessageInput },
        computed: mapGetters({
            thread: 'getActiveThread',
        }),

        created () {
        }
    }

</script>
