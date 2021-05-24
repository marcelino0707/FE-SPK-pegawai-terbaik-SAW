<template>
    <div class="container-fluid">
        <div class="card">
            <div class="card-header">
                <h4 class="card-title">
                    Graph Employee Ranking {{ }}
                </h4>
            </div>
            <div class="card-body row">
                <div class="row justify-content-between mb-4 ml-1">
                    <!-- Datepicker -->
                    <div class="col-auto">
                        <b-form-datepicker placeholder="Pilih Bulan dan Tahun" id="example-datepicker" v-model="datepicker"  @input="changeDate" ></b-form-datepicker>
                    </div>
                    <div >
                        <button v-if="loaded" class="btn btn-info" @click="exportPDF">    
                            Export PDF
                        </button>
                    </div>
                </div>
                <div class="col-md-12">
                    <div >
                        <bar-chart 
                            id="bar"
                            v-if="loaded"
                            :chart-data="barChartData" :options="barChartOptions" :height="400"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex'
    import BarChart from '~/components/BarChart'
    import Exporter from "vue-chartjs-exporter";
    export default {
        async asyncData({store}) {
            await Promise.all([
                store.dispatch('ranking/getExportAll')
            ])
            return 
        },
        components: {
            'bar-chart' : BarChart
        },
        // data: () => ({
        data() {
            return {
                loaded: false,
                datepicker: null,
                barChartData: {
                    labels: [],
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
                            label: 'Total',
                            data: [],
                            backgroundColor: '#5DADE2 '
                        }
                    ]
                },
                barChartOptions: {
                    
                    responsive: true,
                    maintainAspectRatio: false,
                    // legend: {
                    //     display: true
                    // },
                    title: {
                        display: true,
                        // text: 'Graph The Best Employee ' + `${ this.datepicker }`,
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
                                    display: true
                                },
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
        //   }),
        computed: {
            ...mapState('ranking', {
                rankings: state => state.rankings,
                labels: state => state.labels,
                datasets: state => state.datasets
            }),
        },
        mounted() {
             this.loaded = false
 
            // this.generateChart()
        },
        methods: {
            ...mapActions('ranking', ['getExportAll']),
            changeDate() {
                this.loaded = false
                this.getExportAll(this.datepicker)
                .then(() => {
                    this.generateChart()
                })
            },
            generateChart() {
                this.barChartData.datasets[0].data = this.$store.state.ranking.datasets
                this.barChartData.labels = this.$store.state.ranking.labels
                
                // this.barChartData.datasets[0].barPercentage = this.$store.state.ranking.datasets

                let startDate= new Date(this.datepicker)
                let year = startDate.getFullYear() 
                let month = startDate.getMonth() 
                var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
                this.barChartOptions.title.text = 'Graph of The Best Employee in ' + `${ monthNames[month]}` + ' (' + `${year}` + ')'

                this.loaded = true
            },
            exportPDF() {
                let bar= document.getElementById("bar")

                const exp = new Exporter([bar])
                exp.export_pdf().then((pdf) => {
                    pdf.save("charts.pdf");
                });




                // var doc = new jsPDF('p','pt')
                // var data = this.$store.state.ranking.datasets
                // doc.autoTable(this.$store.state.ranking.labels,this.$store.state.ranking.datasets)
                // // doc.table(1, 1, this.$store.state.ranking.datasets,this.$store.state.ranking.labels, { autoSize: true })
                // // doc.text(data, 10, 10)
                // doc.save("rank.pdf")
            }
        }
    }
</script>
