import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
// root state object.
// each Vuex instance is just a single state tree.
const state = {
    crypto: [
        {
            img: './assets/logo.png',
            name: 'Bitcoin'
        }      
    ],
    cryptoList: [],
    tmplist: []  //don't remove temp list otherwise it won't work
  }
// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes
const mutations = {
    initialLoad(){
      // axios.get('https://api.coinmarketcap.com/v1/ticker/', {
        axios.get('https://min-api.cryptocompare.com/data/top/totalvol?limit=10&tsym=EUR')
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
                console.log(cyptoInfo)
                item.extendedInfo = cyptoInfo
                this.state.cryptoList.push(item)
              })
            })
            
        })
    },
}

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
   
  }

  // getters are functions
const getters = {
    getCryptoList(state){
      return state.cryptoList;
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