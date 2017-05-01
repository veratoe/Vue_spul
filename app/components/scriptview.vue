<template>

    <div class="script_view">
        <span class="id">{{ script.id }}</span> | <span class="created_at">created: {{ script.createdAt }}</span>
        <textarea class="script" v-model="script.script" />
        <button @click="saveScript">Opslaan</button>
    </div>
    
</template>

<script>

    export default {
        props: { script: Object },
        methods: {
            saveScript () {
                console.log("script: ", this.script);
                this.$store.dispatch('saveScript', this.script); 
            }
        }
    }

</script>

<style lang="less">

    .script_view {
        
        textarea {
            width: 80%;
            resize: none;
            height: 90px;
            padding: 20px;
        }
    }
</style>
