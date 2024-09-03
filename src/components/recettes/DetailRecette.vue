<template>
  <div class="container">
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
      Launch static backdrop modal
    </button>

    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Details de la recette:</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div v-if="reset">
              <p>{{ reset.title }}</p>
              <p>{{ reset.ingredients }}</p>
              <p>{{ reset.type }}</p>
            </div>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Understood</button>
          </div>
        </div>
      </div>
    </div>

  </div>


</template>

<script setup>
import { useRecetteStore } from '@store/'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const store = useRecetteStore()
const route = useRoute()
const router = useRouter()
const reset = ref(null)

const id = route.params.id

const remoteRecette = () => {
  reset.value = store.recettes.getById(id)
}
</script>

<style scoped></style>