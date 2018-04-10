<template>
    <div class="comments_view">
        <div class="comments">
            <div class="comment_view" v-for="comment in comments" :key=comment.id :class="{ 'star': comment.star }">
                <span class="star" v-if="comment.star">*</span>
                <div v-if="comment.type == 'user'" class="owner user">{{ comment.user && comment.user.name }}</div>
                <div v-if="comment.type == 'script'" class="owner script">{{ comment.script && comment.script.name }}</div>
                <div v-if="comment.type == 'system'" class="owner system"></div>
                <div class="body">
                    <span class="comment" :class="{ 'system': comment.type == 'system' }">{{ comment.content }}</span>
                    <span class="id">{{ comment.id }}</span>
                    <span class="timestamp">{{ comment.created_at | format_time | time_ago }} </span>
                    <span class="controls" v-if="comment.type == 'script'">
                        <span class="upvote" @click="upvote(comment.scriptId)">[^]</span> 
                        <span class="downvote" @click="downvote(comment.scriptId)">[v]</span> 
                    </span>
                </div>
            </div>
        </div>
        <commentInput v-if="logged_in && !thread.dead"></commentInput>
    </div>
</template>

<script>

    import commentInput from "./commentinput.vue";

    export default {
        name: "commentsView",
        components: { commentInput },
        props: { thread: Object, comments: Array },
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
                var $comments = $(".comments");
                if ($comments.length)
                $comments.animate({ scrollTop: $comments[0].scrollHeight });
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
                $(".comments").scrollTop($(".comments")[0].scrollHeight);
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

    .comments_view {
        display: flex;
        flex-direction: column;
        height: 100%;

        .comments {
            flex: 1 1 0;
            margin-bottom: 10px;
            overflow-y: scroll;
   
            .comment_view {
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

                    .comment {
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

                    .comment {
                        color: yellow;
                        font-weight: bold;
                    }
                }
            }
        }

        .comment_input {
            flex: 0 1 10vh;
            height: 150px;
        }
    }

</style>
