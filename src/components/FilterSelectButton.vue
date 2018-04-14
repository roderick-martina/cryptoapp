<template>
  <div class="relative mr-1">
    <select v-model="selected" class="font-medium block appearance-none outline-none w-full bg-white text-black hover:border-grey px-4 py-3 pr-8 rounded shadow">
      <option v-for="(option, index) in options" :key="index" >{{option}}</option>
    </select>
    <div class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
      <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
    </div>
</div>
</template>

<script>
export default {
  data(){
    return{
      selected: 'EUR'
    }
  },
  props: ['options'],
  computed: {
    activeCurrency() {
      return this.$store.state.activeCurrency
    }
  },
    watch: {
      selected: function(selected) {
        console.log(selected)
          if(selected != this.activeCurrency){
            this.$store.commit('changeCurrencyValue',selected);
            this.$store.dispatch('loadData')
          }
      }
  },
  
}
</script>
