<template>
  <div class="container mt-5">
    
    <div class="card">
      <div class="card-header">
        <h2>Détails de la recette</h2>
      </div>
      <div class="card-body">
          <div v-if="recette">
            <p><strong>Titre:</strong> {{ recette.titre }}</p>
            <p><strong>Ingrédients:</strong> {{ recette.ingredients }}</p>
            <p><strong>Type:</strong> {{ recette.type }}</p>
            <p><strong>Catégorie:</strong> {{ recette.categorie }}</p>
          </div>
      </div>
      <div class="card-footer text-end">
        <router-link to="/recette-list" class="btn btn-primary">Retour à la liste</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRecetteStore } from '../../store/recetteStore';
import { useRoute } from 'vue-router';

const store = useRecetteStore(); 
const route = useRoute(); 
const recette = ref(null); 

onMounted(() => {
  const recetteExistante = store.getById(Number(route.params.id)); 
  if (recetteExistante) {
    recette.value = recetteExistante; 
  }
});
</script>

<style scoped>
.container {
  max-width: 800px;
}

.card {
  margin-top: 20px;
}
</style>
