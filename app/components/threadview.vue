<template>

    <div class="thread_view">
        <div class="header">
            <span class="title">{{ thread.title }}</span> <span class="delete_thread" @click="deleteThread">[X]</span>
            <div class="tabs">
                <span class="tab" @click="subView = 'messages'" :class="{ selected: subView == 'messages' }">Berichten</span>
                <span class="tab" @click="subView = 'scripts'" :class="{ selected: subView == 'scripts' }">Scripts</span>
            </div>
        </div>
    
        <div class="sub_view">
            <MessagesView v-if="subView == 'messages'" :messages="thread.messages"></MessagesView>
            <ScriptsView v-if="subView == 'scripts'" :scripts="thread.scripts"></ScriptsView>
        </div>
    </div>

</template>

<script>

    import MessagesView from "./messagesview.vue";
    import ScriptsView from "./scriptsview.vue";

    export default {
        name: 'ThreadView',
        components: { MessagesView, ScriptsView },
        props: {
            thread: Object
        },
        data: () => { return {
            subView: "messages"
        }},
        methods: {
            deleteThread () {
                this.$store.dispatch('deleteThread', this.thread.id);
            }
        },
        created () {
        }
    }

</script>

<style lang="less">

    .thread_view {

        width: 75%;
        padding: 20px;
        display: flex;
        flex-direction: column;

        .header {
            flex: 0 0 50px;

            .title {
                font-size: 32px;
                color: #888;
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
