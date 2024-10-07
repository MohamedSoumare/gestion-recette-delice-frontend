<template>
    <div class="category-details-container p-4 w-50 mx-auto">
      <h2>{{ $t("show details") }}</h2>
      <div v-if="categorie">
        <h3>{{ categorie.name }}</h3>
        <p>{{ $t("category_id") }}: {{ categorie.id }}</p>
        <div class="actions mt-4">
          <button class="btn btn-primary me-2" @click="editCategory">
            <i class="fas fa-edit"></i> {{ $t("edit") }}
          </button>
          <button class="btn btn-danger" @click="deleteCategory">
            <i class="fas fa-trash"></i> {{ $t("delete") }}
          </button>
        </div>
      </div>
      <div v-else>
        <p>{{ $t("category_not_found") }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRouter, useRoute } from "vue-router";
  import { useRecetteStore } from "../../store/recetteStore";
  
  const router = useRouter();
  const route = useRoute();
  const store = useRecetteStore();
  const categorie = ref(null);
  
  onMounted(async () => {
    const categoryId = route.params.id;
    // Ensure categories are loaded before fetching specific category
    if (!store.categories.length) {
      await store.fetchCategories();
    }
    categorie.value = store.getCategorieById(categoryId);
  });
  
  const editCategory = () => {
    router.push(`/edit-category/${categorie.value.id}`);
  };
  
  const deleteCategory = async () => {
    const confirmation = confirm("Voulez-vous vraiment supprimer cette catégorie ?");
    if (confirmation) {
      try {
        await store.deleteCategorie(categorie.value.id);
        router.push("/category-list"); // Redirect after deletion
      } catch (error) {
        console.error("Erreur lors de la suppression de la catégorie", error);
      }
    }
  };
  </script>
  
  <style scoped>
  .category-details-container {
    max-width: 600px;
    margin: auto;
  }
  
  .actions button {
    margin-right: 10px;
  }
  </style>
  