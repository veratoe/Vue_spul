<template>
    <div class="scripts_view">
        <div v-for="script in scripts">
            <span class="id">{{ script.id }}</span> | <span class="created_at">created: {{ script.createdAt }}</span>
            <textarea class="script" v-model="script.script" />
        </div>
    </div>
</template>

<script>

    export default {
        name: 'ScriptsView',
        props: {
            scripts: Array          
        }
    }   
</script>

<style lang="less">

    .scripts_view {
        
        textarea {
            width: 80%;
            resize: none;
            height: 90px;
            padding: 20px;
        }
    }
</style>
