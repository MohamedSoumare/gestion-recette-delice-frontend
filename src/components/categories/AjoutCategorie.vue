<template>
  <div class="add-category-container p-4 w-50 mx-auto">
    <h2>{{ $t("add_category") }}</h2>
    <form @submit.prevent="onSubmit">
      <div class="mb-3">
        <label for="nomCategorie" class="form-label">{{ $t("category_name") }}</label>
        <input
          type="text"
          id="nomCategorie"
          v-model="nomCategorie"
          placeholder="Entrez le nom de la catégorie"
          class="form-control"
        />
      </div>
      <button class="btn btn-primary me-2" type="submit">
        <i class="fas fa-plus"></i> {{ $t("submit") }}
      </button>
      <button class="btn btn-secondary" type="button" @click="onCancel">
        <i class="fas fa-undo"></i> {{ $t("cancel") }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useRecetteStore } from "../../store/recetteStore";


const nomCategorie = ref("");
const store = useRecetteStore();
const router = useRouter();
const onSubmit = async () => {
  if (nomCategorie.value) {
    try {
      await store.addCategorie({ name: nomCategorie.value });
      router.push("/category-list"); // Redirection vers la liste des catégories
    } catch (error) {
      console.error("Erreur lors de l'ajout de la catégorie", error);
    }
  }
};
const onCancel = () => {
  router.push("/category-list");
};
</script>

<style scoped>
.add-category-container {
  max-width: 600px;
  margin: auto;
}
</style>
