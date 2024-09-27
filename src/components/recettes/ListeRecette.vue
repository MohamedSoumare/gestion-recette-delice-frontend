<template>
  <div class="container">
    <h2>{{ $t("recipe_list") }}</h2>

    <!-- Barre de recherche et filtre par catégorie -->
    <div class="d-flex justify-content-between mb-4">
      <div class="d-flex">
        <input v-model="searchQuery" class="form-control me-2" :placeholder="$t('search_placeholder')" />

        <select v-model="selectedCategorie" class="form-select me-2">
          <option value="">{{ $t("all_categories") }}</option>
          <option v-for="cat in store.categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>

        <button @click="searchRecettes" class="btn btn-primary">
          <i class="fas fa-search me-1"></i>{{ $t("search") }}
        </button>
      </div>

      <!-- Lien pour ajouter une nouvelle recette -->
      <router-link to="/recette/new" class="btn btn-danger">
        <i class="fas fa-plus me-1"></i>{{ $t("new_recipe") }}
      </router-link>
    </div>

    <!-- Tableau d'affichage des recettes -->
    <table class="table table-hover table-bordered">
      <thead>
        <tr>
      
          <th scope="col">{{ $t("title") }}</th>
          <th scope="col">{{ $t("ingredients") }}</th>
          <th scope="col">{{ $t("type") }}</th>
          <th scope="col">{{ $t("category") }}</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredRecettes" :key="item.id">
          
          <td>{{ item.titre }}</td>
          <td>{{ item.ingredients }}</td>
          <td>{{ item.type }}</td>
          <td>{{ item.categorie }}</td>
          <td>
            <!-- Boutons pour voir, éditer et supprimer une recette -->
            <router-link :to="`/recette/show/${item.id}`" class="btn btn-info btn-sm me-2">
              <i class="fas fa-eye me-1"></i>{{ $t("details") }}
            </router-link>
            <router-link :to="`/recette/edit/${item.id}`" class="btn btn-warning btn-sm me-2">
              <i class="fas fa-edit me-1"></i>{{ $t("edit") }}
            </router-link>
            <button @click="deleteRecette(item.id)" class="btn btn-danger btn-sm">
              <i class="fas fa-trash me-1"></i>{{ $t("delete") }}
            </button>
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