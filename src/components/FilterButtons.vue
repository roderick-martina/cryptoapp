<template>
              <div class="flex flex-row">
            <FilterSelectButton :options="['EUR','USD']" class="md:w-24 md:ml-0 ml-4" style="width:6.75rem"></FilterSelectButton>
            <div class="flex flex-row w-full justify-end">
                <Button class="md:mr-1 mr-4 flex flex-row-reverse" @click.native="prevPage" v-show="currentPage > 0">
                <span slot="text" class="font-medium outline-none md:inline-block hidden">Previous 10</span>
                <span slot="svg">
                    <svg class="w-4 h-3 ml-1 font-medium" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 31.494 31.494" style="enable-background:new 0 0 31.494 31.494;" xml:space="preserve">
                    <path style="fill:#1E201D;" d="M10.273,5.009c0.444-0.444,1.143-0.444,1.587,0c0.429,0.429,0.429,1.143,0,1.571l-8.047,8.047h26.554
                        c0.619,0,1.127,0.492,1.127,1.111c0,0.619-0.508,1.127-1.127,1.127H3.813l8.047,8.032c0.429,0.444,0.429,1.159,0,1.587
                        c-0.444,0.444-1.143,0.444-1.587,0l-9.952-9.952c-0.429-0.429-0.429-1.143,0-1.571L10.273,5.009z"/>
                    </svg>
                </span>
            </Button>
                <Button class="md:mr-1 mr-4" @click.native="nextPage">
                <span slot="text" class="font-medium outline-none md:inline-block hidden">Next 10</span>
                <span slot="svg">
                    <svg class="w-4 h-3 ml-1" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 31.49 31.49" style="enable-background:new 0 0 31.49 31.49;" xml:space="preserve">
                    <path style="fill:#1E201D;" d="M21.205,5.007c-0.429-0.444-1.143-0.444-1.587,0c-0.429,0.429-0.429,1.143,0,1.571l8.047,8.047H1.111
                        C0.492,14.626,0,15.118,0,15.737c0,0.619,0.492,1.127,1.111,1.127h26.554l-8.047,8.032c-0.429,0.444-0.429,1.159,0,1.587
                        c0.444,0.444,1.159,0.444,1.587,0l9.952-9.952c0.444-0.429,0.444-1.143,0-1.571L21.205,5.007z"/>
                    </svg>
                </span>
            </Button>
            <!-- <Button>
                <button slot="text" class="font-medium outline-none">View all</button>
            </Button> -->
            </div>
              </div>
</template>
<script>
import FilterSelectButton from '@/components/FilterSelectButton';
import Button from '@/components/Button';
export default {
  components: {
        FilterSelectButton,
        Button,
  },
  computed: {
      currentPage() {
          return this.$store.state.currentPage
      }
  },
  methods: {
    nextPage() { 
        this.$store.commit('nextPage');
        this.$store.dispatch('loadData')
    },
    prevPage() { 
        this.$store.commit('prevPage');
        this.$store.dispatch('loadData')
    },
  }
}
</script>

