<template>
    <section>
    <Search/>
    <section class="bg-brand-grey w-screen py-10 mt-10">
         <div class="container mx-auto">
            <LineChart :data="Data" :options="this.options" class="mt-10"/>
         </div>
    </section>
    </section>
</template>
<script>
import LineChart from '@/components/chart/LineChart'
import Search from '@/components/Search';

export default {
  components: {
       LineChart,
      Search
  },
    computed: {
        chartData() {
            return this.$store.state.chartData
        },
        horizontalChartData() {
            return this.$store.state.horizontalChartData
        },
        verticleChartData() {
            return this.$store.state.verticleChartData
        },
        Data() { 
                var chartData = {
                    labels: this.horizontalChartData,
                    datasets: [{
                        backgroundColor: '#6fa2fc',
                        borderColor: '#6772e5',
                        data: this.verticleChartData,
                    }]
            }
            return chartData
        }
    },
    beforeMount() {
        this.$store.commit('getHistoricalData',this.symbol)
    },
    data() {
        return{
            
            symbol: this.$route.params.name,

            
            options: {
                responsive: true, 
                maintainAspectRatio: false, 
                legend: { 
                    display: false, 
                    labels: { defaultFontFamily: "'Rubik', 'Source Sans Pro'" }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            fontColor: "rgba(0,0,0,0.5)",
                            fontStyle: "bold",
                            maxTicksLimit: 5,
                            padding: 20
                        },
                        gridLines: {
                            drawTicks: false,
                            display: false
                        }
                     }],
                    xAxes: [{
                        gridLines: {
                            drawTicks: false,
                            display: false
                        },
                        ticks: {
                            padding: 20,
                            fontColor: "rgba(0,0,0,0.5)",
                            fontStyle: "bold"
                        }
                    }]
                }
            }
        }
    }
}
</script>
