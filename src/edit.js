import { loadRecipes, createIngredient, ingredientsRenderizer } from './functions'

const editTitleInput = document.querySelector('#editTitleInput')
const editBodyInput = document.querySelector('#editBodyInput')
const ingredientsDiv = document.querySelector('#ingredientsDiv')
const addIngredientInput = document.querySelector('#addIngredientInput')
const createIngredientButton = document.querySelector('#createIngredientButton')
const removeRecipeButton = document.querySelector('#removeRecipeButton')
const editRecipeButton = document.querySelector('#editRecipeButton')

const ingredientsStorageDiv = document.createElement('div')

let recipes = loadRecipes()

// Finding the correct recipe through the page's hash

const recipeID = location.hash.substring(1)
const workingRecipeIndex = recipes.findIndex(value => value.id === recipeID)

editTitleInput.setAttribute('value', recipes[workingRecipeIndex].name)
if (recipes[workingRecipeIndex].body === undefined) {
    editBodyInput.value = `Type the steps to complete this recipe here.`
} else {
    editBodyInput.value = recipes[workingRecipeIndex].body
}

editRecipeButton.addEventListener('click', event => {
    event.preventDefault()
    recipes[workingRecipeIndex].name = editTitleInput.value
    recipes[workingRecipeIndex].body = editBodyInput.value
    localStorage.setItem('recipes', JSON.stringify(recipes))
    location.assign('index.html')

})

removeRecipeButton.addEventListener('click', event => {
    if (confirm(`Are you completely sure you would like to delete the ${recipes[workingRecipeIndex].name} recipe?`)) {
        recipes.splice(workingRecipeIndex, 1)
    } else {
        console.log(`Woof! This motherfucker almost screwed me.`)
    }
})

createIngredientButton.addEventListener('click', event => {
    createIngredient()
    ingredientsRenderizer()
    addIngredientInput.value = ``
})

ingredientsRenderizer()
