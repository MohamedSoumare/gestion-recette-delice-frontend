<template>
  <div class="container">
    <h3><i class="fas fa-plus me-2"></i>{{ $t("addRecipe") }}:</h3>

    <form @submit.prevent="onSubmit">
      <!-- Formulaire pour le titre -->
      <div class="mb-3">
        <label for="titre" class="form-label">{{ $t("title") }}</label>
        <div class="input-group">
          <span class="input-group-text"><i class="fas fa-book"></i></span>
          <input type="text" class="form-control" id="titre" v-model="titre" />
        </div>
      </div>

      <!-- Formulaire pour les ingrédients -->
      <div class="mb-3">
        <label for="ingredients" class="form-label">{{ $t("ingredients") }}</label>
        <div class="input-group">
          <span class="input-group-text"><i class="fas fa-utensils"></i></span>
          <input type="text" class="form-control" id="ingredients" v-model="ingredients" />
        </div>
      </div>

      <!-- Sélection du type de recette -->
      <div class="mb-3">
        <label for="type" class="form-label">{{ $t("type") }}</label>
        <select class="form-control" id="type" v-model="type">
          <option value="dessert">{{ $t("dessert") }}</option>
          <option value="entree">{{ $t("starter") }}</option>
          <option value="plat">{{ $t("main") }}</option>
        </select>
      </div>

      <!-- Sélection de la catégorie -->
      <div class="mb-3">
        <label for="categorie" class="form-label">{{ $t("category") }}</label>
        <select class="form-control" id="categorie" v-model="categorie">
          <option v-for="cat in store.categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>

      <button class="btn btn-success">
        <i class="fas fa-check me-1"></i>{{ $t("submit") }}
      </button>
    </form>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import { useRecetteStore } from '../../store/recetteStore';
import { useRouter } from 'vue-router';

const store = useRecetteStore();
const router = useRouter();
const titre = ref('');
const ingredients = ref('');
const type = ref('');
const categorie = ref('');

const onSubmit = () => {
  store.add({
    titre: titre.value,
    ingredients: ingredients.value,
    type: type.value,
    categorie: categorie.value
  });
  router.push('/recette-list');
};
</script>
