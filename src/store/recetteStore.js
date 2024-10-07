import { defineStore } from 'pinia';
import axios from 'axios';

const BASE_URL = 'http://localhost:3090';

export const useRecetteStore = defineStore('recetteStore', {
  state: () => ({
    recettes: [],
    categories: [],
    loading: false,
    error: null, 
  }),

  actions: {
    async fetchRecettes() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(`${BASE_URL}/recipes`);
        this.recettes = response.data;
      } catch (error) {
        this.error = 'Erreur lors de la récupération des recettes';
        console.error(this.error, error);
      } finally {
        this.loading = false;
      }
    },

    async add(recette) {
      this.loading = true;
      this.error = null;
      try {
        await axios.post(`${BASE_URL}/recipes/add`, recette);
        await this.fetchRecettes(); 
      } catch (error) {
        this.error = 'Erreur lors de l\'ajout de la recette';
        console.error(this.error, error);
      } finally {
        this.loading = false;
      }
    },

    async edit(id, updatedRecette) {
      this.loading = true;
      try {
        await axios.put(`${BASE_URL}/recipes/edit/${id}`, updatedRecette);
        await this.fetchRecettes(); 
      } catch (error) {
        console.error('Erreur lors de la modification de la recette', error);
      } finally {
        this.loading = false;
      }
    },

    async destroy(id) {
      this.loading = true;
      try {
        await axios.delete(`${BASE_URL}/recipes/delete/${id}`);
        await this.fetchRecettes();
      } catch (error) {
        console.error('Erreur lors de la suppression de la recette:', error);
      } finally {
        this.loading = false;
      }
    },

    async fetchCategories() {
      this.loading = true;
      try {
        const response = await axios.get(`${BASE_URL}/categories`);
        this.categories = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories:", error);
      } finally {
        this.loading = false;
      }
    },

    async addCategorie(newCategorie) {
      this.loading = true;
      try {
        await axios.post(`${BASE_URL}/categories/add`, newCategorie);
        await this.fetchCategories(); // Actualisation après ajout
      } catch (error) {
        console.error("Erreur lors de l'ajout de la catégorie", error);
      } finally {
        this.loading = false;
      }
    },

    async updateCategorie(id, updatedCategorie) {
      this.loading = true;
      try {
        await axios.put(`${BASE_URL}/categories/edit/${id}`, updatedCategorie);
        await this.fetchCategories(); // Actualisation après modification
      } catch (error) {
        console.error("Erreur lors de la modification de la catégorie", error);
      } finally {
        this.loading = false;
      }
    },

    async deleteCategorie(id) {
      this.loading = true;
      try {
        await axios.delete(`${BASE_URL}/categories/delete/${id}`);
        await this.fetchCategories();  // Actualisation après suppression
      } catch (error) {
        console.error("Erreur lors de la suppression de la catégorie", error);
      } finally {
        this.loading = false;
      }
    },
  },

  getters: {
    getById: (state) => {
      return (id) => state.recettes.find((recette) => recette.id === id);
    },
    getCategorieById: (state) => {
      return (id) => state.categories.find((categorie) => categorie.id === id);
    },
  },
});
