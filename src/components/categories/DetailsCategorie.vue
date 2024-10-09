<template>
  <div class="category-details-container p-5 mt-5 w-50 mx-auto">
    <h2>{{ $t("category_details") }}</h2>
    <div v-if="categorie">
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">
            <strong><i class="fas fa-book me-1"></i>  {{ $t("category") }} : </strong>  {{ categorie.name }}
          </h5>
        </div>
      </div>
      <router-link to="/category-list" class="btn btn-primary mt-4">
        <i class="fas fa-arrow-left me-1"></i>{{ $t("back to the list") }}
      </router-link>
    </div>
    <div v-else>
      <p>{{ $t("category_not_found") }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useCategorieStore, useRecetteStore } from "../../store";

// Variables nécessaires
const route = useRoute();
const categorieStore = useCategorieStore();
const recetteStore = useRecetteStore();
const categorie = ref(null);
const recettes = ref([]);

// Lorsque le composant est monté, on récupère les détails de la catégorie
onMounted(async () => {
  const categoryId = route.params.id;
  await categorieStore.fetchCategorieById(categoryId);
  recettes.value = recetteStore.recettesByCategory(categoryId);
});

// Utilisation de watchEffect pour mettre à jour la catégorie lorsque les données du store changent
watchEffect(() => {
  categorie.value = categorieStore.selectedCategorie;
});
</script>

<style scoped>
.category-details-container {
  max-width: 800px;
}

.card {
  margin-top: 20px;
}
</style>
