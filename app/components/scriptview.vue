<template>

    <div class="script_view">
        <div class="script_header">
            <input v-model="name" id="name" placeholder="naam van het scriptje" />
            <div class="script_details">
                <span class="label">id: </span><span class="value">{{ script.id }}</span>
                <span class="label">created: </span><span class="value">{{ script.createdAt || "-" }}</span>
                <span class="label">runs left: </span><span class="value">{{ script.runs_left || "-" }}</span>
                <span class="label">upvotes: </span><span class="value">{{ script.upvotes || "-"}}</span>
                <span class="label">downvotes: </span><span class="value">{{ script.downvotes || "-"}}</span>
                <span class="label">status: </span>
                <span class="status">
                    <strong v-if="script.active">ACTIEF</strong>
                    <strong v-else class="status_inactive" @click="activateScript">INACTIEF</strong>
                </span>
            </div>
        </div>
        <textarea class="script" v-model="code" />
        <div class="error">{{ script.error_message }}</div>
        <div class="controls">
            <button @click="saveScript">Opslaan</button>
            <button @click="deleteScript">Wissen</button>
        </div>
    </div>
    
</template>

<script>

    export default {
        props: { script: Object },
        data: () => { return {
            code: null,
            name: null,
        }},
        computed: {
        },
        methods: {
            saveScript () {
                this.$store.dispatch('saveScript', { 
                    id: this.script.id,
                    code: this.code,
                    name: this.name
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
            this.code = this.script.code;
            this.name = this.script.name;
        }
    }

</script>

<style lang="less">

    .script_view {

        border: 1px solid #eee;
        padding: 10px;
        margin-bottom: 20px;

        .script_header {
            display: flex;
            margin-bottom: 5px;

            input#name {
                border: 0;
                outline: 0;
                color: #777;
                font-size: 21px;
                text-decoration: underline;
                font-weight: bold;
                &::placeholder {
                    color: #ddd;
                    font-weight: normal;
                    font-style: italic;
                }
            }


            .script_details {
                flex: 1;
                padding: 2px;
                margin-left: 10px;
                font-family: monospace;
                font-size: 11px;
                color: #999;

                .value {

                    font-weight: 600;
                    color: #888;
                }

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
            border: 1px solid #ddd;
            border-radius: 3px;
            outline: 0;
            background-color: #fffdf0;
            font-size: 11px;
            color: #777;
            margin-bottom: 10px;
        }

    }
</style>
