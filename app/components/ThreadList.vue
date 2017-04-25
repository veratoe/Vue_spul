<template>
    <div id="ThreadList">
        <ul>
            <li v-for="thread in threads" @click="setActiveThreadId(thread.id)">
                {{ thread.title }}
            </li> 
        </ul>
    </div>
</template>

<script>

    export default {
        name: 'ThreadList',
        computed: {
            threads() {
                return this.$store.state.threads;
            }    
        },

        methods: {
        
            setActiveThreadId (id) {
                this.$store.dispatch('setActiveThreadId', id);
            }
        },

        created () {
        }
    }
</script>
