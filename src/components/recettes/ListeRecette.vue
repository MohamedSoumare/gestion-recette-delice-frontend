<template>
  <div class="container">
    <h2>{{ $t("recipe_list") }}</h2>
    <div class="d-flex justify-content-end mb-4">
      <router-link to="/recette/new" class="btn btn-danger">
        <i class="fas fa-plus-circle"></i> {{ $t("new_recipe") }}
      </router-link>
    </div>

    
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">{{ $t("title") }}</th>
            <th scope="col">{{ $t("ingredients") }}</th>
            <th scope="col">{{ $t("type") }}</th>
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
              <router-link :to="`/recette/show/${item.id}`" class="btn btn-info btn-sm me-2">
                <i class="fas fa-info-circle"></i> {{ $t("details") }}
              </router-link>
              <router-link :to="`/recette/edit/${item.id}`" class="btn btn-warning btn-sm me-2">
                <i class="fas fa-edit"></i> {{ $t("edit") }}
              </router-link>
              <button @click="deleteRecette(item.id)" class="btn btn-danger btn-sm">
                <i class="fas fa-trash-alt"></i> {{ $t("delete") }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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
