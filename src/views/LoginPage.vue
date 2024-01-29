<template>
  <div class="container justify-center bg-sky-100 dark:bg-slate-950 rounded-lg p-8 ring-sky-600/5 shadow w-full transition-all duration-500" :class="{ 'dark': isDarkMode }">
    <!-- Dark Mode Toggle Button -->
    <button 
    @click="toggleDarkMode" 
    
    class="py-2 px-2 bg-black text-white  dark:bg-white dark:text-black transition-all duration-300">
       <i id="modeButtonIcon" :class="isDarkMode ? 'fas fa-regular fa-moon' : 'fas fa-regular fa-sun'"></i>
    </button>
    
      <!-- Login Form -->
 <div>
      <form class="form-style" 
      @submit.prevent="login">
        <h2 
        
        class="form-title mb-4 py-6 flex justify-center items-center font-bold text-black dark:text-white">
        
        Login</h2>
        <input 
        
        type="email" 
        
        placeholder="Email" 
        
        v-model="login_form.email" 
        
        class="form-title w-96 p-2 border border-gray-300 rounded transition-all duration-300" />
        <input 
        
        type="password" 
        
        placeholder="Password" 
        
        v-model="login_form.password" 
        
        class="input-style w-96 p-2 border border-gray-300 rounded transition-all duration-300" />
        <input 
        
        type="submit" 
        
        value="Login" 
        
        class="button-style w-96 dark:bg-slate-900 dark:text-white bg-sky-200 text-black rounded cursor-pointer transition-all duration-300 text-md p-2 hover:bg-sky-300 dark:hover:bg-blue-600" />
      </form>
    </div>

    <div class="auth-forms ">
      
      <form class="form-style" 

      @submit.prevent="register">

        <h2 
        class="form-title mb-4 flex justify-center items-center font-bold text-black dark:text-white">
          Register</h2>

        <input type="email"

         placeholder="Email" 

        v-model="register_form.email" 

        class="w-96 p-2 mb-2 border border-gray-300 rounded transition-all duration-300" />

        <input type="password" 

        placeholder="Password" 

        v-model="register_form.password" 

        class="w-96 p-2 mb-2border border-gray-300 rounded transition-all duration-300" />
        <input type="submit" 

        value="Register" 
        
        class="button-style w-96 dark:bg-slate-900 dark:text-white bg-sky-200 text-black rounded cursor-pointer transition-all duration-300 text-md p-2 hover:bg-sky-300 dark:hover:bg-blue-600" />
      </form>
    </div>
  </div>
</template>



<script>
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const login_form = ref({});
    const register_form = ref({});
    const store = useStore();
    const isDarkMode = ref(false);

    const login = () => store.dispatch('login', login_form.value);
    const register = () => store.dispatch('register', register_form.value);

    const toggleDarkMode = () => {
      const htmlElement = document.documentElement;
      isDarkMode.value = htmlElement.classList.toggle('dark');
      localStorage.setItem('darkMode', isDarkMode.value);
    };

    return {
      login_form,
      register_form,
      login,
      register,
      toggleDarkMode,
      isDarkMode,
    };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  transition: all 0.5s;
}

.form-style {
  display: flex;
  flex-direction: column;
}

.form-title {
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--text-color);
}

.input-style {
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
}

.button-style {
  padding: .5rem;
  margin-bottom: 1rem;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

</style>
