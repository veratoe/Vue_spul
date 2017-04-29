<template>
    <div class="thread_list">
        <div class="thread_list_item" v-for="thread in threads" @click="setActiveThreadId(thread.id)">
            <span class="thread_title">{{ thread.title }}</span>
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
