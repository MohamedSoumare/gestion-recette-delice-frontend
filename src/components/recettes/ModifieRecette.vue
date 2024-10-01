<template>
  <div class="p-4 w-50 mx-auto">
    <div class="container">
      <h2>{{ $t("editRecipe") }}</h2>
      <form @submit.prevent="updateRecette">
       
        <div class="mb-3">
          <label for="titre" class="form-label">{{ $t("title") }}</label>
          <input type="text" v-model="titre" id="titre" class="form-control" required />
        </div>
        <div class="mb-3">
          <label for="ingredients" class="form-label">{{ $t("ingredients") }}</label>
          <input type="text" v-model="ingredients" id="ingredients" class="form-control" required />
        </div>
        <div class="mb-3">
          <label for="type" class="form-label">{{ $t("type") }}</label>
          <select v-model="type" class="form-select">
            <option value="dessert">{{ $t("dessert") }}</option>
            <option value="entree">{{ $t("starter") }}</option>
            <option value="plat">{{ $t("main") }}</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="categorie" class="form-label">{{ $t("category") }}</label>
          <select v-model="categorie" class="form-select">
            <option v-for="cat in store.categories" :key="cat.id" :value="cat.name">{{ cat.name }}</option>
          </select>
        </div>

        <button type="submit" class="btn btn-success">{{ $t("save_recipe") }}</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useRecetteStore } from '../../store/recetteStore';

const store = useRecetteStore();
const router = useRouter();
const route = useRoute();

const titre = ref('');
const ingredients = ref('');
const type = ref('');
const categorie = ref('');

onMounted(async () => {
  await store.fetchCategories();
  const recetteExistante = store.getById(Number(route.params.id));
  if (recetteExistante) {
    titre.value = recetteExistante.titre;
    ingredients.value = recetteExistante.ingredients;
    type.value = recetteExistante.type;
    categorie.value = recetteExistante.categorie;
  }
});
const updateRecette = () => {
  store.edit(Number(route.params.id), {
    titre: titre.value,
    ingredients: ingredients.value,
    type: type.value,
    categorie: categorie.value,
  });
  router.push('/recette-list');
};

</script>
