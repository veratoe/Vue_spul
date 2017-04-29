<template>
    <div class="messages_view">
        <div class="message_view" v-for="message in messages" :key=message.id>
            <span class="message">{{ message.message }}</span>
            <span class="id">{{ message.id }}</span>
            <span class="timestamp">{{ message.createdAt }} </span>
            <span class="author">{{ message.author }} </span>
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
        created () {
        }
    }

</script>

<style lang="less">

    .messages_view {
        overflow-y: scroll;
        height: 70%;
   
        .message_view {
            padding: 8px;
            background-color: #efefef;
            margin-bottom: 3px;

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

</style>
