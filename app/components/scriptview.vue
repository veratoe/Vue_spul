<template>

    <div class="script_view">
        <div class="header">
            <span class="id">{{ script.id }}</span> | <span class="created_at">created: {{ script.createdAt }}</span> | <span> runs_left: {{ script.runs_left }} </span> <strong v-if="script.active" class="status">ACTIEF</strong><strong v-else>INACTIEF</strong>
        </div>
        <textarea class="script" v-model="script.script" />
        <div cass="controls">
            <button @click="saveScript">Opslaan</button>
            <button @click="deleteScript">Wissen</button>
        </div>
    </div>
    
</template>

<script>

    export default {
        props: { script: Object },
        methods: {
            saveScript () {
                this.$store.dispatch('saveScript', this.script); 
            },
            deleteScript() {
                this.$store.dispatch('deleteScript', this.script.id); 
            }
        }
    }

</script>

<style lang="less">

    .script_view {
        
        .header {
            background: #eee;
            padding: 5px;

            .status {
                color: green;
            }
        }

        textarea {
            width: 80%;
            resize: none;
            height: 90px;
            padding: 20px;
        }
    }
</style>
