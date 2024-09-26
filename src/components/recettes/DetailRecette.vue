<template>
  <div class="container">
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
      {{ $t("show details") }}
    </button>

    
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">{{ $t("recipe details") }}</h5>
            <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
          </div>
          <div class="modal-body">
            <div v-if="recette">
              <p><strong>T{{ $t("title") }} :</strong> {{ recette.titre }}</p>
              <p><strong>{{ $t("ingredients") }} :</strong> {{ recette.ingredients }}</p>
              <p><strong>{{ $t("type") }} :</strong> {{ recette.type }}</p>
            </div>
            <div v-else>
              <p>{{ $t("recipe not found") }}</p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ $t("close") }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRecetteStore } from '../../store/recetteStore';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const store = useRecetteStore();
const route = useRoute();
const recette = ref(null);

const id = Number(route.params.id);  


onMounted(() => {
  recette.value = store.getById(id);
});
</script>

<style scoped></style>
