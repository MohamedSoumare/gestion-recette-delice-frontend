<template>
  <div class="p-4 w-50 mx-auto">
    <div class="container">
      <h3><i class="fas fa-edit me-2"></i>{{ $t("editRecipe") }}</h3>
      <form @submit.prevent="onSubmit">
        <div class="mb-3">
          <label for="title" class="form-label">{{ $t("title") }}</label>
          <input type="text" v-model="title" id="title" class="form-control" required />
        </div>

        <div class="mb-3">
          <label for="ingredients" class="form-label">{{ $t("ingredients") }}</label>
          <input type="text" v-model="ingredients" id="ingredients" class="form-control" required />
        </div>

        <div class="mb-3">
          <label for="type" class="form-label">{{ $t("type") }}</label>
          <select v-model="type" id="type" class="form-select" required>
            <option value="dessert">{{ $t("dessert") }}</option>
            <option value="entree">{{ $t("starter") }}</option>
            <option value="plat">{{ $t("main") }}</option>
          </select>
        </div>

        <div class="mb-3">
          <label for="categorie" class="form-label">{{ $t("category") }}</label>
          <select v-model="categorie" id="categorie" class="form-select" required>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
              {{ cat.name }}
            </option>
          </select>
        </div>

        <button type="submit" class="btn btn-success">{{ $t("update") }}</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRecetteStore } from "../../store/recetteStore";
import { useRoute, useRouter } from "vue-router";

const store = useRecetteStore();
const route = useRoute();
const router = useRouter();

const title = ref("");
const ingredients = ref(""); 
const type = ref("");
const categorie = ref("");
const recipeId = route.params.id; 
const categories = store.categories;

const onSubmit = async () => {
  try {
    // Modification d'une recette existante
    await store.edit(recipeId, {
      title: title.value,
      ingredient: ingredients.value,
      type: type.value,
      categorie_id: categorie.value,
    });
    router.push("/recette-list");
  } catch (error) {
    console.error("Erreur lors de la modification de la recette:", error);
  }
};

// Charger les détails de la recette et les catégories
onMounted(async () => {
  await store.fetchCategories();
  if (recipeId) {
    const recette = await store.getById(recipeId);
    if (recette) {
      title.value = recette.title;
      ingredients.value = recette.ingredient;
      type.value = recette.type;
      categorie.value = recette.categorie_id;
    }
  }
});
</script>

<style scoped>
/* Styles personnalisés */
</style>
