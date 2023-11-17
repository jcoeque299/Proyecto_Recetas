const urlCategorias = "https://www.themealdb.com/api/json/v1/1/categories.php"

const categorias = document.querySelector("#categorias")
const resultado = document.querySelector("#resultado")

document.addEventListener("DOMContentLoaded", iniciarApp)
categorias.addEventListener("change", obtenerRecetas)

function iniciarApp() {
    obtenerCategorias()
}

function obtenerCategorias() {
    fetch(urlCategorias)
    .then(data => data.json())
    .then(data => crearCategorias(data.categories))
}

function crearCategorias(categoriasRequest) {
    categoriasRequest.forEach((categoria) => {
        const optionHTML = document.createElement("option")
        optionHTML.value = categoria.strCategory
        optionHTML.text = categoria.strCategory
        categorias.appendChild(optionHTML)
    })
}

function obtenerRecetas(e) {
    const categoria = e.target.value
    const urlRecetas = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`
    fetch(urlRecetas)
    .then(data => data.json())
    .then(data => mostrarRecetas(data.meals))
}

function mostrarRecetas(recetasRequest) {
    limpiarHTML()
    recetasRequest.forEach((receta) => {
        const nombreRecetaHTML = document.createElement("p")
        nombreRecetaHTML.textContent = receta.strMeal
        const imagenRecetaHTML = document.createElement("a")
        imagenRecetaHTML.href = receta.strMealThumb
        imagenRecetaHTML.textContent = "Ver imagen"
        resultado.appendChild(nombreRecetaHTML)
        resultado.appendChild(imagenRecetaHTML)
    })
}

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
}