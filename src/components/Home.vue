<template>
  <section>
      <Search/>
      <section class="bg-brand-grey w-screen py-10 mt-10">
          <FilterButtons/>
          
      </section>
  </section>
</template>
<script>
import Search from '@/components/Search';

import FilterButtons from '@/components/FilterButtons';
export default {
    components: {
        Search,
        FilterButtons
    }
  
}
</script>
