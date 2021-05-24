<template>
    <div>
        <div class="form-group">
            <label for="">Bobot Criteria</label>
            <input 
                type="number" class="form-control" 
                v-model="criteria.bobot_kriteria"
            >
        </div>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'
    export default {
        created() {
            if (this.selected) {
                this.criteria = {
                    id: this.selected.id,
                    bobot_kriteria : this.selected.bobot_kriteria
                }
            }
        },
        data() {
            return {
                criteria: {
                    bobot_kriteria : ''
                }
            }
        },
        props:{
            selected: {
               type: Object, 
               default: null 
            }
        },
        methods: {
            ...mapActions('criteria', ['updateCriterionData']),
            update(){
                return new Promise((resolve, reject) => {
                    this.updateCriterionData(this.criteria).then(() => resolve())
                })
            }
        }
    }
</script>