const searchInput = document.querySelector('#searchInput')
const recipesDiv = document.querySelector('#recipesDiv')
const createButton = document.querySelector('#createButton')

const insertValueDiv = document.createElement('div') // div of error message (input value empty)
const storageDiv = document.createElement('div') // div of recipes from renderizer()

import { loadRecipes, createRecipe, renderizer } from './functions'

let recipes = loadRecipes()

createButton.addEventListener('click', event => {
    createRecipe()
    searchInput.value = ``
    renderizer()
})

window.addEventListener('storage', event => {
    if (event.key === 'recipes') {
        recipes = JSON.parse(event.newValue)
        renderizer()
    }
})

renderizer()
