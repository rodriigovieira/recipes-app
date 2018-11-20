const insertValueDiv = document.createElement('div') // div of error message (input value empty)
const storageDiv = document.createElement('div') // div of recipes from renderizer()

const searchInput = document.querySelector('#searchInput')
const recipesDiv = document.querySelector('#recipesDiv')
const createButton = document.querySelector('#createButton')

const ingredientsStorageDiv = document.createElement('div')

let recipes = loadRecipes()

// Finding the correct recipe through the page's hash

const recipeID = location.hash.substring(1)
const workingRecipeIndex = recipes.findIndex(value => value.id === recipeID)

// Retrieve Recipes from Local Storage

function loadRecipes() {
    if (localStorage.getItem('recipes') !== null) {
        return JSON.parse(localStorage.getItem('recipes'))
    } else {
        return []
    }
}

// Create a new object in the array - with validator showing error message

function createRecipe() {
    let recipeID = generateID()
    if (searchInput.value) {
        recipes.push({
            id: recipeID,
            name: searchInput.value,
            ingredients: []
        })
        localStorage.setItem('recipes', JSON.stringify(recipes))
    } else {
        insertValueDiv.innerHTML = ``
        const h3 = document.createElement('h3')
        h3.textContent = `You need to insert a value.`
        insertValueDiv.appendChild(h3)
        document.querySelector('body').appendChild(insertValueDiv)
    }
}

// Renderize all the recipes to the DOM

function renderizer(recipeID) {
    storageDiv.innerHTML = ``
    recipes.forEach(value => {

        // displaying remove button

        const removeRecipe = document.createElement('button')
        removeRecipe.textContent = `X`
        storageDiv.appendChild(removeRecipe)

        // adding space between button and text

        const space = document.createElement('span')
        space.innerHTML = `    `
        storageDiv.appendChild(space)

        // displaying recipe's text

        const text = document.createElement('span')
        text.innerHTML = `<a href="edit.html#${value.id}">${value.name}</a>`
        storageDiv.appendChild(text)
        recipesDiv.appendChild(storageDiv)

        // adding separation line between items

        const separator = document.createElement('br')
        storageDiv.appendChild(separator)

        // handling button's logic

        removeRecipe.addEventListener('click', event => {
            let foundRecipeIndex = recipes.findIndex(value => value.id === recipeID)
            recipes.splice(foundRecipeIndex, 1)
            localStorage.setItem('recipes', JSON.stringify(recipes))
            renderizer()
        })

    })
}

// Generate a custom ID for each recipe and ingredient

function generateID() {
    return (Math.random() * 1e15).toFixed(0)
}

// Create ingredient and save it to LocalStorage

function createIngredient(crazyID) {
    recipes[workingRecipeIndex].ingredients.push({
        id: generateID(),
        name: addIngredientInput.value,
        hasStatus: false
    })
    localStorage.setItem('recipes', JSON.stringify(recipes))
}

// Renderize all ingredients to the DOM

function ingredientsRenderizer(crazyID) {
    ingredientsStorageDiv.innerHTML = ``
    recipes[workingRecipeIndex].ingredients.forEach(ingredient => {

        // displaying checkbox

        const checkbox = document.createElement('input')
        checkbox.setAttribute('type', 'checkbox')
        ingredientsStorageDiv.appendChild(checkbox)

        // displaying ingredient 

        const text = document.createElement('span')
        text.innerHTML = `${ingredient.name}`
        ingredientsStorageDiv.appendChild(text)

        // adding space between text and remove

        const spacer = document.createElement('span')
        spacer.innerHTML = `    `
        ingredientsStorageDiv.appendChild(spacer)

        // displaying remove text

        const removeText = document.createElement('span')
        removeText.innerHTML = `<a href="#">remove<a/>`
        ingredientsStorageDiv.appendChild(removeText)

        // handling remove logic

        removeText.addEventListener('click', event => {
            removeIngredient(ingredient.id)
        })

        // adding separation line between items

        const separator = document.createElement('br')
        ingredientsStorageDiv.appendChild(separator)

        ingredientsDiv.appendChild(ingredientsStorageDiv)
    })
}

// Handle the removal of an ingredient

function removeIngredient(receivedID) {
    const foundID = recipes[workingRecipeIndex].ingredients.findIndex(value => {
        return value.id === receivedID
    })
    recipes[workingRecipeIndex].ingredients.splice(foundID, 1)
    localStorage.setItem('recipes', JSON.stringify(recipes))
    ingredientsRenderizer()
}

export { loadRecipes, createRecipe, renderizer, generateID, createIngredient, ingredientsRenderizer, removeIngredient }
