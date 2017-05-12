<template>

    <div class="script_view">
        <div class="header">
            <span class="id">{{ script.id }}</span> | 
            <span class="created_at">created: {{ script.createdAt }}</span> | 
            <span>runs_left: {{ script.runs_left }} </span> |
            <span>last_run_time: {{ script.last_run_time }}</span> | 
            <span>upvotes: {{ script.upvotes }}</span> | 
            <span>downvotes: {{ script.downvotes }}</span> | 
            <span class="status">
                <strong v-if="script.active">ACTIEF</strong>
                <strong v-else class="status_inactive" @click="activateScript">INACTIEF</strong>
            </span>
        </div>
        <textarea class="script" v-model="script_script" />
        <input v-model="script_name" />
        <div class="error">{{ script.error_message }}</div>
        <div cass="controls">
            <button @click="saveScript">Opslaan</button>
            <button @click="deleteScript">Wissen</button>
        </div>
    </div>
    
</template>

<script>

    export default {
        data: () => { return {
            script_script: null,
            script_name: null
        }},
        props: { script: Object },
        computed: {
        },
        methods: {
            saveScript () {
                this.$store.dispatch('saveScript', { 
                    threadId: this.script.threadId,
                    id: this.script.id, 
                    script: this.script_script, 
                    name: this.script_name 
                }); 
            },
            deleteScript() {
                this.$store.dispatch('deleteScript', this.script.id); 
            },
            activateScript() {
                this.$store.dispatch('activateScript', this.script.id); 
            }
        },
        created () {
            this.script_script = this.script.script;
            this.script_name = this.script.name;
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

                &.status_inactive {
                    color: #888;
                    cursor: pointer;
                    &:hover {
                        text-decoration: underline
                    }
                }
               
            }
        }

        .error {
            color: red;
            font-weight: bold;
        }

        textarea {
            width: 80%;
            resize: none;
            height: 90px;
            padding: 20px;
        }
    }
</style>
