import { defineStore } from "pinia";
import axiosInstance from '../components/axios/configAxios'; 

export const useCategorieStore = defineStore("categorieStore", {
    state: () => ({
        categories: [],
        selectedCategorie: null,
        loading: false,
        error: null,
      }),
    
      actions: {
        async fetchCategories() {
            this.loading = true;
            try {
              const response = await axiosInstance.get("/categories");
              this.categories = response.data;
            } catch (error) {
              this.error = "Erreur lors de la récupération des catégories";
              console.error(this.error, error);
            } finally {
              this.loading = false;
            }
          },
          
    
        async addCategorie(newCategorie) {
          this.loading = true;
          try {
            await axiosInstance.post("/categories/add", newCategorie);
            await this.fetchCategories();
          } catch (error) {
            this.error = "Erreur lors de l'ajout de la catégorie";
            console.error(this.error, error);
          } finally {
            this.loading = false;
          }
        },
    
        async updateCategorie(id, updatedCategorie) {
          this.loading = true;
          try {
            await axiosInstance.put(`/categories/edit/${id}`, updatedCategorie);
            await this.fetchCategories();
          } catch (error) {
            this.error = "Erreur lors de la modification de la catégorie";
            console.error(this.error, error);
          } finally {
            this.loading = false;
          }
        },
    
        async deleteCategorie(id) {
            this.loading = true;
            try {
              // Vérification des recettes associées
              const response = await axiosInstance.get(`/categories/${id}`);
              
          
              // Si aucune recette n'est associée, procéder à la suppression
              await axiosInstance.delete(`/categories/delete/${id}`);
              await this.fetchCategories(); // Mettre à jour la liste après suppression
            } catch (error) {
              this.error = error.message || "Erreur lors de la suppression de la catégorie";
                      } finally {
              this.loading = false;
            }
        },
        
        async fetchCategorieById(id) {
          this.loading = true;
          try {
            const response = await axiosInstance.get(`/categories/${id}`);
            this.selectedCategorie = response.data;
          } catch (error) {
            this.error = "Erreur lors de la récupération de la catégorie";
            console.error(this.error, error);
          } finally {
            this.loading = false;
          }
        },
},

    getters: {
        
        getCategorieById: (state) => {
            return (id) => state.categories.find((categorie) => categorie.id === id);
        },

        isLoading: (state) => state.loading,
    },
});
