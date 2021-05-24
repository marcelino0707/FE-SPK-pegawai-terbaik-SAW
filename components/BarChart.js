import { Bar, mixins} from 'vue-chartjs'
const { reactiveProp } = mixins
export default {
  extends: Bar,
  // mixins: [mixins.reactiveProp],
  mixins: [reactiveProp],
  props: ['options'],
  // props: ['data','options'],
  // data: {
  //   chartData: {},
  //   options: {}
  // },
  // props: ['data', 'options', 'height'],
  // props: {
  //   data: {
  //     type: Object,
  //     default: null
  //   },
  //   options: {
  //     type: Object,
  //     default: null
  //   }
  // },
  mounted() {
    // return new Promise((resolve, reject) => {
      // console.log(this._data)
      // this._chart.destroy()
      // this._data._chart
      this.renderChart(
          // this.data, this.options, this.height
          // {
          //   labels: this.data.labels,
          //   datasets: [
          //     {
          //       label : 'Total',
          //       backgroundColor: '#5DADE2 ',
          //       data: this.data.datasets[0].data,
          //     }
          //   ]
          // },
          // this.options,
          // this.height 
          this.chartData, this.options
      )
      
    // }).then(() => resolve())
  },
  // watch: {
  //   chartData: {             
  //     deep: true,              
  //     handler() {                               
  //       this.renderChart(this.data, this.options);                             
  //     }         
  //   }     
  // }
  watch: {
    chartData () {
      // console.log(this.$data._chart)
      this._data._chart.destroy()
      this.renderChart(this.chartData, this.options)
    }
  }
//   watch: {
//     chartData(){
//       console.log(this._data._chart)
//         this._data._chart.destroy();
//         this.renderChart(this.chartData, this.options);
//     }
//   },
//   methods: {
//     chartData(){
//         console.log(this._chart)
//         this._data._chart.destroy();
//         this.renderChart(this.chartData, this.options);
//     }
// }
}