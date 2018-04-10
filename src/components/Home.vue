<template>
  <section>
      <Search/>
      <section class="bg-brand-grey w-screen py-10 mt-10">
            <div class="container mx-auto">
          <FilterButtons/>
          <template-inline->
              <div class="flex flex-row mt-10 text-brand-grey-dark">
                  <span class="ml-4">#</span>
                  <span class="ml-10">Name And Description</span>
              </div>
          </template-inline->
          <crypto-card/>
            </div>
      </section>
  </section>
</template>
<script>
import Search from '@/components/Search';

import FilterButtons from '@/components/FilterButtons';
import CryptoCard from '@/components/CryptoCard'
export default {
    components: {
        Search,
        FilterButtons,
        CryptoCard
    },
    data() {
        return{
            message: 'hello world test'
        }
    }
  
}
</script>
