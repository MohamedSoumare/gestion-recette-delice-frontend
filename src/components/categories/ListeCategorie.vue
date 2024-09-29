<template>
  <div class="recipe-list-background p-5">
    <h2 class="text-center">{{ $t("category list") }}</h2>

    <div class="text-end mb-4">
      <button class="btn btn-primary" @click="showForm = !showForm">
        <i class="fas fa-plus"></i> {{ $t("new_category") }}
      </button>
    </div>

    <div class=" p-4 w-50 mx-auto ">
      <div v-if="showForm">
        <h3>{{ $t("add a category") }}</h3>
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
            <i class="fas fa-plus"></i> {{ $t("submit") }}
          </button>
          <button class="btn btn-secondary" type="button" @click="onAnotherAction">
            <i class="fas fa-undo"></i> {{ $t("cancel") }}
          </button>
        </form>
      </div>
    </div>

    <div class="row" v-if="!showForm">
      <div class="col-md-4 mb-4" v-for="categorie in store.categories" :key="categorie">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">{{ categorie }}</h5>
          </div>
          <div class="card-footer d-flex justify-content-between">
            <button class="btn btn-warning btn-sm" @click="openEditModal(categorie)">
              <i class="fas fa-edit me-1"></i>{{ $t("edit") }}
            </button>
            <button class="btn btn-danger btn-sm" @click="openDeleteModal(categorie)">
              <i class="fas fa-trash me-1"></i>{{ $t("delete") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Edit Modal -->
<div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="editModalLabel">{{ $t("edit_category") }}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3">
          <label for="editCategorie" class="form-label">{{ $t("category_name") }}</label>
          <input
            type="text"
            id="editCategorie"
            v-model="nomCategorie"
            class="form-control"
          />
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ $t("close") }}</button>
        <button type="button" class="btn btn-primary" @click="updateCategorie">{{ $t("save_changes") }}</button>
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
  store.updateCategorie(oldCategorie.value, nomCategorie.value); 
  closeEditModal();
};


const deleteCategorieConfirmed = () => {
  store.deleteCategorie(oldCategorie.value); 
  closeDeleteModal();
};

const onSubmit = () => {
  store.addCategorie(nomCategorie.value); 
  nomCategorie.value = ''; 
  showForm.value = false;
};
const onAnotherAction = () => {
  showForm.value = false; 
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


