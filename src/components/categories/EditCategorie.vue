<template>
  <div class="edit-category-container p-4 w-50 mx-auto">
    <h2>{{ $t("edit_category") }}</h2>
    <form @submit.prevent="onSubmit">
      <div class="mb-3">
        <label for="nomCategorie" class="form-label">{{ $t("category_name") }}</label>
        <input
          type="text"
          id="nomCategorie"
          v-model="nomCategorie"
          placeholder="Modifier le nom de la catégorie"
          class="form-control"
        />
      </div>
      <button class="btn btn-primary me-2" type="submit">
        <i class="fas fa-save"></i> {{ $t("save_changes") }}
      </button>
      <button class="btn btn-secondary" type="button" @click="onCancel">
        <i class="fas fa-undo"></i> {{ $t("cancel") }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useRecetteStore } from "../../store/recetteStore";

// Refs et store
const nomCategorie = ref("");
const categoryId = ref(null);
const store = useRecetteStore();
const router = useRouter();
const route = useRoute();

// Charger les données de la catégorie lors du montage
onMounted(async () => {
  categoryId.value = route.params.id; // Obtenir l'ID de la catégorie à partir de la route
  const categorie = store.categories.find((c) => c.id === categoryId.value);
  if (categorie) {
    nomCategorie.value = categorie.name; // Remplir le champ avec le nom existant
  } else {
    console.error("Catégorie non trouvée");
  }
});

// Fonction pour gérer la soumission du formulaire
const onSubmit = async () => {
  try {
    await store.updateCategorie(categoryId.value, { name: nomCategorie.value });
    router.push("/category-list"); // Redirection vers la liste des catégories
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la catégorie", error);
  }
};

// Fonction pour annuler et revenir à la liste
const onCancel = () => {
  router.push("/category-list");
};
</script>

<style scoped>
.edit-category-container {
  max-width: 600px;
  margin: auto;
}
</style>
