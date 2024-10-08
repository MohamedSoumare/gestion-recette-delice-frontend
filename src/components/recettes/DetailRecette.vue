<template>
  <div class="category-details-container card shadow-sm p-4 w-50 mx-auto mt-5">
    <h2 class="text-center mb-4">{{ $t("show_details") }}</h2>  
    <div v-if="categorie">
          <p><strong>{{ $t("id") }}:</strong> {{ categorie.id }}</p>
      
        <h3 class="category-name text-primary">{{ $t("title") }}:{{ categorie.name }}</h3> 
      
      <div class="text-center mt-4">
        <router-link to="/category-list" class="btn btn-primary">
          {{ $t("category_list") }}
        </router-link>
      </div>
    </div>

    <div v-else>
      <p class="text-danger">{{ $t("category_not_found") }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useCategorieStore } from "../../store/categorieStore";

const route = useRoute();
const store = useCategorieStore();
const categorie = ref(null);  

onMounted(async () => {
  const categoryId = route.params.id; 
  await store.fetchCategorieById(categoryId);  
});

watchEffect(() => {
  categorie.value = store.selectedCategorie; 
});
</script>

<style scoped>
.category-details-container {
  max-width: 600px;
  margin: auto;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.category-name {
  font-size: 24px;
  font-weight: bold;
}

.text-primary {
  color: #007bff;
}

.text-danger {
  color: #dc3545;
}

.text-center {
  text-align: center;
}
</style>
