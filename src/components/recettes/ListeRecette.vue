<template>
  <div class="container">

    <h2> Liste des recettes</h2>
    <div class="d-flex justify-content-end mb-4 ">
      <router-link to="/recette/new" class="btn btn-danger ">Nouvelle Recette</router-link>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Titre</th>
          <th scope="col">Ingredients</th>
          <th scope="col">Type</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in store.recettes" :key="item.id">
          <td scope="row">{{ `# ${item.id} ` }}</td>
          <td>{{ item.titre }}</td>
          <td>{{ item.ingredients }}</td>
          <td>{{ item.type }}</td>
        </tr>

      </tbody>
    </table>


    <!-- <div class="d-flex flex-row justify-content-center mt-3">
      <div class="col-md-3 mb-4 ">
        <div class="card" style="width: 18rem;">
          <img src="../../assets/images/ananas.jpg" class="card-img-top" alt="...">
          <div class="card-body">
            <button><i class="fa-solid fa-eye"></i></button>
          </div>
        </div>
         <div class="card" style="width: 18rem;">
          <img src="../../assets/images/pancake.jpg" class="card-img-top" alt="...">
          <div class="card-body">
            <button><i class="fa-solid fa-eye"></i></button>
          </div>
        </div>
        <div class="card" style="width: 18rem;">
          <img src="../../assets/images/galette.webp" class="card-img-top" alt="...">
          <div class="card-body">
            <button><i class="fa-solid fa-eye"></i></button>
          </div>
        </div>
        <div class="card" style="width: 18rem;">
          <img src="../../assets/images/chocolat.jpg" class="card-img-top" alt="...">
          <div class="card-body">
            <button><i class="fa-solid fa-eye"></i></button>
          </div>
        </div>
        <div class="card" style="width: 18rem;">
          <img src="../../assets/images/cup-salty.jpg" class="card-img-top" alt="...">
          <div class="card-body">
            <button><i class="fa-solid fa-eye"></i></button>
          </div>
        </div>
        <div class="card" style="width: 18rem;">
          <img src="../../assets/images/calamar.jpg" class="card-img-top" alt="...">
          <div class="card-body">
            <button><i class="fa-solid fa-eye"></i></button>
          </div>
        </div> -->
  </div>
</template>

<script setup>

</script>

<style scoped></style>