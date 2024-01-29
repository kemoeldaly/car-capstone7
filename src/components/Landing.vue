<template>
  <div class="bg-sky-100 dark:bg-slate-950 rounded-lg p-8 ring-sky-600/5 shadow w-full transition-all duration-500">
    <div class="mb-4 text-3xl flex justify-center">
      <h1 class="mb-4 flex justify-center items-center font-bold text-black dark:text-white">Vehicle Recall Search</h1>
    </div>
  
    <div v-if="errorMessages.length" class="flex justify-center text-sm font-bold text-black dark:text-white mt-4 mb-2">
      <ul>
        <li v-for="(errorMessage, index) in errorMessages" :key="index">{{ errorMessage }}</li>
      </ul>
    </div>

    <div class="flex justify-center mb-4">
      <input
        type="text"
        placeholder="Model Year"
        v-model="modelYear"
        class="w-96 p-2 border border-gray-300 rounded transition-all duration-300"
      />
    </div>
  
    <div class="flex justify-center mb-4">
      <input
        type="text"
        placeholder="Make"
        v-model="make"
        class="w-96 p-2 border border-gray-300 rounded transition-all duration-300"
      />
    </div>

    <div class="flex justify-center mb-4">
      <input
        type="text"
        placeholder="Model"
        v-model="model"
        class="w-96 p-2 border border-gray-300 rounded transition-all duration-300"
      />
    </div>

    <div class="flex justify-center">
      <button
        @click="handleSearchClick"
        class="w-96 dark:bg-slate-900 dark:text-white bg-sky-200 text-black rounded cursor-pointer transition-all duration-300 text-md p-2 hover:bg-sky-300 dark:hover:bg-blue-600"
      >
        Search Recalls
      </button>
    </div>

    <div class="text-black dark:text-white">
      <template v-if="hasSearchResults">
        <div>
          <h2 class="text-black dark:text-white text-xl font-bold mb-4">{{ searchResults.Count }} Results Found</h2>
          <div v-for="(result, index) in searchResults.results" :key="index" class="mb-2 p-4 border border-gray-300 rounded">
            <h3 class="text-lg font-semibold mb-2">{{ result.Manufacturer }}</h3>
            <p class="group/item hover:bg-slate-100"><strong>Campaign Number:</strong> {{ result.NHTSACampaignNumber }}</p>
            <p class="hover:bg-slate-100"><strong>Report Received Date:</strong> {{ result.ReportReceivedDate }}</p>
            <p><strong>Component:</strong> {{ result.Component }}</p>
            <p><strong>Summary:</strong> {{ result.Summary }}</p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'recalls',
  props: {
    onSearch: Function,
    searchResults: Object,
    errorMessages: Array,
  },
  setup(props) {
    const modelYear = ref('');
    const make = ref('');
    const model = ref('');

    const hasSearchResults = computed(() => {
      return props.searchResults?.results?.length > 0;
    });

  
    const handleSearchClick = () => {
      props.onSearch(modelYear.value, make.value, model.value);
    };

    return {
      modelYear,
      make,
      model,
      handleSearchClick,
      hasSearchResults,
    };
  },
};
</script>
