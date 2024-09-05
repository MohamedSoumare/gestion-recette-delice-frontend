import { defineStore } from "pinia";

export const useRecetteStore = defineStore("recetteStore", {
    state: () => ({
        recettes: [
            {
                id: 1,
                titre: "Crêpe Nutella",
                ingredients: "Farine, lait, oeuf, beurre, sucre",
                type: "Dessert",
            },
            {
                id: 2,
                titre: "Lasagne",
                ingredients: "Viande, tomate, feuille de lasagnes, béchamel",
                type: "Plat",
            }
        ],
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
        }
    }
});
