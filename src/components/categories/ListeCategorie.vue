<template>
  <div class="recipe-list-background p-5">
    <h2 class="text-center">{{ $t("category list") }}</h2>

    <!-- Bouton pour ajouter une nouvelle catégorie -->
    <div class="text-end mb-4">
      <router-link to="/categorie/new" class="btn btn-primary">
        <i class="fa-solid fa-plus"></i> {{ $t("new_category") }}
      </router-link>
    </div>

    <!-- Formulaire pour ajouter ou éditer une catégorie -->
    <div class="p-4 w-50 mx-auto" v-if="showForm">
      <h3>{{ editingCategory ? $t("edit_category") : $t("add_a_category") }}</h3>
      <form @submit.prevent="onSubmit">
        <div class="mb-3">
          <label for="nomCategorie" class="form-label">{{ $t("category_name") }}</label>
          <input
            type="text"
            id="nomCategorie"
            v-model="nomCategorie"
            class="form-control custom-input"
          />
        </div>
        <button class="btn btn-primary me-2" type="submit">
          <i class="fas fa-save"></i> {{ editingCategory ? $t("save_changes") : $t("submit") }}
        </button>
        <button class="btn btn-secondary" type="button" @click="resetForm">
          <i class="fas fa-undo"></i> {{ $t("cancel") }}
        </button>
      </form>
    </div>

    <!-- Liste des catégories -->
    <div class="row" v-if="!showForm">
      <div class="col-md-4 mb-4" v-for="categorie in categories" :key="categorie.id">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">{{ categorie.name }}</h5>
          </div>
          <div class="card-footer d-flex justify-content-between">
            <button class="btn btn-xs btn-secondary" @click="editCategory(categorie)">
              <i class="fas fa-edit me-1"></i>{{ $t("edit") }}
            </button>
            <button class="btn btn-danger btn-sm" @click="deleteCategory(categorie.id)">
              <i class="fas fa-trash me-1"></i>{{ $t("delete") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRecetteStore } from "../../store/recetteStore";

// Variables réactives
const store = useRecetteStore();
const categories = ref([]);
const nomCategorie = ref("");
const showForm = ref(false);
const editingCategory = ref(false);
const currentCategoryId = ref(null);

// Charger les catégories au montage du composant
onMounted(async () => {
  await store.fetchCategories();
  categories.value = store.categories;
});

// Gérer la soumission du formulaire pour ajouter/éditer une catégorie
const onSubmit = async () => {
  if (editingCategory.value) {
    await store.updateCategorie(currentCategoryId.value, nomCategorie.value);
  } else {
    await store.addCategorie({ name: nomCategorie.value });
  }
  resetForm();
  await refreshCategories();
};

// Modifier une catégorie
const editCategory = (categorie) => {
  nomCategorie.value = categorie.name;
  currentCategoryId.value = categorie.id;
  showForm.value = true;
  editingCategory.value = true;
};

// Supprimer une catégorie
const deleteCategory = async (id) => {
  await store.deleteCategorie(id);
  await refreshCategories();
};

// Rafraîchir la liste des catégories
const refreshCategories = async () => {
  await store.fetchCategories();
  categories.value = store.categories;
};

// Réinitialiser le formulaire
const resetForm = () => {
  nomCategorie.value = "";
  showForm.value = false;
  editingCategory.value = false;
  currentCategoryId.value = null;
};
</script>

<style scoped>
.custom-input {
  width: 80%;
}

.me-2 {
  margin-right: 0.5rem;
}
</style>
