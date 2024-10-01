// recetteStore.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useRecetteStore = defineStore('recetteStore', {
  state: () => ({
    recettes: [],
    categories: [],
    nextId: 1,  
  }),

  actions: {
   
    async fetchRecettes() {
      try {
          const response = await axios.get('http://localhost:3090/api/recipes');
          console.log('Recettes:', response.data);
          this.recettes = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des recettes:', error);
      }
    },

    async add(recette) {
      try {
        await axios.post('http://localhost:3090/api/recipes/add', recette);
        await this.fetchRecettes(); 
      } catch (error) {
        console.error('Erreur lors de l\'ajout de la recette', error);
      }
    },
    
    async edit(id, updatedRecette) {
      try {
        await axios.put(`http://localhost:3090/api/recettes/${id}`, updatedRecette);
        await this.fetchRecettes(); 
      } catch (error) {
        console.error('Erreur lors de la modification de la recette', error);
      }
    },
     
    async destroy(id) {
      try {
        await axios.delete(`http://localhost:3090/api/recipes/delete/${id}`);
        const resp = await this.fetchRecettes(); 
      } catch (error) {
        console.error('Erreur lors de la suppression de la recette:', error);
      }
    },

    async fetchCategories() {
      try {
        const response = await axios.get('http://localhost:3090/api/categories');
        this.categories = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories:", error);
      }
    },
    
    async addCategorie(newCategorie) {
      try {
        const response = await axios.post('http://localhost:3090/api/categories/add', newCategorie);
        this.categories.push(response.data);
      } catch (error) {
        console.error("Erreur lors de l'ajout de la catégorie:", error);
      }
    },
    
    async updateCategorie(id, updatedCategorieName) {
      try {
        const response = await axios.put(`http://localhost:3090/api/categories/edit/${id}`, { name: updatedCategorieName });
        const index = this.categories.findIndex(categorie => categorie.id === id);
        if (index !== -1) {
          this.categories[index].name = updatedCategorieName;
        }
        return response.data;
      } catch (error) {
        console.error("Erreur lors de la modification de la catégorie:", error);
      }
    },
    
    async deleteCategorie(id) {
      try {
        await axios.delete(`http://localhost:3090/api/categories/delete/${id}`);
        this.categories = this.categories.filter(categorie => categorie.id !== id);
      } catch (error) {
        console.error("Erreur lors de la suppression de la catégorie:", error);
      }
    },
  },        

  getters: {
    getById: (state) => {
      return (id) => state.recettes.find((recette) => recette.id === id);
    },
  },
});
