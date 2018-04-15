<template>
    <section style="overflow-x:hidden">
    <Search/>
    <section class="bg-brand-grey w-screen lg:py-10 py-4 lg:mt-10 mt-4 ">
         <div class="container mx-auto">
            <div v-if="chartLoading" class="w-full flex flex-row lg:mt-14 lg:my-8 justify-center lg:py-32 py-0">
                <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
            <div v-if="error.length > 0" class="font-medium text-center w-full">
                {{error[0]}}
                <p class="mt-1">Search for another currency or click the button to go the homepage</p>
                <button class="rounded bg-brand-blue py-3 px-4 mt-4 font-medium text-white outline-none btn" @click="navToHome">Homepage</button>
            </div>
            <button v-if="!chartLoading && !chartData && error.length == 0" class="ml-4 lg:ml-0 rounded bg-brand-blue py-3 px-4 font-medium text-white outline-none btn" @click="navToHome">Home</button>
                <div v-if="!chartLoading &&  !chartData && error.length == 0" class="flex flex-col lg:flex-row w-full lg:mt-10 mt-0">
                    <LineChart  :data="Data" :options="this.options" class="lg:w-2/3 w-full mt-4 lg:mt-0"/>
                    <div class="rounded shadow bg-white flex flex-col lg:w-1/3 lg:ml-4 lg:mt-0 mt-4 w-full">
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
                            <span class="w-full text-right">{{coin.extendedInfo.SUPPLY}}</span>
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
                            <span :class="[checkPrice(coin.extendedInfo.CHANGE24HOUR.substr(2)) ? 'text-red' : 'text-green', 'flex-1 text-right']">{{coin.extendedInfo.CHANGE24HOUR}}</span>
                        </div>
                        <div class="flex row px-8 pt-4 px-4 font-medium">
                            <span class="flex-1">Change(24H)(%):</span>
                            <span :class="[checkPrice(coin.extendedInfo.CHANGEPCT24HOUR) ? 'text-red' : 'text-green', 'flex-1 text-right']">{{coin.extendedInfo.CHANGEPCT24HOUR}}%</span>
                        </div>
                        <div class="flex row px-8 pt-4 px-4 font-medium">
                            <span class="flex-1">Volume(24H):</span>
                            <span class="flex-1 text-right">{{coin.extendedInfo.VOLUMEDAYTO}}</span>
                        </div>
                        <div class="flex row px-8 py-4 px-4 font-medium">
                            <span class="flex-1">Algorithm:</span>
                            <span class="flex-1 text-right">{{coin.Algorithm}}</span>
                        </div>                
                    </div>
                </div>
            </div>
    </section>
    <Footer/>
    </section>
</template>
<script>
import LineChart from '@/components/chart/LineChart'
import Search from '@/components/Search';
import Footer from '@/components/Footer'


export default {
  components: {
        LineChart,
        Search,
        Footer
  },
    computed: {
        chartData() {
            // return this.$store.state.chartData
             return this.$store.state.chartLoading
        },
        horizontalChartData() {
            return this.$store.state.horizontalChartData
        },
        verticleChartData() {
            return this.$store.state.verticleChartData
        },
        chartLoading(){
            return this.$store.state.coinLoading
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
                        lineTension: 0,
                    }]
            }            
            return chartData
        },
        error() {
            return this.$store.state.detailError
        }
    },
    created() {
        this.fetchData(this.symbol)
        this.$store.commit('search')
    },
    watch: {
    '$route.params.name': function(name)  {
      // react to route changes...
        this.fetchData(name)
        this.$store.commit('search')
      console.log('refresh')
    }
  },
  methods: {
      fetchData(symbol) {
        this.$store.commit('getHistoricalData',symbol)
        this.$store.commit('getCoinInfo', symbol)
      },
      checkPrice(str){
            var char = str.substr(0, 1)
            if (char == '-') {
                return true
            } else {
                return false
            }
        },
        navToHome() {
            this.$router.push({
                path: '/',
            })
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
                            display: true
                        }
                     }],
                    xAxes: [{
                        gridLines: {
                            drawTicks: false,
                            display: true
                        },
                        ticks: {
                            padding: 20,
                            fontColor: "rgba(0,0,0,0.5)",
                            fontStyle: "bold"
                        }
                    }]
                },
                tooltips: {
                    xPadding: 12,
                    yPadding: 12,
                    caretSize: 12,
                    displayColors: false,
                    callbacks: {
                        afterTitle: function(tooltipItem,data) {
                            return 'Close: '
                        },
                        title: function(tooltipItem,data) {
                            return '';
                        }
                    }
                }
            }
        }
    }
}
</script>

