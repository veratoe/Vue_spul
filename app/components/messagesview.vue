<template>
    <div class="messages_view">
        <div class="messages">
            <div class="message_view" v-for="message in messages" :key=message.id>
                <span class="message">{{ message.message }}</span>
                <span class="id">{{ message.id }}</span>
                <span class="timestamp">{{ message.createdAt }} </span>
                <span class="author">{{ message.author }} </span>
            </div>
        </div>
        <MessageInput></MessageInput>
    </div>
</template>

<script>

    import MessageInput from "./messageinput.vue";

    export default {
        name: "MessagesView",
        components: { MessageInput },
        props: { messages: Array },
        methods: {
            scrollToBottom () {
                var $messages = $(".messages");
                if ($messages.length)
                $messages.animate({ scrollTop: $messages[0].scrollHeight });
            }
        },
        created () {
            this.$store.subscribe((mutation, state) => {
                if (mutation.type === "RECEIVE_MESSAGE") {
                    this.scrollToBottom();
                }
            });
            setTimeout(() => {
                $(".messages").scrollTop($(".messages")[0].scrollHeight);
            });
            
        }
    }

</script>

<style lang="less">

    .messages_view {
        display: flex;
        flex-direction: column;
        height: 100%;

        .messages {
            flex: 1 1 0;
            margin-bottom: 10px;
            overflow-y: scroll;
   
            .message_view {
                overflow-y: scroll;
                padding: 8px;
                background-color: #efefef;

                * {
                    display: inline-block;
                }
                .message {
                    width: 60%;
                }

                .id {
                    width: 5%;
                }
                .timestamp {
                    width: 20%;
                }
                .author {
                    padding: 7px;
                    float: right;
                }   

            }
        }

        .message_input {
            flex: 0 1 10vh;
            height: 150px;
        }
    }

</style>
