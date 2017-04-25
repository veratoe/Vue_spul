<template>

    <div class="thread_view">
        <h2>{{ thread.title }}</h2>

        <MessageView v-for="message in messages" :message="message" :key="message.id"></MessageView>
    </div>

</template>

<script>

    import MessageView from "./MessageView.vue";

    export default {
        name: 'ThreadView',
        components: { MessageView },
        computed: {
            thread () {
                var t;
                this.$store.state.threads.forEach( (thread) => {
                    if (thread.id === this.$store.state.activeThreadId) {
                        t = thread;
                    }
                });

                return t;
            },
            messages () {
                return this.thread.messages
            } 

        },
        created () {
            console.log("le threadview created");
        }
    }
</script>
