<template>
    <div class="container-fluid">
        <div class="card">
            <div class="card-header">
                <h4 class="card-title">
                    Graph Employee
                </h4>
            </div>
            <div class="card-body row">
                <div class="row justify-content-between mb-4 ml-1">
                    <!-- Datepicker -->
                    <div class="col-auto">
                        <b-form-datepicker placeholder="Pilih Tahun" id="example-datepicker" v-model="datepicker"  @input="changeDate" ></b-form-datepicker>
                    </div>
                    <nuxt-link :to="{name: 'employees'}" class="btn btn-secondary">Back</nuxt-link>
                    <div >
                        <button v-if="showPDF" class="btn btn-info ml-1" @click="exportPDF">    
                            Export PDF
                        </button>
                    </div>
                    <div >
                        <button v-if="showExcel" class="btn btn-success ml-1" @click="exportExcel">    
                            Export Excel
                        </button>
                    </div>
                </div>
                <div class="col-md-12" id="line">
    
                    <div>
                        <line-chart 
                            class="mb-5"
                            v-if="loaded"
                            :data="lineChartData" :options="lineChartOptions" :height="200" 
                        />
                    </div>

                    <div class="col mt-3">
                        <div  v-if="loaded" id="table" class="card text-center">
                            <h4 >Table of {{this.$route.params.nama}}'s Total Assessment</h4>

                            <b-table striped hover :items="tables" :fields="fields" show-empty responsive>
                            </b-table>
                        </div>
                    </div>
    

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex'
    import Exporter from "vue-chartjs-exporter"
    import XLSX from 'XLSX'
    import saveAs from 'file-saver'
    export default {
        // async asyncData({store, params}) {
        //     await Promise.all([
        //         store.dispatch('ranking/getRankingsEmployee', params.id)
        //     ])
        //     return 
        // },
        data() {
            return {
                showExcel : false,
                fields: ['month', 'total'],
                showPDF : false,
                loaded: false,
                datepicker: null,
                lineChartData: {
                    labels: ['Januari','Febuary','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'],
                    datasets: 
                    [
                        // {
                        //     label: 'Visits',
                        //     data: [10, 15, 20, 30, 40, 50, 60, 70, 34, 45, 11, 78, 45],
                        //     backgroundColor: '#003f5c'
                        // },
                        // {
                        //     label: 'Pages Views',
                        //     data: [30, 24, 57, 23, 68, 72, 25, 64, 133, 143, 165, 33, 56],
                        //     backgroundColor: '#2f4b7c'
                        // },
                        {
                            label: 'Total per Bulan',
                            data: [],
                            backgroundColor: '#5DADE2 '
                        }
                    ]
                },
                lineChartOptions: {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: '',
                        fontSize: 24,
                        fontColor: '#6b7280'
                    },
                    tooltips: {
                        backgroundColor: '#17BF62'
                    },
                    scales: {
                        xAxes: [
                            {
                                gridLines: {
                                    display: false
                                }
                            }
                        ],
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true
                                },
                                gridLines: {
                                    display: true
                                }
                            }
                        ]
                    }
                }
            }
        },
        computed: {
            ...mapState('ranking', {
                data: state => state.data,
                rankings: state => state.rankings,
                tables: state => state.tables
            }),  
        },
        // watch: {
        //      page(){
        //         //MAKA KITA REQUEST DATA BARU
        //         this.changeDate() 
        //     }
        // },
        methods: {
            ...mapActions('ranking', ['getRankingsEmployee']),
            changeDate() {
   
        //         var fillData = []
        //         var labelData = []
        //         var check = this.$store.state.ranking.rankings.total
        //         var i 

        //         for(i = 0; i < check; i++){
        //            fillData.push(this.$store.state.ranking.rankings.data[i].total)
        //            labelData.push(this.$store.state.ranking.rankings.data[i].Employee.nama_pegawai)
        //         }
                
        //         this.barChartData.datasets[0].data = fillData
        //         this.barChartData.labels = labelData
                
        //          console.log(labelData)
        //         this.getRankingsData(this.datepicker)
                    this.loaded = false
                    let data = Object.assign({id: this.$route.params.id}, {datepicker :this.datepicker})
                    
                    this.getRankingsEmployee(data)
                    .then(() => {
                        this.generateChart()
                    })

                    // .then(() => this.clearForm())
                    // this.getRankingsEmployee(this.datepicker)

                    // .then(() => {
                    // //     console.log(this.$data)
                    // //     this.$data._chart.update()
                    //     this.generateChart()
                    // })
            },
            generateChart(){
                this.showPDF = true
                this.showExcel = true
                // console.log(this.$store.state.ranking.data)
                this.lineChartData.datasets[0].data = this.$store.state.ranking.data

                let startDate= new Date(this.datepicker)
                let year = startDate.getFullYear() 
                // let month = startDate.getMonth() 
                this.lineChartOptions.title.text = 'Graph of ' + `${this.$route.params.nama}` + "'s "+ 'Total Assessment in ' + `${year}`

                // var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
                // for(var i=0; i<12; i++){
                //     this.dataTable.data[i].month = monthNames[i]
                //     this.dataTable.data[i].total = this.$store.state.ranking.data[i]
                // }

                this.loaded = true
            },
            exportPDF(){
                let line= document.getElementById("line")

                const exp = new Exporter([line])
                exp.export_pdf().then((pdf) => {
                    pdf.save("line.pdf");
                });
            },
            exportExcel(){
                
                const data = this.tables
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
                // console.log(worksheet)
            }
        }
    }
</script>