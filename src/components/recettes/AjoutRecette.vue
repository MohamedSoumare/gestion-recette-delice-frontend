<template>
  <div class="p-4 w-50 mx-auto">
    <div class="container">
      <h3><i class="fas fa-plus me-2"></i>{{ $t("addRecipe") }}</h3>
      <form @submit.prevent="onSubmit">
        <!-- Champ titre -->
        <div class="mb-3">
          <label for="title" class="form-label">{{ $t("title") }}</label>
          <input
            type="text"
            v-model="title"
            id="title"
            class="form-control"
            required
          />
          <div v-if="errors.title" class="text-danger">{{ errors.title }}</div>
        </div>

        <!-- Champ ingrédients -->
        <div class="mb-3">
          <label for="ingredients" class="form-label">{{ $t("ingredients") }}</label>
          <input
            type="text"
            v-model="ingredients"
            id="ingredients"
            class="form-control"
            required
          />
          <div v-if="errors.ingredients" class="text-danger">{{ errors.ingredients }}</div>
        </div>

        <!-- Sélection du type -->
        <div class="mb-3">
          <label for="type" class="form-label">{{ $t("type") }}</label>
          <select v-model="type" id="type" class="form-select" required>
            <option value="dessert">{{ $t("dessert") }}</option>
            <option value="entree">{{ $t("starter") }}</option>
            <option value="plat">{{ $t("main") }}</option>
          </select>
          <div v-if="errors.type" class="text-danger">{{ errors.type }}</div>
        </div>

        <!-- Sélection de la catégorie -->
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
          <div v-if="errors.categorie" class="text-danger">{{ errors.categorie }}</div>
        </div>

        <button type="submit" class="btn btn-success me-2">
          <i class="fas fa-plus"></i>
          {{ $t("submit") }}
        </button>
        <button class="btn btn-secondary" type="button" @click="onCancel">
          <i class="fas fa-undo"></i> {{ $t("cancel") }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useRecetteStore } from "../../store/recetteStore";

const store = useRecetteStore();
const router = useRouter();

const title = ref("");
const ingredients = ref("");
const type = ref("");
const categorie = ref("");

const errors = ref({
  title: "",
  ingredients: "",
  type: "",
  categorie: "",
});

const validateForm = () => {
  let isValid = true;

  if (!title.value || title.value.length < 5 || title.value.length > 100) {
    errors.value.title = 'Le titre doit comporter entre 5 et 100 caractères.';
    isValid = false;
  } else {
    errors.value.title = "";
  }

  if (!ingredients.value || ingredients.value.length < 10 || ingredients.value.length > 500) {
    errors.value.ingredients = 'Les ingrédients doivent comporter entre 10 et 500 caractères.';
    isValid = false;
  } else {
    errors.value.ingredients = "";
  }

  if (!type.value) {
    errors.value.type = 'Le type de recette est obligatoire.';
    isValid = false;
  } else {
    errors.value.type = "";
  }

  if (!categorie.value || isNaN(categorie.value)) {
    errors.value.categorie = 'La catégorie doit être un ID numérique valide.';
    isValid = false;
  } else {
    errors.value.categorie = "";
  }

  return isValid;
};

const onSubmit = async () => {
  if (!validateForm()) return;

  await store.add({
    title: title.value,
    ingredient: ingredients.value,
    type: type.value,
    categorie_id: categorie.value,
  });
  router.push("/recette-list");
};

const onCancel = () => {
  router.push("/recette-list"); // Redirection vers la liste des recettes
};
</script>