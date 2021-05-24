<template>
    <div class="container-fluid">
        <div class="card">
            <div class="card-header">
                <h4 class="card-title">
                    List Employee Ranking
                    <nuxt-link class="btn btn-primary float-right btn-sm" :to="{name : 'rankings-add'}">    
                        Add Ranking
                    </nuxt-link>
                </h4>
            </div>
            <div class="card-body row">
                <!-- <div class="container"> -->
                    <div class="row justify-content-between mb-4 ml-1">
                        <!-- Datepicker -->
                        <div class="col-auto">
                            <!-- <label for="example-datepicker">Choose a date</label> -->
                            <b-form-datepicker placeholder="Pilih Bulan" v-if="showDatepicker" v-model="datepicker"  @input="changeDate" ></b-form-datepicker>
                            <!-- <p>Value: '{{ datepicker }}'</p> -->
                        </div>
                        <div >
                            <button v-if="showAll" class="btn btn-success" @click="showAllData">    
                                Show All Data
                            </button>
                            <button v-if="showBack" class="btn btn-secondary" @click="pageBack">    
                                Back
                            </button>
                            <button v-if="exportAll" class="btn btn-info ml-1" @click="exportPDF">    
                                Export PDF
                            </button>
                            <button v-if="exportAll" class="btn btn-success ml-1" @click="exportExcel">    
                                Export Excel
                            </button>
                        </div>
                        <!-- Search -->
                        <!-- <div class="col-3">
                            <input type="text" placeholder="Search by Name" v-model="search" @keypress.enter="findEmployee" class="form-control">
                        </div> -->
                    </div>
                <!-- </div> -->
                <div class="col-md-12">
                    <div  v-if="loaded" id="table" class="card text-center">
                        <h4 >List Employee Ranking in {{this.tanggal}}</h4>
                        <b-table striped hover :items="rankings.data" :fields="fields" show-empty responsive>
                            <!-- <template v-slot:cell(nama_pegawai)="row">
                                <p><strong>{{ row.item.nama_pegawai}}</strong></p>
                                <p>NIK : <span class="badge badge-success">{{ row.item.nik }}</span></p>
                            </template> -->
                            <!-- <template v-slot:cell(action)="row">
                                <nuxt-link :to="{name: 'rankings-graph-id', params: {id: row.item.pegawai_id, nama: row.item.Employee.nama_pegawai}}" :key="'graph'+row.item.pegawai_id" class="btn btn-success btn-sm">Graph</nuxt-link>
                            </template>  -->
                        </b-table>
                   
                        <b-pagination
                            v-if="exportAll==false"
                            align="right"
                            v-model="rankings.current_page"
                            :total-rows="rankings.total"
                            :per-page="rankings.per_page"
                            @change="changePage"
                            aria-controls="my-table"
                        ></b-pagination>
                    </div>
                </div>

                <!-- DELETE MODAL -->
                <!-- <b-modal v-model="deleteModal"  title="Delete Employee">
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
                </b-modal> -->
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapState, mapMutations } from 'vuex'
    import Exporter from "vue-chartjs-exporter";
    import XLSX from 'XLSX'
    import saveAs from 'file-saver'
    // import { jsPDF } from "jspdf"
    // import 'jspdf-autotable'
    export default {
        // async asyncData({store}) {
        //     await Promise.all([
        //         store.dispatch('ranking/getRankingsData')
        //     ])
        //     return 
        // },
        data() {
            return {
                showBack : false,
                showDatepicker: true,
                exportAll: false,
                showAll: false,
                tanggal : '',
                loaded: false,
                fields: [],
                items: [],
                // deleteModal: false,
                // ranking_selected: null,
                datepicker: null
            }
        },
        computed: {
            ...mapState('ranking', {
                rankings: state => state.rankings,
                page: state => state.page,
                excels: state => state.excels
            })
        },
        watch: {
            page(){
                this.getRankingsData(this.datepicker)
            }
        },
        methods: {
            ...mapActions('ranking', ['getRankingsData','getExportAll']),
            ...mapMutations('ranking', ['SET_PAGE']),
            // ...mapMutations('ranking', ['SET_DATEPICKER']),
            // openDeleteModal(row) {
            //     this.employee_selected = row.item
            //     this.deleteModal = true
            // },
            // deleteDataEmployee() {
            //     this.destroyEmployeesData(this.employee_selected.id).then(() => {
            //         this.deleteModal = false
            //         this.employee_selected = null
            //     })
            // },
            // findEmployee() {
            //     this.getRankingsData(this.search)
            // },
            changeDate() {
                this.changePage()
                this.showAll = false
                this.exportAll = false
                this.loaded = false
                this.getRankingsData(this.datepicker).then(() => {
                    this.fields = [
                        {key: 'pegawai_id', label : 'ID Pegawai'},
                        {key: 'Employee.nama_pegawai', label : 'Nama', sortable: true},
                        {key: 'nilai_kedisiplinan', label : 'Kedisiplinan', sortable: true},
                        {key: 'nilai_kerjasama', label : 'Kerjasama', sortable: true},
                        {key: 'nilai_inisiatif', label : 'Inisiatif',sortable: true},
                        {key: 'nilai_kinerja', label : 'Kinerja',sortable: true},
                        {key: 'nilai_tanggungJawab', label : 'Tanggung Jawab',sortable: true},
                        {key: 'nilai_prestasi', label : 'Prestasi',sortable: true},
                        {key: 'total', sortable: true},
                        // 'action'
                    ]

                    this.showAll = true
                    this.loaded = true

                    let startDate= new Date(this.datepicker)
                    let year = startDate.getFullYear() 
                    let month = startDate.getMonth() 
                    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
                    this.tanggal = `${ monthNames[month]}` + ' (' + `${year}` + ')'

                })
            },
            showAllData() { 
                this.showBack = true
                this.showDatepicker = false
                this.exportAll = true
                this.getExportAll(this.datepicker).then(() => {
                    this.fields = [
                        {key: 'pegawai_id', label : 'ID Pegawai'},
                        {key: 'Employee.nama_pegawai', label : 'Nama', sortable: true},
                        {key: 'nilai_kedisiplinan', label : 'Kedisiplinan', sortable: true},
                        {key: 'nilai_kerjasama', label : 'Kerjasama', sortable: true},
                        {key: 'nilai_inisiatif', label : 'Inisiatif',sortable: true},
                        {key: 'nilai_kinerja', label : 'Kinerja',sortable: true},
                        {key: 'nilai_tanggungJawab', label : 'Tanggung Jawab',sortable: true},
                        {key: 'nilai_prestasi', label : 'Prestasi',sortable: true},
                        {key: 'total', sortable: true},
                    ]
                    let startDate= new Date(this.datepicker)
                    let year = startDate.getFullYear() 
                    let month = startDate.getMonth() 
                    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
                    this.tanggal = `${ monthNames[month]}` + ' (' + `${year}` + ')'

                    this.showAll = false
                })
            },
            pageBack() {
                this.changeDate()
                this.showDatepicker = true
                // this.loaded = false
                // this.exportAll = false
                // this.datepicker= null
                this.showBack = false
            },
            exportPDF() {
                let table= document.getElementById("table")

                const exp = new Exporter([table])
                exp.export_pdf().then((pdf) => {
                    pdf.save("table.pdf");
                });

                // var doc = new jsPDF()
                // var rows = []
                // var cols = ["Pegawai ID","Nama","Kedisiplinan","Kerjasama","Inisiatif","Kinerja","Tanggung Jawab","Prestasi","Total"]
                // var dataset = this.$store.state.ranking.rankings.data
                // dataset.forEach(element => {
                //     var temp = [
                //         element.pegawai_id, 
                //         element.Employee.nama_pegawai, 
                //         element.nilai_kedisiplinan, 
                //         element.nilai_kerjasama, 
                //         element.nilai_inisiatif, 
                //         element.nilai_kinerja,
                //         element.nilai_tanggungJawab,
                //         element.nilai_prestasi,
                //         element.total
                //     ]
                //     rows.push(temp)
                // });

                // // doc.text('TEST',10,10)
                // // doc.autoTable(cols, rows)
                // doc.autoTable({
                //     theme:'grid',
                //     // margin: { top: 10 },
                //     body: rows,
                //     columns: cols
                // })
                // doc.save('Ranking.pdf')

                // for(var i = 0; i<this.$store.state.ranking.rankings.total; i++){

                // }
                // console.log(this.$store.state.ranking.rankings)
            },
            changePage(value) {  
                if(value){
                    this.SET_PAGE(value)
                }else{
                    this.SET_PAGE(1)
                }
            },
            exportExcel(){
                
                const data = this.excels
                const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                const EXCEL_EXTENSION = '.xlsx';
                
                const worksheet = XLSX.utils.json_to_sheet(data)
                const workbook = {
                    Sheets: {
                        'data' : worksheet
                    },
                    SheetNames: ['data']
                }
                const excelBuffer = XLSX.write(workbook, {bookType:'xlsx', type:'array'})
                
                const result =new Blob([excelBuffer], {type: EXCEL_TYPE})
                saveAs(result, 'Excel'+new Date().getTime()+EXCEL_EXTENSION)
                // console.log(data)
            }
        }
    }
</script>