<template>
    <main class="bg-sky-100 dark:bg-slate-950 shadow w-full">
      <div class="text-white rounded-md">
        <h1 class="flex justify-center text-2xl font-bold text-black dark:text-white">Vehicle Specifications Search</h1>
        <div class="text-white rounded-md absolute top-4 right-4">
          <button @click="toggleDarkMode" class="py-2 px-2 bg-black text-white dark:bg-white dark:text-black transition-all duration-300 mr-2">
        <i id="modeButtonIcon" class="fas fa-regular fa-sun"></i>
      </button>
        </div>
      </div>
      <div class="bg-sky-100 dark:bg-slate-950 rounded-sm p-2 dark:ring-slate-800">
        <div class="flex items-center justify-between mb-1">
          <div class="dark:bg-slate-950 rounded-lg p-4 shadow-xl w-full">
          
          </div>
        </div>
        <div class="dark:bg-slate-950 rounded-lg p-4 shadow-xl w-full">
          <h1 class="flex justify-center text-3xl font-bold text-black dark:text-white mt-4 mb-2">Please Choose Vehicle Information</h1>
          <form @submit.prevent="handleSearch" id="cq-search-form">
            <div class="flex justify-center mb-2">
              <select class="dark:ring-offset-slate-800 w-96 p-2 border border-gray-300 rounded" name="car-years" id="car-years"></select>
            </div>
            <div class="flex justify-center mb-2">
              <select class="w-96 p-2 border border-gray-300 rounded" name="car-makes" id="car-makes"></select>
            </div>
            <div class="flex justify-center mb-2">
              <select class="w-96 p-2 border border-gray-300 rounded" name="car-models" id="car-models"></select>
            </div>
            <div class="flex justify-center mb-2">
              <select class="w-96 p-2 border border-gray-300 rounded" name="car-model-trims" id="car-model-trims"></select>
            </div>
            <div class="flex justify-center">
              <button class="w-96 dark:bg-slate-900 dark:text-white bg-sky-200 text-black rounded cursor-pointer transition-all duration-300 text p-2 hover:bg-sky-300 dark:hover:bg-blue-600" type="submit">
                Show Data
              </button>
            </div>
          </form>
          <div id="car-model-data" class="text-black dark:text-white mb-2 p-2"></div>
        </div>
      </div>
      <div id="app"></div>
      <footer class="flex justify-center text-xl dark:text-white dark:bg-slate-950 rounded-sm p-4 shadow-xl w-full">
        &copy; 2024 CarQuery Integration. All rights reserved. Recalls Data provided by <span class="px-1">NHTSA API</span>.
      </footer>
    </main>
</template>

<script>
import $ from 'jquery'; 

export default {
  data() {
    return {
      selectedYear: null,
      selectedMake: null,
      selectedModel: null,
      selectedTrim: null,
    };
  },
  methods: {
    handleSearch() {

    },
    toggleDarkMode() {
      const htmlElement = document.documentElement;
      const isDarkModeEnabled = htmlElement.classList.toggle('dark');
      localStorage.setItem('darkMode', isDarkModeEnabled);

      const modeButtonIcon = document.getElementById('modeButtonIcon');
      modeButtonIcon.className = isDarkModeEnabled ? 'fas fa-solid fa-moon' : 'fas fa-regular fa-sun';
    },
    showData() {
    },
    initializeCarQuery() {
      var carquery = new CarQuery();

      carquery.init();
      carquery.setFilters({ sold_in_us: true });
      carquery.initYearMakeModelTrim('car-years', 'car-makes', 'car-models', 'car-model-trims');

      $('#cq-show-data').click(function () {
        carquery.populateCarData('car-model-data');
      });

      $('#cq-search-form').submit(function (event) {
        event.preventDefault();

        var modelYear = $('#car-years').val();
        var make = $('#car-makes').val();
        var model = $('#car-models').val();

        carquery.populateCarData('car-model-data', {
          model_year: modelYear,
          make: make,
          model: model,
        });
      });

      var searchArgs = {
        body_id: "cq-body",
        default_search_text: "Keyword Search",
      };
      carquery.initSearchInterface(searchArgs);

      $('#cq-search-btn').click(function () {
        carquery.search();
      });
    },
  },
  mounted() {
    this.initializeCarQuery();
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
      document.documentElement.classList.add('dark');
    }

    const initialModeButtonIcon = document.getElementById('modeButtonIcon');
    if (document.documentElement.classList.contains('dark')) {
      initialModeButtonIcon.className = 'fas fa-solid fa-moon';
    } else {
      initialModeButtonIcon.className = 'fas fa-regular fa-sun';
    }
  },
};
</script>
