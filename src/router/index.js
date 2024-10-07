import { createRouter, createWebHistory } from "vue-router";

import Home from '../components/Home.vue';
import Ajout from '../components/recettes/AjoutRecette.vue';
import Modifie from '../components/recettes/ModifieRecette.vue';
import Liste from '../components/recettes/ListeRecette.vue';
import Detail from '../components/recettes/DetailRecette.vue';
import CategorieList from "../components/categories/ListeCategorie.vue";
import AjoutCategorie from "../components/categories/AjoutCategorie.vue";
import EditCategorie from "../components/categories/EditCategorie.vue";
import DetailsCategorie from "../components/categories/DetailsCategorie.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/recette-list',
    name: 'recettes',
    component: Liste,
  },
  {
    path: '/recette/new',
    name: 'ajout-recette',
    component: Ajout,
  },
  {
    path: '/recette/edit/:id',
    name: 'modifier-recette',
    component: Modifie,
  },
  {
    path: '/recette/show/:id',
    name: 'detail-recette',
    component: Detail,
  },
  {
    path: '/category-list',
    name: 'category-list',
    component: CategorieList,
  },
  {
    path: '/categorie/new',
    name: 'ajout-categorie',
    component: AjoutCategorie,
  },
  {
    path: '/categorie/details/:id', 
    name: 'details-categorie',
    component: DetailsCategorie,
  },
  {
    path: '/categorie/edit/:id',
    name: 'edit-categorie',
    component: EditCategorie,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
