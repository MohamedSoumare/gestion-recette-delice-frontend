import { defineStore } from "pinia";
import axiosInstance from '../components/axios/configAxios';

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
      try {
        const response = await axiosInstance.get('/recipes');
        this.recettes = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des recettes', error);
        this.error = 'Erreur lors de la récupération des recettes';
      } finally {
        this.loading = false;
      }
    },

    async fetchCategories() {
      this.loading = true;
      try {
        const response = await axiosInstance.get('/categories');
        this.categories = response.data;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async add(recipeData) {
      try {
        const response = await axiosInstance.post("/recipes/add", recipeData);
        this.recettes.push(response.data);
        return response.data;
      } catch (error) {
        console.error("Erreur lors de l'ajout de la recette", error);
        throw error;
      }
    },
    
    async update(id, recipeData) {
      try {
        const response = await axiosInstance.put(`/recipes/edit/${id}`, recipeData);
        const updatedRecipe = response.data;
        const index = this.recettes.findIndex(r => r.id == id);
        if (index !== -1) {
          this.recettes[index] = updatedRecipe;
        }
        return updatedRecipe;
      } catch (error) {
        console.error("Erreur lors de la mise à jour de la recette", error);
        throw error;
      }
    },
    
    async destroy(id) {
      this.loading = true;
      try {
        await axiosInstance.delete(`/recipes/delete/${id}`);
        // Mettre à jour la liste des recettes après suppression
        this.recettes = this.recettes.filter(r => r.id !== id);
      } catch (error) {
        console.error('Erreur lors de la suppression de la recette:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    getById(id) {
      return this.recettes.find(r => r.id == id);
    },
  },
});