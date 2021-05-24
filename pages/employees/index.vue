<template>
    <div class="container-fluid">
        <div class="card">
            <div class="card-header">
                <h4 class="card-title">
                    List Employees
                    <nuxt-link class="btn btn-primary float-right btn-sm" :to="{name : 'employees-add'}">    
                        Add Employee
                    </nuxt-link>
                </h4>
            </div>
            <div class="card-body row">
                <div class="col-md-4 offset-md-8 mb-4">
                    <input type="text" placeholder="Search by Employee Name" v-model="search" @keypress.enter="findEmployee" class="form-control">
                </div>
                <div class="col-md-12">
                    <b-table striped hover :items="employees.data" :fields="fields" show-empty responsive>
                        
                        //CUSTOM TEMPLATE
                        <template v-slot:cell(nama_pegawai)="row">
                            <p><strong>{{ row.item.nama_pegawai}}</strong></p>
                            <p>NIK : <span class="badge badge-success">{{ row.item.nik }}</span></p>
                        </template>
                        <template v-slot:cell(actions)="row">
                           <p>
                                <nuxt-link :to="{name: 'employees-edit-id', params: {id: row.item.id}}" :key="'edit'+row.index" class="btn btn-warning btn-sm">Edit</nuxt-link>
                                <button class="btn btn-danger btn-sm" @click="openDeleteModal(row)">Delete</button>
                            </p>
                            <p>
                                <nuxt-link :to="{name: 'rankings-graph-id', params: {id: row.item.id, nama: row.item.nama_pegawai}}" :key="'graph'+row.item.id" class="btn btn-success btn-sm">Graph</nuxt-link>
                            </p>
                        </template>

                    </b-table>
                    <b-pagination
                        align="right"
                        v-model="employees.current_page"
                        :total-rows="employees.total"
                        :per-page="employees.per_page"
                        @change="changePage"
                        aria-controls="my-table"
                    ></b-pagination>
                </div>

                <!-- DELETE MODAL -->
                <b-modal v-model="deleteModal"  title="Delete Employee">
                    <p>Are you sure delete : <code>{{ employee_selected ? employee_selected.nama_pegawai:''}}</code>?</p>
                    <template v-slot:modal-footer>
                        <div class="w-100 float-right">
                            <b-button
                                variant="secondary"
                                size="sm"
                                class="mr-2"
                                @click="deleteModal=false"
                            >
                                Close
                            </b-button>
                            <b-button
                                variant="primary"
                                size="sm"
                                @click="deleteDataEmployee"
                            >
                                Delete
                            </b-button>
                        </div>
                    </template>
                </b-modal>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapState, mapMutations } from 'vuex'
    export default {
        async asyncData({store}) {
            await Promise.all([
                //LOAD FUNGSI GETEMPLOYEESDATA UNTUK MENGAMBIL DATA EMPLOYEES DARI API
                store.dispatch('employee/getEmployeesData')
            ])
            return 
        },
        data() {
            return {
                fields: ['id','nama_pegawai','actions'],
                items: [],
                deleteModal: false,
                employee_selected: null,
                search: null
            }
        },
        computed: {
            //LOAD STATE EMPLOYEES DAN PAGE YANG AKTIF
            ...mapState('employee', {
                employees: state => state.employees,
                page: state => state.page
            })
        },
        watch: {
            //KETIKA VALUE DARI STATE PAGE BERUBAH
            page(){
                //MAKA KITA REQUEST DATA BARU
                this.getEmployeesData(this.search)
            }
        },
        methods: {
            ...mapActions('employee', ['getEmployeesData', 'destroyEmployeesData']),
            ...mapMutations('employee', ['SET_PAGE']),
            openDeleteModal(row) {
                this.employee_selected = row.item
                this.deleteModal = true
            },
            deleteDataEmployee() {
                this.destroyEmployeesData(this.employee_selected.id).then(() => {
                    this.deleteModal = false
                    this.employee_selected = null
                })
            },
            findEmployee() {
                this.getEmployeesData(this.search)
            },
            changePage(value) {  
                this.SET_PAGE(value)
            }
        }
    }
</script>