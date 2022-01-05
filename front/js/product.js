//Je récupère l'id produit depuis l'Url

let params = (new URL(document.location)).searchParams;

let productId = params.get("id");
console.log(productId);

//Je déclare mes variables et fait le lien avec ma page html

let title = document.getElementById("title");
let imageUrl = document.querySelector(".item__img");
let prix = document.getElementById("price");
let description = document.getElementById("description");
let couleurs = document.querySelector("colors");


// Je récupére mon produit depuis mon API
async function fetchApiProduct() {
    await fetch(`http://localhost:3000/api/products/${productId}`)
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function(data) {
            console.log(data);
            productForm(data);
        })
        .catch(function(err) {
            console.log('une erreur est survenue, err');
        });
    // Je modifie les elements de la page par rapport au produit sélectionné

    function productForm(data) {
        //Nom du produit
        title.innerHTML = data.name;

        //Insérer image
        imageUrl.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;

        //Prix
        prix.innerHTML = data.price;

        //Description du produit
        description.innerHTML = data.description;

        //Je crée une boucle pour le choix des Couleurs
        for (let i = 0; i < data.colors.length; i++) {
            couleurs = document.getElementById("colors");
            couleurs.innerHTML += `
            <option value="${data.colors[i]}">${data.colors[i]}</option>`;
        }
    }
}
fetchApiProduct();


/*
addEventListener sur bouton et clic du bouton appeler addBasket et lui passant produit affiche*é sur la page

//j'ajoute une donnée dans le local storage
function saveBasket(valeur){
    localStorage.setItems("clé, JSON.stringify(valeur));
}

function getBasket(){
    let basket = localStorage.getItems("clé");
    if (basket == null){
        return [];
    }else{
        JSON.parse(valeur);
    }
}

//je récupère le panier, recherche dans mon panier si élément existe déjà, ajoute un produit puis enregistre de nouveau le panier
function addBasket(product){
    let basket = getBasket();
    let foundProduct = basket.find(p=>p.id ==product.id);
    if(findproduct != undefined){
        foundProduct.quantity++;
    }else{
        product.quantity = 1;
        basket.push(product);
    }
    saveBasket(basket);
}

//je supprime un produit du panier
function removeFromBasket(product){
let basket = getBasket();
basket =basket.filter(p=>p.id != product.id)
saveBasket(basket);
}

//je modifie la quantité
function changeQuantity(product, quantity){
    let basket = getBasket();
    let foundProduct = basket.find(p=>p.id ==product.id);
    if(findproduct != undefined){
        foundProduct.quantity += quantity;
        if (foundProduct.quantity <=0){
            removeFromBasket(foundproduct);
        }else{
            saveBasket(basket);
        }
    }
}

//je determine la quantité de produits dans le panier
function getNumberProduct(){
    let basket = getBasket();
    let number = 0;
    for (let product of basket){
        number += product.quantity;
    }
    return number;
}

//je determine le prix total du panier
function getNumberProduct(){
    let basket = getBasket();
    let total = 0;
    for (let product of basket){
        total += product.quantity * product.price;
    }
    return total;
}
*/