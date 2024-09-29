<!-- <template>
  <div class=" p-4 w-50 mx-auto ">
      <div class="container">
        <h2>
          <i class="fas fa-edit me-2"></i>{{ $t("editRecipe") }}
        </h2>
        <form @submit.prevent="updateRecette">
          <div class="mb-3">
            <label for="titre" class="form-label">
              <i class="fas fa-book me-1"></i>{{ $t("title") }}
            </label>
            <input v-model="recette.titre" type="text" id="titre" class="form-control" />
          </div>
          <div class="mb-3">
            <label for="ingredients" class="form-label">
              <i class="fas fa-utensils me-1"></i>{{ $t("ingredients") }}
            </label>
            <input v-model="recette.ingredients" type="text" id="ingredients" class="form-control" />
          </div>
          <div class="mb-3">
            <label for="type" class="form-label fw-bold">
              <i class="fas fa-tags me-1"></i>{{ $t("type") }}
            </label>
            <select v-model="recette.type" class="form-select form-select-lg" id="type" required>
              <option value="entrée">{{ $t("starter") }}</option>
              <option value="plat">{{ $t("main") }}</option>
              <option value="dessert">{{ $t("dessert") }}</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="categorie" class="form-label">
              <i class="fas fa-list-alt me-1"></i>{{ $t("category") }}
            </label>
            <select v-model="recette.categorie" class="form-select" id="categorie" required>
              <option v-for="cat in store.categories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
          </div>
          <button type="submit" class="btn btn-success">
            <i class="fas fa-save me-1"></i>{{ $t("save_recipe") }}
          </button>
        </form>
      </div>
    </div>    
</template> -->


<template>
  <div class="p-4 w-50 mx-auto">
    <div class="container">
      <h2>
        <i class="fas fa-edit me-2"></i>{{ $t("editRecipe") }}
      </h2>
      <form @submit.prevent="updateRecette">
        <div class="mb-3">
          <label for="titre" class="form-label">
            <i class="fas fa-book me-1"></i>{{ $t("title") }}
          </label>
          <input v-model="recette.titre" type="text" id="titre" class="form-control w-100" />
        </div>
        <div class="mb-3">
          <label for="ingredients" class="form-label">
            <i class="fas fa-utensils me-1"></i>{{ $t("ingredients") }}
          </label>
          <input v-model="recette.ingredients" type="text" id="ingredients" class="form-control w-100" />
        </div>
        <div class="mb-3">
          <label for="type" class="form-label fw-bold">
            <i class="fas fa-tags me-1"></i>{{ $t("type") }}
          </label>
          <select v-model="recette.type" class="form-select w-100" id="type" required>
            <option value="entrée">{{ $t("starter") }}</option>
            <option value="plat">{{ $t("main") }}</option>
            <option value="dessert">{{ $t("dessert") }}</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="categorie" class="form-label">
            <i class="fas fa-list-alt me-1"></i>{{ $t("category") }}
          </label>
          <select v-model="recette.categorie" class="form-select w-100" id="categorie" required>
            <option v-for="cat in store.categories" :key="cat" :value="cat">{{ cat }}</option>
          </select>
        </div>
        <button type="submit" class="btn btn-success">
          <i class="fas fa-save me-1"></i>{{ $t("save_recipe") }}
        </button>
      </form>
    </div>
  </div>    
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import { useRecetteStore } from '../../store/recetteStore';

const store = useRecetteStore(); 
const route = useRoute();
const router = useRouter(); 
const recette = ref({ titre: '', ingredients: '', type: '', categorie: '' }); 

onMounted(() => {
  const recetteExistante = store.getById(Number(route.params.id));
  if (recetteExistante) {
    recette.value = { ...recetteExistante }; 
  }
});

const updateRecette = () => {
  store.edit(Number(route.params.id), recette.value); 
  router.push('/recette-list'); 
};
</script>
