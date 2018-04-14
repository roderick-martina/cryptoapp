<template>
    <section>
    <Search/>
    <section class="bg-brand-grey w-screen py-10 mt-10">
         <div class="container mx-auto">
            <div v-if="chartLoading" class="h-full py-32">
                <div class="lds-roller flex flex-row  w-full justify-center" style="margin-top:3.5rem"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
            <div v-if="!chartLoading" class="flex flex-row  w-full mt-10">
                <LineChart  :data="Data" :options="this.options" class="w-3/4"/>
                <div class="w-1/4 rounded shadow h-64 bg-white flex">
                    <img class="w-6 h-6 ml-4 mt-4" slot="image" :src="coin.ImageUrl"/>
                    <h2 class="ml-4 mt-4 text-xl">{{coin.FullName}}</h2>
                </div>
            </div>
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
        chartLoading(){
            return this.$store.state.chartLoading
        },
        coin(){
            return this.$store.state.currentCoin
        },
        Data() { 
                var chartData = {
                    labels: this.horizontalChartData,
                    datasets: [{
                        backgroundColor: '#6fa2fc',
                        borderColor: '#6772e5',
                        data: this.verticleChartData,
                        lineTension: 0
                    }]
            }            
            return chartData
        }
    },
    mounted() {
        this.fetchData()
        this.$store.commit('search')
    },
    watch: {
    '$route' (to, from) {
      // react to route changes...
      this.renderChart(this.data, this.options)
      this.fetchData()
    }
  },
  methods: {
      fetchData() {
        this.$store.commit('getHistoricalData',this.symbol)
        this.$store.commit('getCoinInfo', this.symbol)
      }
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
