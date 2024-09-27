
<template>
  <div class="container-fluid p-5">
    <h1 class="text-center">{{ $t('welcome_title') }}</h1>
    <h1 class="text-center">{{ $t('welcome_description') }}</h1>
    <router-link to="/recette-list" class="btn btn-secondary">{{ $t('discover') }}</router-link>
  </div>
</template>

<script setup>
</script>

<style scoped>
.container-fluid {
  background-image: url('../assets/backgroud.jpg');
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>

