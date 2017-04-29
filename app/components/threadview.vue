<template>

    <div class="thread_view">
        <h2>{{ thread.title }} <span class="delete_thread" @click="deleteThread">[X]</span></h2>
        <MessageView v-for="message in thread.messages" :message="message" :key="message.id"></MessageView>
        <MessageInput></MessageInput>
    </div>

</template>

<script>

    import MessageView from "./messageview.vue";
    import MessageInput from "./messageinput.vue";

    export default {
        name: 'ThreadView',
        components: { MessageView, MessageInput },
        props: {
            thread: Object
        },
        methods: {
            deleteThread () {
                console.log('deletan');
                this.$store.dispatch('deleteThread', this.thread.id);
            }
        },
        created () {
        }
    }

</script>
