<template>
    <div class="messages_view">
        <div class="messages">
            <div class="message_view" v-for="message in messages" :key=message.id>
                <div class="user">{{ message.user && message.user.username }}</div>
                <div class="body">
                    <span class="message">{{ message.message }}</span>
                    <span class="id">{{ message.id }}</span>
                    <span class="timestamp">{{ (now - (new Date(message.createdAt)).getTime()) / 1000 | time_ago  }} </span>
                </div>
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
        data () {
            return {
                now: Date.now()
            }
        },
        methods: {
            scrollToBottom () {
                var $messages = $(".messages");
                if ($messages.length)
                $messages.animate({ scrollTop: $messages[0].scrollHeight });
            }
        },
        created () {
            this.int = setInterval(() => { this.$data.now = Date.now(); console.log('wub') }, 10000);
            this.$store.subscribe((mutation, state) => {
                if (mutation.type === "CREATE_MESSAGE") {
                    this.scrollToBottom();
                }
            });
            setTimeout(() => {
                $(".messages").scrollTop($(".messages")[0].scrollHeight);
            });
            
        },
        destroyed () {

            clearInterval(this.int);
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
                flex-direction: row;
                display: flex;
                overflow-y: scroll;

                .user {
                    flex: 0 1 120px; 
                    width: 10%;
                    padding: 8px;
                    background-color: #f7c8c8;
                    text-align: right;
                }

                .body {
                    display: flex;
                    flex: 1 1 0;
                    padding: 8px;
                    background-color: #efefef;

                    .message {
                        width: 60%;
                    }

                    .id {
                        width: 5%;
                        font-weight: bold;
                        color: #777;
                    }
                    .timestamp {
                        width: 20%;
                        text-align: right;
                        color: #999;
                    }
                }

            }
        }

        .message_input {
            flex: 0 1 10vh;
            height: 150px;
        }
    }

</style>
