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
    data: [] 
  }
// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes
const mutations = {
    initialLoad(){
      axios.get('https://api.coinmarketcap.com/v1/ticker/', {
            params: {
                limit: 10,
                convert: 'EUR'
            }
        }).then(res => {
             state.coin = res.data;
        })
    }
}

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
   
  }

  // getters are functions
const getters = {
    getCoins(state){
      return state.coin;
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