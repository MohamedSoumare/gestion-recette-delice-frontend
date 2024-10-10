<template>
  <div class="add-category-container p-4 w-50 mx-auto">
    <h2>{{ $t("add a category") }}</h2>
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
      <!-- Bouton de soumission stylisé -->
      <button class="btn btn-submit me-2" type="submit">
        <i class="fas fa-plus"></i> {{ $t("submit") }}
      </button>

      <!-- Bouton d'annulation stylisé -->
      <button class="btn btn-cancel" type="button" @click="onCancel">
        <i class="fas fa-undo"></i> {{ $t("cancel") }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCategorieStore } from "../../store/categorieStore";

const nomCategorie = ref("");
const store = useCategorieStore();
const router = useRouter();
const onSubmit = async () => {
  if (nomCategorie.value.trim()) {
    try {
      await store.addCategorie({ nom: nomCategorie.value });
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
.add-category-container {
  max-width: 600px;
  margin: auto;
}

/* Style du bouton de soumission (vert) */
.btn-submit {
  background-color: #28a745; /* Vert */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
}

.btn-submit:hover {
  background-color: #218838; /* Vert foncé au survol */
}

/* Style du bouton d'annulation (gris) */
.btn-cancel {
  background-color: #6c757d; /* Gris */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
}

.btn-cancel:hover {
  background-color: #5a6268; /* Gris foncé au survol */
}
</style>
