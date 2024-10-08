<template>
  <div class="p-5">
    <h2 class="text-center">{{ $t("recipe_list") }}</h2>
    <div class="d-flex justify-content-between mb-4 align-items-center">
      <div class="d-flex">
        <input
          v-model="searchQuery"
          class="form-control form-control-sm me-2"
          :placeholder="$t('search_placeholder')"
        />
        <select v-model="selectedCategorie" class="form-select form-select-sm me-2">
          <option value="">{{ $t("all_categories") }}</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.name }}
          </option>
        </select>

        <button @click="searchRecettes" class="btn btn-success btn-sm">
          <i class="fas fa-search me-1"></i>{{ $t("search") }}
        </button>
      </div>
      <router-link to="/recette/new" class="btn btn-primary btn-sm">
        <i class="fas fa-plus me-1"></i>{{ $t("new_recipe") }}
      </router-link>
    </div>

    <div class="row">
      <div class="col-md-4 mb-4" v-for="item in filteredRecettes" :key="item.id">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title"><strong>{{ $t("title") }} :</strong> {{ item.title }}</h5>
            <p class="card-text"><strong>{{ $t("ingredients") }} :</strong> {{ item.ingredient }}</p>
            <p class="card-text"><strong>{{ $t("type") }} :</strong> {{ item.type }}</p>
            <p class="card-text">
              <strong>{{ $t("category") }} :</strong> 
              {{ getCategoryName(item.categorie_id) }}
            </p>
          </div>
          <div class="card-footer d-flex justify-content-between">
            <router-link :to="`/recette/show/${item.id}`" class="btn btn-info btn-sm">
              <i class="fas fa-eye me-1"></i>{{ $t("details") }}
            </router-link>
            <router-link :to="`/recette/edit/${item.id}`" class="btn btn-warning btn-sm">
              <i class="fas fa-edit me-1"></i>{{ $t("edit") }}
            </router-link>
            <button @click="destroy(item.id)" class="btn btn-danger btn-sm">
              <i class="fas fa-trash me-1"></i>{{ $t("delete") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRecetteStore } from '../../store/recetteStore';

const store = useRecetteStore();
const searchQuery = ref('');
const selectedCategorie = ref('');
const filteredRecettes = ref([]);

const categories = computed(() => store.categories);

const destroy = async (id) => {
  try {
    const confirmDeletion = window.confirm("Etes-vous sûr de vouloir supprimer cette recette ?");
    if (confirmDeletion) {
      await store.destroy(id);
    }
  } catch (error) {
    console.error(error.message);
  }
};

const searchRecettes = () => {
  filteredRecettes.value = store.recettes.filter((recette) => {
    const matchTitre = recette.title.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchCategorie = selectedCategorie.value === '' || recette.categorie_id == selectedCategorie.value;
    return matchTitre && matchCategorie;
  });
};

const getCategoryName = (categoryId) => {
  const category = categories.value.find(cat => cat.id == categoryId);
  return category ? category.name : $t('no_category');
};

watch(() => store.recettes, (newRecettes) => {
  filteredRecettes.value = newRecettes;
}, { deep: true });

onMounted(async () => {
  await store.fetchCategories();
  await store.fetchRecettes();
  filteredRecettes.value = store.recettes;
});
</script>

<style scoped>
/* Styles spécifiques si nécessaire */
</style>