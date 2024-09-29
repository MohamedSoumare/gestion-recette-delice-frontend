<template>
    <div class=" p-4 w-50 mx-auto ">
        <div class="container">
        <h2>{{ $t("add a category") }}</h2>
        <form @submit.prevent="onSubmit">
            <div class="mb-3">
            <label for="nomCategorie" class="form-label">{{ $t("category_name") }}</label>
            <input
                type="text"
                id="nomCategorie"
                v-model="nomCategorie"
                placeholder=""
                class="form-control custom-input" 
            />
            </div>
            <button class="btn btn-primary me-2" type="submit"> 
            <i class="fas fa-plus"></i> {{ $t("submit") }}
            </button>
            <button class="btn btn-secondary" type="button" @click="onAnotherAction">
            <i class="fas fa-undo"></i> {{ $t("cancel") }}
            </button>
        </form>
        </div>
    </div>    
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRecetteStore } from '../../store/recetteStore';
  import { useRouter } from 'vue-router';
  
  const store = useRecetteStore();
  const router = useRouter(); // Use Vue Router for navigation
  const nomCategorie = ref(''); // State for category name
  
  const onSubmit = () => {
    store.addCategorie(nomCategorie.value); // Add category to store
    nomCategorie.value = ''; // Reset input field
    router.push('/category-list'); // Navigate to the list of categories
  };
  
  const onAnotherAction = () => {
    router.push('/category-list'); // Navigate back to the category list
  };
  </script>
  
  <style scoped>
  .custom-input {
    width: 80%; /* Adjust the width as needed */
  }
  
  .me-2 {
    margin-right: 0.5rem; /* Space between buttons */
  }
  </style>
  
  <style scoped>


.custom-input {
  width: 80%; 
}
.me-2 {
  margin-right: 0.5rem; 
}
</style>
