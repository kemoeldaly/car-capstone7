<template>
  <div>
    <!-- Display search results and error messages -->
    <div v-if="searchResults">
      <h2>Search Results</h2>
   
    </div>

    <div v-if="errorMessages.length">
      <h2>Error Messages</h2>
      <ul>
        <li v-for="(errorMessage, index) in errorMessages" :key="index">{{ errorMessage }}</li>
      </ul>
    </div>
  </div>
</template>
  
  <script>
  import { ref } from 'vue';

  
  export default {
    setup() {
  
    const searchResults = ref(null);
    const errorMessages = ref([]);

    const getRecallsByVehicle = async (modelYear, make, model) => {
      try {
       
        const recallsUrl = `https://api.nhtsa.gov/recalls/recallsByVehicle?make=${make}&model=${model}&modelYear=${modelYear}`;
        const recallsResponse = await fetch(recallsUrl);

        if (!recallsResponse.ok) {
          throw new Error(`Error fetching recalls: ${recallsResponse.statusText}`);
        }

        const recallsData = await recallsResponse.json();
        console.log('Recalls:', recallsData);
        return recallsData;
      } catch (error) {
        console.error('Error fetching recalls:', error.message);
        return [];
      }
    };

    const handleSearch = async (modelYear, make, model) => {
      try {
        errorMessages.value = []; 

        if (modelYear && make && model) {
          const recalls = await getRecallsByVehicle(modelYear, make, model);

          if (recalls && recalls.results && recalls.results.length > 0) {
            searchResults.value = recalls;
          } else {
         
            errorMessages.value.push('No recalls found for the given input.');
          }
        } else {
      
          errorMessages.value.push('Please fill in all input fields.');
        }
      } catch (error) {
        console.error('Error handling search:', error);
        errorMessages.value.push('An error occurred while processing the search.');
      }
    };

    return {
      searchResults,
      errorMessages,
      handleSearch,
    };
  },
};
</script>
  


 
  