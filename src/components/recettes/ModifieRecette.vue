<template>
  <div class="p-4 w-50 mx-auto">
    <div class="container">
      <h3><i class="fas fa-edit me-2"></i>{{ $t("editRecipe") }}</h3>
      <form @submit.prevent="updateRecipe">
        <div class="mb-3">
          <label for="title" class="form-label">{{ $t("title") }}</label>
          <input
            type="text"
            v-model="title"
            id="title"
            class="form-control"
            required
          />
        </div>

        <div class="mb-3">
          <label for="ingredients" class="form-label">{{ $t("ingredients") }}</label>
          <input
            type="text"
            v-model="ingredients"
            id="ingredients"
            class="form-control"
            required
          />
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
            <option
              v-for="cat in store.categories"
              :key="cat.id"
              :value="cat.id"
            >
              {{ cat.name }}
            </option>
          </select>
        </div>

        <button type="submit" class="btn btn-success">
          {{ $t("update") }}
        </button>
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

const id = route.params.id;

const loadRecipe = async () => {
  const recipe = await store.getById(id);
  if (recipe) {
    title.value = recipe.title;
    ingredients.value = recipe.ingredient;
    type.value = recipe.type;
    categorie.value = recipe.categorie_id;
  }
};

const updateRecipe = async () => {
  try {
    await store.update(id, {
      title: title.value,
      ingredient: ingredients.value,
      type: type.value,
      categorie_id: categorie.value,
    });
    router.push("/recette-list");
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la recette", error);
    // Gérer l'erreur (par exemple, afficher un message à l'utilisateur)
  }
};

onMounted(async () => {
  await store.fetchCategories();
  await loadRecipe();
});
</script>

<style scoped>
/* Styles spécifiques si nécessaire */
</style>