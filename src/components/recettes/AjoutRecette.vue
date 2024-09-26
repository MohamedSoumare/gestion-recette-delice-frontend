<template>
  <div class="container">
    <h3>{{ $t("addRecipe") }}:</h3>
    <form @submit.prevent="onSubmit">
      <div class="mb-3">
        <label for="titre" class="form-label">{{ $t("title") }}</label>
        <input type="text" class="form-control" id="titre" v-model="titre">
      </div>
      <div class="mb-3">
        <label for="ingredients" class="form-label">{{ $t("ingredients") }}</label>
        <input type="text" class="form-control" id="ingredients" v-model="ingredients">
      </div>
      <div class="mb-3">
        <label for="type" class="form-label">{{ $t("type") }}</label>
        <select class="form-control" id="type" v-model="type">
          <option value="dessert">{{ $t("dessert") }}</option>
          <option value="entree">{{ $t("starter") }}</option>
          <option value="plat">{{ $t("main") }}</option>
        </select>
      </div>
      
      <button class="btn btn-success">{{ $t("submit") }}</button>
    </form>
  </div>


</template>

<script setup>

import { ref } from 'vue';
import { useRecetteStore } from '../../store/recetteStore';
import { useRouter } from 'vue-router';



const store = useRecetteStore ()

const router = useRouter()
const titre = ref('')
const ingredients = ref('')
const type = ref('')
const onSubmit = () => {

    store.add({
      titre:titre.value,
      ingredients:ingredients.value,
      type:type.value
    })
    router.push('/recette-list')

}
</script>

<style scoped></style>