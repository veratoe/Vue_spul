<template>
    <div class="scripts_view">
        <ScriptView v-for="script in scripts" :script="script" :key="script.id"></ScriptView>
        <div class="controls">
            <button @click="createScript">Nieuw script</button>
        </div>
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
            createScript () {
                this.$store.dispatch('createScript');
            }
        }
    }   

</script>

<style lang="less" scoped>

    .controls {
        margin-top: 20px;
    } 
</style>
