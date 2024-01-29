<template>
  <div class="home">
    <App />
    <Landing :onSearch="handleSearch" :searchResults="searchResults" :errorMessages="errorMessages" v-if="$store.state.user" />
    <Recalls v-if="$store.state.user" />
    <CarSpecs v-if="$store.state.user" />
    
  </div>
</template>

<script>
import Recalls from '@/components/Recalls.vue';
import CarSpecs from '@/components/CarSpecs.vue';

export default {
  name: 'HomeView',
  components: {
    Recalls,
    CarSpecs,
  },
};
</script>
