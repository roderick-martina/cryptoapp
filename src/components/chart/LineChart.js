// LineChart.js
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['data', 'options'],
  mounted () {
    console.log(this)
    this.renderChart(this.data, this.options)
  },
  watch: {
    '$route' (to, from) {
      // react to route changes...
      this.renderChart(this.data, this.options)
    }
  },
}