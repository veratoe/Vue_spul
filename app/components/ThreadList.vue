<template>
    <div id="ThreadList">
        <ul>
            <li v-for="thread in threads">
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
        }
    }
</script>
