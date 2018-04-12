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
    currentPage: 1,
    // searchResult: ['Bitcoin','42','GIFTO','Ontology','NEO','IOS token','Monero','QTUM','Storm'],
    searchResult: [],
    searchList: [],
    loading: true
  }
// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes
const mutations = {
    initialLoad(){
      // axios.get('https://api.coinmarketcap.com/v1/ticker/', {
        console.log(this.state.currentPage)
        this.state.cryptoList = []
        this.state.tmplist = []
        axios.get('https://min-api.cryptocompare.com/data/top/totalvol', {
          params: {

            limit: 10,
            tsym: 'EUR',
            page: this.state.currentPage
          }
        })
        .then(res => {
              res.data.Data.reduce((newItem, item) => {
              newItem = {
                name : item.CoinInfo.FullName,
                id : item.CoinInfo.Id,
                ImageUrl : item.CoinInfo.ImageUrl,
                symbol : item.CoinInfo.Name
              }
              this.state.tmplist.push(newItem)
            }, {}) 

            //get more information about the crypto coin and add it to the list
            state.tmplist.map(item => {
              axios.get('https://min-api.cryptocompare.com/data/pricemultifull', {
                params: {
                  fsyms: item.symbol,
                  tsyms: 'EUR'
                }
              }).then(res => {
                var cryptoName = Object.values(res.data.DISPLAY)[0]
                var cyptoInfo = Object.values(cryptoName)[0]
                item.extendedInfo = cyptoInfo
                this.state.cryptoList.push(item)
              })
            })
            
        })
    },
    nextPage() {
      this.state.currentPage ++;
    },
    search(searchQuery){
      axios.get('https://min-api.cryptocompare.com/data/all/coinlist')
        .then(res => {
          var data =res.data.Data
          Object.values(data).reduce((newCoin, currentCoin ) => {
            newCoin = {
              name: currentCoin.CoinName,
              symbol: currentCoin.Symbol
            }
            this.state.searchList.push(newCoin);
          }, [])
          
          // console.dir(this.state.searchList)
          
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
        this.state.loading = false
      }, 500);
      
    }
  }


// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
   
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
      return state.loading;
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