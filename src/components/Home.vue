<template>
  <section style="overflow-x:hidden">
      <Search/>
      <section class="bg-brand-grey w-screen md:py-10 py-4 md:mt-10 mt-4">
            <div class="container mx-auto">
          <FilterButtons/>
            <CryptoTitles/>
                <div v-if="loading" class="w-full flex flex-row md:mt-14 my-8 justify-center md:py-32 py-0">
                    <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                </div>
                <crypto-card v-if="!loading" v-for="(coin, index) in coins" :key="index" @click.native="navToDetail(coin.symbol)">
                    <span class="mx-6 flex flex-col justify-center" slot="index">{{index + 1}}</span>
                        <img class="w-6 h-6 " slot="image" :src="coin.ImageUrl"/>
                        <span class="ml-2 text-xl" slot="currency">{{coin.name}}</span>
                        <span class="md:flex-1 md:block hidden" slot="marketCap">{{coin.extendedInfo.MKTCAP}}</span>
                        <span class="flex-1 md:text-left text-center " slot="price">{{coin.extendedInfo.PRICE}}</span>
                        <span class="md:flex-1 md:block hidden" slot="volume">{{coin.extendedInfo.TOTALVOLUME24HTO}}</span>
                        <span class="md:flex-1 md:block hidden" slot="supply">{{coin.extendedInfo.SUPPLY}}</span>
                        <span :class="[checkPrice(coin.extendedInfo.CHANGEPCT24HOUR) ? 'text-red' : 'text-green'  , 'text-right mx-6 md:flex-1 md:text-center']" slot="change">{{coin.extendedInfo.CHANGEPCT24HOUR}}%</span>
                        <!-- <span class="flex-1" slot="graph"></span> -->
                    </crypto-card>
            </div>
      </section>
      <Footer/>
  </section>
</template>
<script>
import Search from '@/components/Search';
import FilterButtons from '@/components/FilterButtons';
import CryptoCard from '@/components/CryptoCard';
import CryptoTitles from '@/components/CryptoTitles';
import Footer from '@/components/Footer'

export default {
    computed: {
        crypto() {
            return this.$store.state.crypto
        },
        coins() {
            return this.$store.getters.getCryptoList;
        },
        activeCurrency() {
             return this.$store.state.activeCurrency;
        },
        loading(){
            return this.$store.state.homePageLoading;
        }
    },
    components: {
        Search,
        FilterButtons,
        CryptoCard,
        CryptoTitles,
        Footer
        
    },
    methods: {
        checkPrice(str){
            var char = str.substr(0, 1)
            if (char == '-') {
                return true
            } else {
                return false
            }
        },
        navToDetail(sym) {
            
            this.$router.push({
                path: '/coins/' + sym,

            })
        },
    },
    data() {
        return{
            
        }
    },
    mounted(){
        this.$store.dispatch('loadData')
        this.$store.commit('search')
    },
  
}
</script>
