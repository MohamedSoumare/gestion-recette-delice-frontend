<template>
  <div class="container">
    <h2>{{ $t("editRecipe") }}</h2>
    <form @submit.prevent="updateRecette">
      <div class="mb-3">
        <label for="titre" class="form-label">{{ $t("title") }}</label>
        <input v-model="recette.titre" type="text" id="titre" class="form-control" />
      </div>
      <div class="mb-3">
        <label for="ingredients" class="form-label">{{ $t("ingredients") }}</label>
        <input v-model="recette.ingredients" type="text" id="ingredients" class="form-control" />
      </div>
      <div class="mb-3">
        <label for="type" class="form-label">{{ $t("type") }}</label>
        <input v-model="recette.type" type="text" id="type" class="form-control" />
      </div>
      <button type="submit" class="btn btn-primary">{{ $t("save_recipe") }}</button>
    </form>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import { useRecetteStore } from '../../store/recetteStore';

const store = useRecetteStore();
const route = useRoute();
const router = useRouter();
const recette = ref({ titre: '', ingredients: '', type: '' });

onMounted(() => {
  const recetteExistante = store.getById(Number(route.params.id));
  if (recetteExistante) {
    recette.value = { ...recetteExistante };
  }
});

const updateRecette = () => {
  store.edit(Number(route.params.id), recette.value);
  router.push('/recette-list'); 
};
</script>

<style scoped></style>
