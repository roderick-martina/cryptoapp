import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Fuse from 'fuse.js'

Vue.use(Vuex)
// root state object.
// each Vuex instance is just a single state tree.
const state = {

    cryptoList: [],
    tmplist: [],  //don't remove temp list otherwise it won't work
    currentPage: 0,
    // searchResult: ['Bitcoin','42','GIFTO','Ontology','NEO','IOS token','Monero','QTUM','Storm'],
    searchResult: [],
    searchList: [],
    homePageLoading: true,
    searchLoading: true,
    chartLoading: true,
    chartData: [],
    verticleChartData: [],
    horizontalChartData: [],
    currencys: ['EUR', 'USD'],
    activeCurrency: 'EUR',
    apiAppName: 'c2go',
    currentCoin: null

  }
// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes
const mutations = {
    nextPage() {
      this.state.currentPage ++;
    },
    search(searchQuery){
      this.state.searchList = [] // empty search result list
      axios.get('https://min-api.cryptocompare.com/data/all/coinlist',{
        params: {
          extraParams: state.apiAppName
        }
      })
        .then(res => {
          var data =res.data.Data
          Object.values(data).reduce((newCoin, currentCoin ) => {
            newCoin = {
              name: currentCoin.CoinName,
              symbol: currentCoin.Symbol
            }
            this.state.searchList.push(newCoin);
          }, [])
          
         
          
        })
    },
    getTestSearchResult(state,searchQuery){
      this.state.searchResult = [] // empty search result list
      this.state.loading = true // activate loading spinner
      const list = this.state.searchList;
      var options = {
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: ['name'],
      };
      var fuse = new Fuse(list, options)
      
       let result  = fuse.search(searchQuery)
       setTimeout(() => {
        this.state.searchResult = result;
        this.state.searchLoading = false
      }, 500);
      
    },
    getHistoricalData(state,symbol) {
      this.state.verticleChartData = [] //empty list
            this.state.horizontalChartData = [] //empty list
            this.state.chartData = [] //empty list
      axios.get('https://min-api.cryptocompare.com/data/histoday', {
        params: {
          fsym: symbol,
          tsym: 'EUR',
          limit: 6
        }
      }).then(res => {
        var data = res.data.Data
        data.reduce((newDate, oldDate) => {
          // Create a new JavaScript Date object based on the timestamp
            // multiplied by 1000 so that the argument is in milliseconds, not seconds.
            var date = new Date(oldDate.time*1000);
            // Hours part from the timestamp
            var hours = date.getHours();
            // Minutes part from the timestamp
            var minutes = "0" + date.getMinutes();
            // Seconds part from the timestamp
            var seconds = "0" + date.getSeconds();
            // Will display time in 10:30:23 format
            var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
            var month = date.getMonth() + 1
            var day = date.toDateString().split(' ')[2]
            newDate = {
              time: date,
              month: month ,
              day: day,
              close: oldDate.close,
              high: oldDate.high,
              low: oldDate.low,
              open: oldDate.open,
              volumefrom: oldDate.volumefrom,
              volumeto: oldDate.volumeto
            }
            this.state.verticleChartData.push(newDate.close)
            this.state.horizontalChartData.push(day+'/'+month)
            this.state.chartData.push(newDate)
        },[])
      }) 
    },
    changeCurrencyValue(state,val){
      state.activeCurrency = val
    },
    getCoinInfo(state,symbol){
      axios.get('https://min-api.cryptocompare.com/data/coin/generalinfo',{
        params:{
          fsyms: symbol,
          tsym: state.activeCurrency
        }
      }).then(res => {
        var data = res.data.Data[0].CoinInfo
        console.log(data)
        data.ImageUrl = 'https://www.cryptocompare.com' + data.ImageUrl
        state.currentCoin = data
        this.state.chartLoading = false

      })
    }
  }
  


// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
  loadData(context){
      this.state.homePageLoading = true
      this.state.cryptoList = []
      this.state.tmplist = []
      axios.get('https://min-api.cryptocompare.com/data/top/totalvol', {
        params: {
          limit: 10,
          tsym: this.state.activeCurrency,
          page: this.state.currentPage,
          extraParams: this.state.apiAppName
        }
      })
      .then(res => {
            let data = res.data.Data
            if(data.length < 1) {
              setTimeout(() => {
                // this.state.currentPage ++
                console.log(this.state.homePageLoading)
                context.dispatch('LoadAgain')
                console.log('error: load again')
              }, 500);
              
            }
            else {
              data.reduce((newItem, item) => {
                newItem = {
                  name : item.CoinInfo.FullName,
                  id : item.CoinInfo.Id,
                  ImageUrl : 'https://www.cryptocompare.com' + item.CoinInfo.ImageUrl,
                  symbol : item.CoinInfo.Name
                }
                this.state.tmplist.push(newItem)
              }, {}) 

              //get more information about the crypto coin and add it to the list
          state.tmplist.map(item => {
            axios.get('https://min-api.cryptocompare.com/data/pricemultifull', {
              params: {
                fsyms: item.symbol,
                tsyms: this.state.activeCurrency,
                extraParams: this.state.apiAppName
              }
            }).then(res => {
              var cryptoName = Object.values(res.data.DISPLAY)[0]
              var cyptoInfo = Object.values(cryptoName)[0]
              item.extendedInfo = cyptoInfo
              this.state.cryptoList.push(item)
              this.state.homePageLoading = false
            })
          })
            }    
      })
  },
  LoadAgain(context){
      this.state.homePageLoading = true
      this.state.cryptoList = []
      this.state.tmplist = []
      axios.get('https://min-api.cryptocompare.com/data/top/totalvol', {
        params: {
          limit: 10,
          tsym: this.state.activeCurrency,
          page: this.state.currentPage,
          extraParams: this.state.apiAppName
        }
      })
      .then(res => {
            let data = res.data.Data
            var skipPage = 1
            if(data.length < 1) {
              setTimeout(() => {
                this.state.currentPage ++
                context.dispatch('loadData')
                console.log('error: load again')
              }, 500);
              this.state.currentPage  += skipPage
            }
            else {
              data.reduce((newItem, item) => {
                newItem = {
                  name : item.CoinInfo.FullName,
                  id : item.CoinInfo.Id,
                  ImageUrl : 'https://www.cryptocompare.com' + item.CoinInfo.ImageUrl,
                  symbol : item.CoinInfo.Name
                }
                this.state.tmplist.push(newItem)
              }, {}) 

              //get more information about the crypto coin and add it to the list
          state.tmplist.map(item => {
            axios.get('https://min-api.cryptocompare.com/data/pricemultifull', {
              params: {
                fsyms: item.symbol,
                tsyms: this.state.activeCurrency,
                extraParams: this.state.apiAppName
              }
            }).then(res => {
              var cryptoName = Object.values(res.data.DISPLAY)[0]
              var cyptoInfo = Object.values(cryptoName)[0]
              item.extendedInfo = cyptoInfo
              this.state.cryptoList.push(item)
              this.state.homePageLoading = false
            })
          })
            }    
      })
  }
}

  // getters are functions
const getters = {
    getCryptoList(state){
      return state.cryptoList;
    },
    getSearchResult(state){
      return state.searchResult;
    },
    getLoadingState(state) {
      return state.searchLoading;
    },
    getChartData(state) {
      return state.chartData
    }
    
  }
  
  // A Vuex instance is created by combining the state, mutations, actions,
  // and getters.
  export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
  })