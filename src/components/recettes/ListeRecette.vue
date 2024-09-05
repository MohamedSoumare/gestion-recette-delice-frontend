<template>
  <div class="container">
    <h2>Liste des recettes</h2>
    <div class="d-flex justify-content-end mb-4">
      <router-link to="/recette/new" class="btn btn-danger">Nouvelle Recette</router-link>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Titre</th>
          <th scope="col">Ingrédients</th>
          <th scope="col">Type</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in store.recettes" :key="item.id">
          <td scope="row">{{ `# ${item.id} ` }}</td>
          <td>{{ item.titre }}</td>
          <td>{{ item.ingredients }}</td>
          <td>{{ item.type }}</td>
          <td>
            <router-link :to="`/recette/show/${item.id}`" class="btn btn-info btn-sm me-2">Détails</router-link>
        
            <router-link :to="`/recette/edit/${item.id}`" class="btn btn-warning btn-sm me-2">Modifier</router-link>
            <button @click="deleteRecette(item.id)" class="btn btn-danger btn-sm">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useRecetteStore } from '../../store/recetteStore';
const store = useRecetteStore();


const deleteRecette = (id) => {
  store.destroy(id)
  if (confirm("Voulez-vous vraiment supprimer cette recette ?")) {
    
    console.log(`Suppression de la recette avec l'ID: ${id}`);
    store.destroy(id);  
  }
};
</script>

<style scoped>

.btn {
  margin-right: 5px;
}
</style>
