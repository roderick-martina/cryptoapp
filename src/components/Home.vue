<template>
  <section>
      <Search/>
      <section class="bg-brand-grey w-screen py-10 mt-10">
            <div class="container mx-auto">
          <FilterButtons/>
            <CryptoTitles/>
                <crypto-card v-for="(coin, index) in coins" :key="index" @click.native="navToDetail(coin.symbol)">
                    <span class="mx-6 flex flex-col justify-center" slot="index">{{index + 1}}</span>
                        <img class="w-6 h-6 " slot="image" :src="imageLink(coin.ImageUrl)"/>
                        <span class="ml-2 text-xl" slot="currency">{{coin.name}}</span>
                        <span class="flex-1" slot="marketCap">{{coin.extendedInfo.MKTCAP}}</span>
                        <span class="ml-8 w-24" slot="price">{{coin.extendedInfo.PRICE}}</span>
                        <span class="flex-1" slot="volume">{{coin.extendedInfo.TOTALVOLUME24HTO}}</span>
                        <span class="flex-1" slot="supply">{{coin.extendedInfo.SUPPLY}}</span>
                        <span class="flex-1" slot="change">{{coin.extendedInfo.CHANGE24HOUR}}</span>
                        <span class="flex-1" slot="graph"></span>
                    </crypto-card>
            </div>
      </section>
  </section>
</template>
<script>
import Search from '@/components/Search';
import FilterButtons from '@/components/FilterButtons';
import CryptoCard from '@/components/CryptoCard';
import CryptoTitles from '@/components/CryptoTitles';

export default {
    computed: {
        crypto() {
            return this.$store.state.crypto
        },
        coins() {
            return this.$store.getters.getCryptoList;
        },
    },
    components: {
        Search,
        FilterButtons,
        CryptoCard,
        CryptoTitles,
        
    },
    methods: {
        imageLink(link) {
            return 'https://www.cryptocompare.com' + link;
        },
        navToDetail(sym) {
            this.$router.push({
                path: '/coins/' + sym,

            })
        },
        test(){
            console.log('clicked')
        }
    },
    data() {
        return{
            
        }
    },
    mounted(){
        this.$store.commit('initialLoad');
        this.$store.commit('search')
    },
  
}
</script>
