const categorias = document.querySelector("#categorias")
const resultado = document.querySelector("#resultado")

document.addEventListener("DOMContentLoaded", obtenerCategorias)
categorias.addEventListener("change", obtenerRecetas)

function obtenerCategorias() {
    const urlCategorias = "https://www.themealdb.com/api/json/v1/1/categories.php"
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

function mostrarRecetas(recetasRequest = []) {
    limpiarHTML(resultado)
    recetasRequest.forEach((receta) => {
        const contenedorRecetas = document.createElement("div")
        contenedorRecetas.classList.add("col-md-4")

        const recetaCard = document.createElement("div")
        recetaCard.classList.add("card", "mb-4")

        const recetaCardBody = document.createElement("div")
        recetaCardBody.classList.add("card-body")

        const recetaHeading = document.createElement("h3")
        recetaHeading.classList.add("cardtitle", "mb-3")
        recetaHeading.textContent = receta.strMeal
    
        const imagenRecetaHTML = document.createElement("img")
        imagenRecetaHTML.src = receta.strMealThumb
        imagenRecetaHTML.alt = "Receta"

        const añadirFavoritoHTML = document.createElement("button")
        añadirFavoritoHTML.textContent = "Añadir a favoritos"
        añadirFavoritoHTML.classList.add("btn", "btn-danger", "w-100")
        
        añadirFavoritoHTML.addEventListener("click", function() {
            obtenerReceta(receta.idMeal)
        })

        recetaCard.appendChild(imagenRecetaHTML)
        recetaCard.appendChild(recetaCardBody)

        recetaCardBody.appendChild(recetaHeading)
        recetaCardBody.appendChild(añadirFavoritoHTML)

        contenedorRecetas.appendChild(recetaCard)

        resultado.append(contenedorRecetas)
    })
}

function obtenerReceta(id) {
    const urlReceta = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    fetch(urlReceta)
    .then(data => data.json())
    .then(data => añadirFavorito(data.meals[0]))
}

function añadirFavorito(receta) {
    console.log(receta)
}

function limpiarHTML(referencia) {
    while (referencia.firstChild) {
        referencia.removeChild(referencia.firstChild)
    }
}