<template>
  <div>
    <div id="nav" v-if="$store.state.user">
   
      <button class="w-80 dark:bg-slate-900 dark:text-white bg-sky-200 text-black rounded cursor-pointer transition-all duration-300 text-md p-2 hover:bg-sky-300 dark:hover:bg-blue-600" @click="$store.dispatch('logout')">Logout</button>
    </div>

    <div class="flex items-center justify-between mb-2">
      <Landing v-if="userAuthenticated" :onSearch="handleSearch" :searchResults="searchResults" :errorMessages="errorMessages" />
    </div>

    <router-view/>
  </div>
</template>

<script>
import { onBeforeMount, computed } from 'vue';
import { useStore } from 'vuex';
import { ref } from 'vue';
import Landing from './components/Landing.vue';


import { getRecallsByVehicle } from './components/apiService';

export default {
  name: 'App',
  components: {
    Landing,
  },
  setup() {
    const store = useStore();

    onBeforeMount(() => {
      store.dispatch('fetchUser');
    });

    const searchResults = ref(null);
    const errorMessages = ref([]);

    const userAuthenticated = computed(() => !!store.state.user);

    const handleSearch = async (modelYear, make, model) => {
      try {
        errorMessages.value = [];

        if (modelYear && make && model && userAuthenticated.value) {
          const recalls = await getRecallsByVehicle(modelYear, make, model);

          if (recalls && recalls.results && recalls.results.length > 0) {
            searchResults.value = recalls;
          } else {
            errorMessages.value.push('No recalls found for the given input.');
          }
        } else {
          errorMessages.value.push('Please fill in all input fields or sign in.');
        }
      } catch (error) {
        console.error('Error handling search:', error);
        errorMessages.value.push('An error occurred while processing the search.');
      }
    };

    return {
      userAuthenticated,
      searchResults,
      errorMessages,
      handleSearch,
    };
  },
};
</script>
