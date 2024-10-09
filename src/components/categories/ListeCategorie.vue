<template>
  <div class="recipe-list-background p-5">
    <h2 class="text-center">{{ $t("category list") }}</h2>
    <div class="text-end mb-4">
      <router-link to="/categorie/new" class="btn btn-primary">
        <i class="fa-solid fa-plus"></i> {{ $t("new_category") }}
      </router-link>
    </div>
    <div class="row">
      <div class="col-md-4 mb-4" v-for="categorie in categories" :key="categorie.id">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">{{ $t("title") }} : {{ categorie.name }}</h5>
          </div>
          <div class="card-footer d-flex justify-content-between">
          <router-link :to="`/categorie/edit/${categorie.id}`" class="btn btn-warning btn-sm">
            <i class="fas fa-edit"></i> {{ $t("edit") }}
          </router-link>

            <router-link :to="`/categorie/details/${categorie.id}`" class="btn btn-info btn-sm">
              <i class="fas fa-eye"></i> {{ $t("view_details") }}
            </router-link>
            <button class="btn btn-danger btn-sm" @click="deleteCategory(categorie.id)">
              <i class="fas fa-trash"></i> {{ $t("delete") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useCategorieStore } from "../../store/categorieStore";

const store = useCategorieStore();
const categories = ref([]);

onMounted(async () => {
  await store.fetchCategories();
  categories.value = store.categories;
});

const deleteCategory = async (id) => {
  const confirmation = confirm("Êtes-vous sûr de vouloir supprimer cette catégorie?");
  if (confirmation) {
    try {
      await store.deleteCategorie(id);
      alert("Catégorie supprimée avec succès.");
    } catch (error) {
      alert(error.message || "Erreur: Impossible de supprimer cette catégorie.");
      console.error("Erreur lors de la suppression de la catégorie", error);
    }
  }
};
</script>
