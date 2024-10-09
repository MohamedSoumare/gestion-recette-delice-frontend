<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h2>
          <i class="fas fa-receipt me-2"></i>{{ $t("recipe details") }}
        </h2>
      </div>
      <div class="card-body">
        <div v-if="recette">
          <p>
            <strong><i class="fas fa-book me-1"></i>{{ $t("title") }}:</strong> {{ recette.title }}
          </p>
          <p>
            <strong><i class="fas fa-utensils me-1"></i>{{ $t("ingredients") }}:</strong> {{ recette.ingredient }}
          </p>
          <p>
            <strong><i class="fas fa-tag me-1"></i>{{ $t("type") }}:</strong> {{ recette.type }}
          </p>
          <p>
            <strong><i class="fas fa-list-alt me-1"></i>{{ $t("category") }}:</strong> {{ recette.categorie_name}}
          </p>
        </div>
      </div>
      <div class="card-footer text-end">
        <router-link to="/recette-list" class="btn btn-primary">
          <i class="fas fa-arrow-left me-1"></i>{{ $t("back to the list") }}
        </router-link>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRecetteStore } from '../../store/recetteStore';
import { useRoute } from 'vue-router';

const store = useRecetteStore(); 
const route = useRoute(); 
const recette = ref(null); 

onMounted(() => {
  const recetteExistante = store.getById(Number(route.params.id)); 
  if (recetteExistante) {
    recette.value = recetteExistante; 
  }
});
</script>

<style scoped>
.container {
  max-width: 800px;
}

.card {
  margin-top: 20px;
}
</style>