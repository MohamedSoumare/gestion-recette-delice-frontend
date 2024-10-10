<template>
  <div class="p-4 w-50 mx-auto">
    <div class="container mt-5">
      <h3><i class="fas fa-edit me-3"></i>{{ $t("editRecipe") }}</h3>
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

        <!-- Boutons avec espace entre eux -->
        <button type="submit" class="btn btn-success me-2">
          {{ $t("update") }}
        </button>
        <button class="btn btn-secondary" type="button" @click="onCancel">
          <i class="fas fa-undo"></i> {{ $t("cancel") }}
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
  }
};

onMounted(async () => {
  await store.fetchCategories();
  await loadRecipe();
});

const onCancel = () => {
  router.push("/recette-list");
};
</script>

<style scoped>
/* Styles spécifiques si nécessaire */
</style>
