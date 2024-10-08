<template>
  <div class="category-details-container p-4 w-50 mx-auto">
    <h2>{{ $t("show_details") }}</h2>  
    <div v-if="categorie">
      <div class="card h-100">
        <div class="card-body">
          <!-- Affichage du nom de la catégorie -->
          <h5 class="card-title">
            <strong>{{ $t("title") }} :</strong> {{ categorie.name }}
          </h5>
      
        </div>
      </div>

      <!-- Lien de retour à la liste des catégories -->
      <router-link to="/category-list" class="btn btn-primary mt-3">
        {{ $t("category_list") }}
      </router-link>
    </div>

    <!-- Si la catégorie n'a pas été trouvée -->
    <div v-else>
      <p>{{ $t("category_not_found") }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useCategorieStore } from "../../store/categorieStore";

// Variables nécessaires
const route = useRoute();
const store = useCategorieStore();  // Utilisation du store pour accéder aux catégories
const categorie = ref(null);  // Initialise la catégorie à null

// Lorsque le composant est monté, on récupère les détails de la catégorie
onMounted(async () => {
  const categoryId = route.params.id;  // On récupère l'ID de la catégorie depuis l'URL
  await store.fetchCategorieById(categoryId);  // Charge les détails de la catégorie via le store
});

// Utilisation de watchEffect pour mettre à jour la catégorie lorsque les données du store changent
watchEffect(() => {
  categorie.value = store.selectedCategorie;  // Met à jour la catégorie avec celle sélectionnée
});
</script>
