<template>

    <div class="thread_view">
        <div class="header">
            <img :src="thread.image_url" width=80 height=80>
            <div style="flex-grow: 1" class="thread_details">
                <span class="title" :class="{ 'dead': thread.dead }">{{ thread.title }}</span> 
                <span v-if="thread.dead" class="cross">&#10014;</span><br/>
                <span class="author_label">created by</span> <span class="author">{{ thread.author }}</span>
            </div>
            <div class="tabs">
                <span class="tab" @click="subView = 'comments'" :class="{ selected: subView == 'comments' }">Berichten</span>
                <span class="tab" @click="subView = 'scripts'" :class="{ selected: subView == 'scripts' }">Scripts</span>
            </div>
        </div>

        <div class="sub_view">
            <commentsView v-if="subView == 'comments'" :comments="thread.comments" :thread="thread"></commentsView>
            <ScriptsView v-if="subView == 'scripts'" :scripts="thread.scripts"></ScriptsView>
        </div> </div>

</template>

<script>

    import CommentsView from "./commentsview.vue";
    import ScriptsView from "./scriptsview.vue";

    export default {
        name: 'ThreadView',
        components: { CommentsView, ScriptsView },
        props: {
            thread: Object
        },
        data: () => { return {
            subView: "comments"
        }},

        watch: {
            thread () {
                this.$store.dispatch('fetchComments', this.thread.id);
                this.$store.dispatch('fetchScripts', this.thread.id);
            }

        },

        methods: {
            deleteThread () {
                this.$store.dispatch('deleteThread', this.thread.id);
            }
        },
        mounted () {
            this.$store.dispatch('fetchComments', this.thread.id);
            this.$store.dispatch('fetchScripts', this.thread.id);
        }
    }

</script>

<style lang="less">

    .thread_view {

        width: 75%;
        padding: 20px;
        display: flex;
        flex-direction: column;
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
        margin: 5px;
        padding: 20px;

        .header {
            display: flex;
            min-height: 90px;

            .thread_details {
                padding: 16px;

                .title {
                    font-size: 28px;
                    color: #9c7da5;


                    &.dead {
                        text-decoration: line-through;
                        color: #aaa;
                    }
                }

                .author { font-weight: bold; color: #888; }
                .author_label { color: #aaa; }

            }


            .cross {
                font-size: 40px;
            }

            .delete_thread {
                cursor: pointer;
                &:hover {
                    color: red;
                }
            }

            .tabs {
                float: right;

                .tab {
                    cursor: pointer;
                    &:hover { color: blue }
                    &.selected { text-decoration: underline }
                }
            }

        }

        .sub_view {
            flex: 1 1 0;
        }

    }

</style>
