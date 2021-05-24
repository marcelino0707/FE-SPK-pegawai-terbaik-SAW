<template>
    <div class="container-fluid">
        <div class="card">
            <div class="card-header">
                <h4 class="card-title">
                    List Criterion
                </h4>
            </div>
            <div class="card-body row">
                <div class="col-md-12">
                    <b-table  hover :items="criterion.data" :fields="fields" show-empty responsive>
                        <template v-slot:cell(actions)="row">
                            <button class="btn btn-warning btn-sm" @click="openEditModal(row)">Edit Bobot Kriteria</button>
                        </template>
                    </b-table>
                </div>
                <!-- EDIT MODAL -->
                <b-modal v-model="editModal"  title="Edit Bobot Kriteria">
                    <criteria-form ref="formEdit" :selected="criteria_selected"/>
                    <template v-slot:modal-footer>
                        <div class="w-100 float-right">
                            <b-button
                                variant="secondary"
                                size="sm"
                                class="mr-2"
                                @click="editModal=false"
                            >
                                Close
                            </b-button>
                            <b-button
                                variant="primary"
                                size="sm"
                                @click="updateCriteria"
                            >
                                Update
                            </b-button>
                        </div>
                    </template>
                </b-modal>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex'
    import Criteria from '@/components/form/Criteria'
    export default {
        async asyncData({store}) {
            await Promise.all([
                store.dispatch('criteria/getCriterionData')
            ])
            return 
        },
        data() {
            return {
                fields: [
                    'id',
                    'nama_kriteria',
                    'bobot_kriteria',
                    'sifat_kriteria',
                    'actions'
                    ],
                items: [],
                editModal: false,
                criteria_selected: null
            }
        },
        computed: {
            ...mapState('criteria', {
                criterion: state => state.criterion
            })
        },
        components: {
            'criteria-form': Criteria
        },
        methods: {
            ...mapActions('criteria', ['getCriterionData']),
            openEditModal(row) {
                this.criteria_selected = row.item
                this.editModal = true
            },
            closeEditModal(row) {
                this.criteria_selected = null
                this.editModal = false
            },
            updateCriteria() {
                this.$refs.formEdit.update().then(() => this.closeEditModal())
            }
        }
    }
</script>