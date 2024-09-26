<template>
  <div class="container">
    <h2>Liste des recettes</h2>
    <div class="d-flex justify-content-between mb-4">
      <div class="d-flex">
        <input v-model="searchQuery" class="form-control me-2" placeholder="Rechercher une recette...">
        <select v-model="selectedCategorie" class="form-select me-2">
          <option value="">Toutes les catégories</option>
          <option v-for="cat in store.categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
        <button @click="searchRecettes" class="btn btn-primary">Rechercher</button>
      </div>
      <router-link to="/recette/new" class="btn btn-danger">Nouvelle Recette</router-link>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Titre</th>
          <th scope="col">Ingrédients</th>
          <th scope="col">Type</th>
          <th scope="col">Catégorie</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredRecettes" :key="item.id">
          <td scope="row">{{ `# ${item.id} ` }}</td>
          <td>{{ item.titre }}</td>
          <td>{{ item.ingredients }}</td>
          <td>{{ item.type }}</td>
          <td>{{ item.categorie }}</td>
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
import { ref, computed } from 'vue';
import { useRecetteStore } from '../../store/recetteStore';

const store = useRecetteStore();
const searchQuery = ref('');
const selectedCategorie = ref('');
const filteredRecettes = ref([]);

const searchRecettes = () => {
  filteredRecettes.value = store.searchRecettes(searchQuery.value, selectedCategorie.value);
};

const deleteRecette = (id) => {
  if (confirm("Voulez-vous vraiment supprimer cette recette ?")) {
    store.destroy(id);
    searchRecettes(); // Rafraîchir la liste après suppression
  }
};

// Initialiser la liste filtrée avec toutes les recettes
filteredRecettes.value = store.recettes;
</script>