<template>
    <div class="scripts_view">
        <ScriptView v-for="script in scripts" :script="script" :key="script.id"></ScriptView>
    </div>
</template>

<script>

    import ScriptView from "./scriptview.vue";

    export default {
        name: 'ScriptsView',
        components: { ScriptView },
        props: {
            scripts: Array          
        },
        methods: {
        }
    }   

</script>

<style lang="less">

</style>
