import { defineStore } from "pinia";
import { reactive } from "vue";

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
        recetteForm: reactive({
            titre: "",
            ingredients: "",
            type: "",
        })
    }),
    actions: {
        edit(id) {
            // const index = this.recettes
            this.recettes[id] = {...this.recetteForm, id}
        },
        destroy(id) {
            this.recettes= this.recettes.filter((recette) => recette.id !== id)
        },
        show(id) {
            const recetteIndex = this.recettes.findIndex(c => c.id == id) 
            if (recetteIndex !== -1) {
                this.recettes = this.recettes[recetteIndex]
            }  
        },
        add(recette) {
            this.recettes.push(recette)
        },
        getById(id) {
            const recette = this.recettes.find((r) => r.id === id);
        }
    }
})