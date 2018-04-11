<template>
  <section>
      <Search/>
      <section class="bg-brand-grey w-screen py-10 mt-10">
            <div class="container mx-auto">
          <FilterButtons/>
          <template-inline>
              <div class="flex flex-row mt-10 text-brand-grey-dark">
                  <span class="mx-6">#</span>
                  <span class="w-64">Name And Description</span>
                  <span class="flex-1">Marketcap</span>
                  <span class="ml-8 w-24">Price</span>
                  <span class="flex-1">Volume (24)</span>
                  <span class="flex-1">Circulating Supply</span>
                  <span class="flex-1">Change (24h)</span>
                  <span class="flex-1">Price graph (7d)</span>
              </div>
          </template-inline>
          <crypto-card v-for="(coin, index) in coins" :key="index">
              <span class="mx-6 flex flex-col justify-center" slot="index">{{index + 1}}</span>
                <img class="w-6 h-6 " slot="image" :src="imageLink(coin.ImageUrl)"/>
                <span class="ml-2 text-xl" slot="currency">{{coin.name}}</span>
                <span slot="marketCap" class="flex-1">{{coin.extendedInfo.MKTCAP}}</span>
                <span class="ml-8 w-24" slot="price">{{coin.extendedInfo.PRICE}}</span>
                <span class="flex-1" slot="volume">{{coin.extendedInfo.TOTALVOLUME24HTO}}</span>
                <span class="flex-1" slot="supply">{{coin.extendedInfo.SUPPLY}}</span>
                <span class="flex-1" slot="change">{{coin.extendedInfo.CHANGE24HOUR}}%</span>
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
        CryptoCard
    },
    methods: {
        imageLink(link) {
            return 'https://www.cryptocompare.com' + link;
        }
    },
    data() {
        return{
        }
    },
    created(){
        this.$store.commit('initialLoad');
        
    },
  
}
</script>
