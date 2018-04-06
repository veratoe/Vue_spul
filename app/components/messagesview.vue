<template>
    <div class="messages_view">
        <div class="messages">
            <div class="message_view" v-for="message in messages" :key=message.id :class="{ 'star': message.star }">
                <span class="star" v-if="message.star">*</span>
                <div v-if="message.type == 'user'" class="owner user">{{ message.user && message.user.name }}</div>
                <div v-if="message.type == 'script'" class="owner script">{{ message.script && message.script.name }}</div>
                <div v-if="message.type == 'system'" class="owner system"></div>
                <div class="body">
                    <span class="message" :class="{ 'system': message.type == 'system' }">{{ message.content }}</span>
                    <span class="id">{{ message.id }}</span>
                    <span class="timestamp">{{ message.created_at | format_time | time_ago }} </span>
                    <span class="controls" v-if="message.type == 'script'">
                        <span class="upvote" @click="upvote(message.scriptId)">[^]</span> 
                        <span class="downvote" @click="downvote(message.scriptId)">[v]</span> 
                    </span>
                </div>
            </div>
        </div>
        <MessageInput v-if="logged_in && !thread.dead"></MessageInput>
    </div>
</template>

<script>

    import MessageInput from "./messageinput.vue";

    export default {
        name: "MessagesView",
        components: { MessageInput },
        props: { thread: Object, messages: Array },
        data () {
            return {}
        },

        computed: {
            logged_in () {
                //return this.$store.state.logged_in;
                return true;
            }
        },

        methods: {
            scrollToBottom () {
                var $messages = $(".messages");
                if ($messages.length)
                $messages.animate({ scrollTop: $messages[0].scrollHeight });
            },
            upvote (scriptId) {
                this.$store.dispatch("upvoteScript", scriptId);
            },
            downvote (scriptId) {
                this.$store.dispatch("downvoteScript", scriptId);
            }
        },

        created () {
            this.int = setInterval(() => { this.$data.now = Date.now(); }, 10000);
            this.$store.subscribe((mutation, state) => {
                if (mutation.type === "CREATE_COMMENT" || mutation.type === "LOGIN") {
                    this.scrollToBottom();
                }
            });
            setTimeout(() => {
                $(".messages").scrollTop($(".messages")[0].scrollHeight);
            });

        },

        destroyed () {
            clearInterval(this.int);
        },

        filters: {
            format_time: function(value) {
                return (new Date().getTime() -  (new Date(value)).getTime()) / 1000;
            }

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
                position: relative;

                .star {
                    position: absolute;
                    left: 6px;
                    color: yellow;
                    font-size: 23px;
                    top: 5px;
                }
 
                .user {
                    flex: 0 1 120px; 
                    width: 10%;
                    padding: 8px;
                    background-color: #c8dbf7;
                    text-align: right;
                }

                .owner {
                    flex: 0 1 120px; 
                    width: 10%;
                    padding: 8px;

                    &.script {
                        background-color: #ffffcc;
                        font-weight: bold;
                        text-align: right;
                    }

                    &.system {
                        background-color: white;
                    }
                } 

                .body {
                    display: flex;
                    flex: 1 1 0;
                    padding: 8px;
                    background-color: #efefef;

                    .message {
                        width: 60%;

                        &.system {
                            color: #aaa;
                        }
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
                    .controls {
                        width: 12%;
                        margin-left: 26px;
                        text-align: right;

                        * {
                            cursor: pointer;
                        }
                    }
                }

                &.star {
                    .body, .user, .script {
                        background: #888 !important;
                    }

                    .message {
                        color: yellow;
                        font-weight: bold;
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
