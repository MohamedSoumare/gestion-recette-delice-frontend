<template>
  <div class="container">
    <h2>Liste des Catégories</h2>
    
    <div class="text-end mb-3">
      <button class="btn btn-primary" @click="showForm = !showForm">
        <i class="fas fa-plus"></i> Ajouter une catégorie
      </button>
    </div>

    <div v-if="showForm">
      <h2>{{ $t("addCategories") }}</h2>
      <form @submit.prevent="onSubmit">
        <div class="mb-3">
          <label for="nomCategorie" class="form-label">{{ $t("category name") }}</label>
          <input
            type="text"
            id="nomCategorie"
            v-model="nomCategorie"
            class="form-control custom-input" 
          />
        </div>
        <button class="btn btn-primary me-2" type="submit"> 
          <i class="fas fa-plus"></i> {{ $t("submit") }}
        </button>
        <button class="btn btn-secondary" type="button" @click="onAnotherAction">
          <i class="fas fa-undo"></i> {{ $t("cancel") }}
        </button>
      </form>
    </div>

    <table class="table" v-if="!showForm">
      <thead>
        <tr>
          <th scope="col">Nom de la catégorie</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="categorie in store.categories" :key="categorie">
          <td>{{ categorie }}</td>
          <td>
            <button class="btn btn-warning btn-sm" @click="openEditModal(categorie)">
              <i class="fas fa-edit"></i> Modifier
            </button>
            <button class="btn btn-danger btn-sm" @click="openDeleteModal(categorie)">
              <i class="fas fa-trash"></i> Supprimer
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Edit Modal -->
    <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editModalLabel">Modifier la catégorie</h5>
            <button type="button" class="btn-close" @click="closeEditModal"></button>
          </div>
          <div class="modal-body">
            <input
              type="text"
              v-model="nomCategorie"
              class="form-control"
            />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeEditModal">Annuler</button>
            <button type="button" class="btn btn-primary" @click="updateCategorie">Sauvegarder les modifications</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Modal -->
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteModalLabel">Confirmation de la suppression</h5>
            <button type="button" class="btn-close" @click="closeDeleteModal"></button>
          </div>
          <div class="modal-body">
            Êtes-vous sûr de vouloir supprimer la catégorie "{{ oldCategorie }}" ?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeDeleteModal">Annuler</button>
            <button type="button" class="btn btn-danger" @click="deleteCategorieConfirmed">Supprimer</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRecetteStore } from "../../store/recetteStore";

const store = useRecetteStore();
const nomCategorie = ref("");
const showForm = ref(false);
const oldCategorie = ref("");

const openEditModal = (categorie) => {
  oldCategorie.value = categorie;
  nomCategorie.value = categorie; // Set the category to edit
  const editModal = new bootstrap.Modal(document.getElementById('editModal'));
  editModal.show();
};

const closeEditModal = () => {
  nomCategorie.value = ""; // Clear input field
  const editModal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
  editModal.hide();
};

const openDeleteModal = (categorie) => {
  oldCategorie.value = categorie; // Set the category to delete
  const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
  deleteModal.show();
};

const closeDeleteModal = () => {
  const deleteModal = bootstrap.Modal.getInstance(document.getElementById('deleteModal'));
  deleteModal.hide();
};

const updateCategorie = () => {
  store.updateCategorie(oldCategorie.value, nomCategorie.value); // Update the category
  closeEditModal();
};

const deleteCategorieConfirmed = () => {
  store.deleteCategorie(oldCategorie.value); // Delete the category
  closeDeleteModal();
};

const onSubmit = () => {
  store.addCategorie(nomCategorie.value); // Add category to store
  nomCategorie.value = ''; // Reset input field
  showForm.value = false; // Hide the form after submission
};

const onAnotherAction = () => {
  showForm.value = false; // Hide the form when canceling
};
</script>

<style scoped>
.custom-input {
  width: 80%; /* Adjust the width as needed */
}

.me-2 {
  margin-right: 0.5rem; /* Space between buttons */
}
</style>
