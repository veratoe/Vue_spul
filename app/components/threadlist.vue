<template>
    <div class="thread_list">
        <div class="thread_list_item" v-for="thread in threads" @click="setActiveThreadId(thread.id)" :class="{ active: thread.id == activeThreadId, dead: thread.dead }">
            <span class="thread_title">{{ thread.id }} - {{ thread.title }}</span><span v-if="thread.dead">&#10014;</span>
        </div> 

        <div class="new_thread">
            <a href="#">Nieuwe draad</a>
            <input v-model="title" @keyup.enter="createThread">
            <button @click="createThread">Maak</button>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'ThreadList',
        data: () => { 
            return {
                title: null
            }
        },
        computed: {
            threads() {
                return this.$store.state.threads;
            },   
            activeThreadId () {
                return this.$store.state.activeThreadId
            }
        },

        methods: {
        
            setActiveThreadId (id) {
                this.$store.dispatch('setActiveThreadId', id);
            },
            createThread () {
                this.$store.dispatch('createThread', { title: this.title });
            }
        },

        created () {
        }
    }

</script>

<style lang="less">

.thread_list {

    background-color: #f0f0f0;
    width: 25%;
    height: 100%;
    border-right: 2px solid #ccc;

    .thread_list_item {
        padding: 4px;

        &.active {
            font-weight: bold;
            color: blue;
            text-decoration: underline;
        }

        &.dead {
            text-decoration: line-through;
            color: #999;
        }   

        span.thread_title {
            &:hover {
                cursor: pointer;
                text-decoration: underline;
            }            
        }


    }
}

</style>
