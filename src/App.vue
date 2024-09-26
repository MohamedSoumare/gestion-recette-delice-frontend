<template>
  <div class="container-fluid">
    <router-link to="/" />
    
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Acceuil</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/recette/new"> Ajout de recette</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/recipe-list">Liste des reccette</router-link>
            </li>
          </ul>
         
      </div>
      </div>
    </nav>

    <!-- Router view for page content -->
    <router-view />
  </div>
</template>
<script setup>

</script>

<style scoped>
/* Add your styling here */
</style>
