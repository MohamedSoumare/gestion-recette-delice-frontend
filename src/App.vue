<template>

  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid"> 
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item mx-3">
              <router-link class="nav-link" to="/">{{ $t("home") }}</router-link>
            </li>
            <li class="nav-item mx-3">
              <router-link class="nav-link" to="/recette/new">{{ $t("addRecipe") }}</router-link>
            </li>
            <li class="nav-item mx-3">
              <router-link class="nav-link" to="/recette-list">{{ $t("recipe_list") }}</router-link>
            </li>
          </ul>

          <select class="form-select ms-auto" @change="changeLanguage" style="width: 80px;">
            <option value="fr" :selected="locale === 'fr'">FR</option>
            <option value="en" :selected="locale === 'en'">EN</option>
          </select>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>


    <!-- Router view for page content -->
    <router-view />
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();


// Fonction pour changer la langue
const changeLanguage = (event) => {
  locale.value = event.target.value;
};

</script>

