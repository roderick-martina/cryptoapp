<template>
  <section class="container mx-auto">
    <form class="mx-auto bg-white rounded shadow-md outline-none mt-4 flex items-center" style="height:4.5rem;" @click.prevent>
        <input  @keyup.enter="search()" v-model="searchQuery"  ref="searchBox" class="w-full py-4 px-6 font-normal text-xl outline-none" type="search" placeholder="Zoek Crypto Valuta...."/>
        <button ref="searchButton" class="bg-brand-blue outline-none py-3 px-4 rounded text-white text-lg mr-4">
            <svg class="h-6 w-6 fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/></svg>
        </button>
        <div v-if="showDropdown"  ref="dropdownSearchBox" class="absolute z-10 mx-auto container h-48 bg-white rounded-b shadow-md mt-32 overflow-y-auto">
          <div v-for="(result, index) in searchResult" :key="index"  @click="navToDetail(result)" class="px-6 py-2  border-t hover:bg-brand-grey font-medium">
              {{result.name}}
            </div>
            <div v-show="loading" class="lds-roller flex flex-row  w-full justify-center" style="margin-top:3.5rem"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            <span class="text-lg font-medium pl-6 flex flex-row  w-full justify-center" style="margin-top:3.5rem" v-if="searchResult.length == 0 && !loading">No search result found :-(</span>
        </div>
    </form>
    
  </section>
</template>
<script>
export default {

  computed: {
    searchResult(){
     return this.$store.getters.getSearchResult;
    },
    loading(){
      return this.$store.getters.getLoadingState;
    }

    },
    data() {
      return{
        showDropdown: false,
        searchQuery: ''
      }
    },
    methods: {

      navToDetail(data) {
            this.$router.push({
                path: '/coins/' + data.symbol,

            })
        },
      search(){
      this.$store.commit('getTestSearchResult', this.searchQuery)
      this.showDropdown = true;
      if(this.searchResult.length > 0) {
        this.$refs.dropdownSearchBox.scrollTop = 0;
      }
    },
    hideDropdown(e) {
      let el = this.$refs.searchBox
      let target = e.target;
      if( el !== target && !el.contains(target)) {
        this.showDropdown = false
      } else if(el == target && el.contains(target) && this.searchResult.length > 0) {
        this.showDropdown = true
      }
    },
    //click event for search button @click.native does not work at the moment
    searchButton(e) {
      let el = this.$refs.searchButton
      let target = e.target;
      if(el == target && el.contains(target)) {
        this.search();
      } 
    },
    },
    created() {
      document.addEventListener('click', this.hideDropdown);
       document.addEventListener('click', this.searchButton);
    },
    destroyed () {
      document.removeEventListener('click', this.hideDropdown)
      document.removeEventListener('click', this.searchButton)
    }
    
  }

</script>
