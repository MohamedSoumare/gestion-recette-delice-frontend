import { defineStore } from "pinia";

export const useRecetteStore = defineStore("recetteStore", {
  state: () => ({
    recettes: [
      {
        id: 1,
        titre: "Crêpe Nutella",
        ingredients: "Farine, lait, oeuf, beurre, sucre",
        type: "Dessert",
        categorie: "Petit-déjeuner"
      },
      {
        id: 2,
        titre: "Lasagne",
        ingredients: "Viande, tomate, feuille de lasagnes, béchamel",
        type: "Plat",
        categorie: "Italien"
      }
    ],
    categories: ["Petit-déjeuner", "Italien", "Français", "Asiatique", "Végétarien"],
    nextId: 3  
  }),
  actions: {
    add(newRecette) {
      this.recettes.push({
        id: this.nextId++,  
        ...newRecette
      });
    },
    edit(id, recetteModifiee) {
      const index = this.recettes.findIndex((recette) => recette.id === id);
      if (index !== -1) {
        this.recettes[index] = { ...recetteModifiee, id };
      }
    },
    destroy(id) {
      this.recettes = this.recettes.filter((recette) => recette.id !== id);
    },
    getById(id) {
      return this.recettes.find((r) => r.id === id);
    },
    searchRecettes(query, categorie) {
      return this.recettes.filter(recette => {
        const matchTitre = recette.titre.toLowerCase().includes(query.toLowerCase());
        const matchCategorie = categorie === '' || recette.categorie === categorie;
        return matchTitre && matchCategorie;
      });
    },
    addCategorie(newCategorie) {
      if (!this.categories.includes(newCategorie)) {
        this.categories.push(newCategorie);
      }
    },
    updateCategorie(oldCategorie, newCategorie) {
      const index = this.categories.indexOf(oldCategorie);
      if (index !== -1) {
        this.categories[index] = newCategorie;
        this.recettes.forEach(recette => {
          if (recette.categorie === oldCategorie) {
            recette.categorie = newCategorie;
          }   
        });
      }
    },
  
    // deleteCategorie(categorie) {
    //   this.categories = this.categories.filter(c => c !== categorie);
    //   this.recettes.forEach(recette => {
    //     if (recette.categorie === categorie) {
    //       recette.categorie = '';
    //     }
    //   });
    // }
  
}
});
