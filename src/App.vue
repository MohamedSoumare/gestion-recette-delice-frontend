<template>
  <div class="container-fluid">
    <router-link to="/" />
    
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/">{{ $t("home") }}</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/recette/new">{{ $t("addRecipe") }}</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/recipe-list">{{ $t("recipe_list") }}</router-link>
            </li>
          </ul>
          <select class="form-select ms-auto" @change="changeLanguage" style="width: 80px;">
  <option value="fr" :selected="locale === 'fr'">FR</option>
  <option value="en" :selected="locale === 'en'">EN</option>
</select>

      </div>
      </div>
    </nav>

    <!-- Router view for page content -->
    <router-view />
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n';

// Utilisation de useI18n pour accéder et modifier la locale
const { locale } = useI18n();

// Fonction pour changer la langue
const changeLanguage = (event) => {
  locale.value = event.target.value; // Change la langue à celle sélectionnée
};
</script>

<style scoped>
/* Add your styling here */
</style>
