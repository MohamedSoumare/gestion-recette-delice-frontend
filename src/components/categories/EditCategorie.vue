<template>
  <div class="edit-category-container p-4 w-50 mx-auto">
    <h2>{{ $t("category_edit") }}</h2>
    <form @submit.prevent="onSubmit">
      <div class="mb-3">
        <label for="nomCategorie" class="form-label">{{ $t("category_name") }}</label>
        <input type="text" id="nomCategorie" v-model="nomCategorie" placeholder="Modifier le nom de la catégorie"
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
import { useCategorieStore } from "../../store/categorieStore";

const nomCategorie = ref("");
const categoryId = ref(null);
const store = useCategorieStore();
const router = useRouter();
const route = useRoute();

onMounted(async () => {
  categoryId.value = route.params.id;
  await store.fetchCategorieById(categoryId.value);
  const categorie = store.selectedCategorie;
  
  if (categorie) {
    nomCategorie.value = categorie.name;
  } else {
    console.error("Catégorie non trouvée");
  }
});

const onSubmit = async () => {
  if (nomCategorie.value.trim()) {
    try {
      await store.updateCategorie(categoryId.value, { nom: nomCategorie.value });
      alert("Catégorie ajoutée avec succès.");
      router.push("/category-list");
    } catch (error) {
      console.error("Erreur lors de l'ajout de la catégorie", error);
      alert("Erreur lors de l'ajout de la catégorie.");
    }
  } else {
    alert("Le nom de la catégorie ne peut pas être vide.");
  }
};

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
