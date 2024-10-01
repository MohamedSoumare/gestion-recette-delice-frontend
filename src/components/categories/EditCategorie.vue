<template>
    <div class="edit-category-container">
      <h2>{{ $t("edit_category") }}</h2>
      <form @submit.prevent="onSubmit">
        <div class="mb-3">
          <label for="nomCategorie" class="form-label">{{ $t("category_name") }}</label>
          <input
            type="text"
            id="nomCategorie"
            v-model="nomCategorie"
            class="form-control"
          />
        </div>
        <button class="btn btn-primary" type="submit">
          <i class="fas fa-save"></i> {{ $t("save_changes") }}
        </button>
        <button class="btn btn-secondary" type="button" @click="onCancel">
          <i class="fas fa-undo"></i> {{ $t("cancel") }}
        </button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { useRecetteStore } from '../../store/recetteStore';
  
  // Store
  const store = useRecetteStore();
  const router = useRouter();
  const route = useRoute();
  
  // Refs
  const nomCategorie = ref('');
  const categoryId = ref(null);
  
  // Fetch category data when the component is mounted
  onMounted(async () => {
    categoryId.value = route.params.id; // Get the category ID from the route
    const categorie = store.categories.find(c => c.id === categoryId.value);
    if (categorie) {
      nomCategorie.value = categorie.name; // Set the category name for editing
    } else {
      // Handle the case where the category is not found
      console.error("Category not found");
    }
  });
  
  // Function to handle form submission
  const onSubmit = async () => {
    try {
      await store.updateCategorie(categoryId.value, nomCategorie.value);
      router.push('/category-list'); // Redirect to the category list after saving
    } catch (error) {
      console.error("Error updating the category", error);
    }
  };
  
  // Function to cancel the action and return to the list
  const onCancel = () => {
    router.push('/category-list');
  };
  </script>
  
  <style scoped>
  .edit-category-container {
    max-width: 600px;
    margin: auto;
  }
  </style>
  