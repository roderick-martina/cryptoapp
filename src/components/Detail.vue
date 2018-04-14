<template>
    <section>
    <Search/>
    <section class="bg-brand-grey w-screen py-10 mt-10">
         <div class="container mx-auto">
            <div v-if="chartLoading" class="h-full py-32">
                <div class="lds-roller flex flex-row  w-full justify-center" style="margin-top:3.5rem"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
            <div v-if="!chartLoading" class="flex flex-row  w-full mt-10">
                <LineChart  :data="Data" :options="this.options" class="" style=" width:70%; margin-right:5%"/>
                <div class="rounded shadow bg-white flex flex-col" style="width:30%">
                <div class="flex flex-row">
                    <img class="w-6 h-6 ml-8 mt-4" slot="image" :src="coin.ImageUrl"/>
                    <h2 class="ml-4 mt-4 text-xl font-normal">{{coin.FullName}}</h2>
                </div>
                <div class="flex row px-8 pt-4 px-4 font-medium">
                    <span class="flex-1">Price:</span>
                    <span class="flex-1 text-right">{{coin.extendedInfo.PRICE}}</span>
                </div>
                <div class="flex row px-8 pt-4 px-4 font-medium">
                    <span class="flex-1">Marketcap:</span>
                    <span class="flex-1 text-right">{{coin.extendedInfo.MKTCAP}}</span>
                </div>
                <div class="flex row px-8 pt-4 px-4 font-medium">
                    <span class="flex-1">Supply:</span>
                    <span class="flex-1 text-right">{{coin.extendedInfo.SUPPLY}}</span>
                </div>
                <div class="flex row px-8 pt-4 px-4 font-medium">
                    <span class="flex-1">Open(24H):</span>
                    <span class="flex-1 text-right">{{coin.extendedInfo.OPEN24HOUR}}</span>
                </div>
                <div class="flex row px-8 pt-4 px-4 font-medium">
                    <span class="flex-1">High(24H):</span>
                    <span class="flex-1 text-right">{{coin.extendedInfo.HIGH24HOUR}}</span>
                </div>
                <div class="flex row px-8 pt-4 px-4 font-medium">
                    <span class="flex-1">Low(24H):</span>
                    <span class="flex-1 text-right">{{coin.extendedInfo.LOW24HOUR}}</span>
                </div>
                <div class="flex row px-8 pt-4 px-4 font-medium">
                    <span class="flex-1">Change(24H):</span>
                    <span :class="[checkPrice(coin.extendedInfo.CHANGE24HOUR) ? 'text-red' : 'text-green', 'flex-1 text-right']">{{coin.extendedInfo.CHANGE24HOUR}}</span>
                </div>
                <div class="flex row px-8 pt-4 px-4 font-medium">
                    <span class="flex-1">Change(%)(24H):</span>
                    <span :class="[checkPrice(coin.extendedInfo.CHANGEPCT24HOUR) ? 'text-red' : 'text-green', 'flex-1 text-right']">{{coin.extendedInfo.CHANGEPCT24HOUR}}%</span>
                </div>
                <div class="flex row px-8 pt-4 px-4 font-medium">
                    <span class="flex-1">Volume(24H):</span>
                    <span class="flex-1 text-right">{{coin.extendedInfo.VOLUMEDAYTO}}</span>
                </div>
                <div class="flex row px-8 pt-4 px-4 font-medium">
                    <span class="flex-1">Algorithm:</span>
                    <span class="flex-1 text-right">{{coin.Algorithm}}</span>
                </div>                
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
      console.log('refresh')
    }
  },
  methods: {
      fetchData() {
        this.$store.commit('getHistoricalData',this.symbol)
        this.$store.commit('getCoinInfo', this.symbol)
      },
      checkPrice(str){
            var char = str.substr(0, 1)
            if (char == '-') {
                return true
            } else {
                return false
            }
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

