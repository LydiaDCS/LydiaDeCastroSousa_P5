let productStorage = "";
//je supprime un produit du panier
function removeFromBasket(productStorage) {
    let basket = getBasket();
    basket = basket.filter(p => p.id != productId)
    saveBasket(basket);
}

//je modifie la quantité
function changeQuantity(productStorage, quantity) {
    let basket = getBasket();
    let foundProduct = basket.find(p => p.id == product.id);
    if (findproduct != undefined) {
        foundProduct.quantity += quantity;
        if (foundProduct.quantity <= 0) {
            removeFromBasket(foundproduct);
        } else {
            saveBasket(basket);
        }
    }
}

//je determine la quantité de produits dans le panier
function getNumberProduct() {
    let basket = getBasket();
    let number = 0;
    for (let product of basket) {
        number += product.quantity;
    }
    return number;
}

//je determine le prix total du panier
function getNumberProduct() {
    let basket = getBasket();
    let total = 0;
    for (let product of basket) {
        total += product.quantity * product.price;
    }
    return total;
}



//j'ajoute une donnée dans le local storage
function saveBasket(basket) {
    localStorage.setItems("basket", JSON.stringify(productStorage));
}

function getBasket() {
    let basket = localStorage.getItems("productStorage");
    if (basket == null) {
        return [];
    } else {
        JSON.parse(basket);
    }
}

//je récupère le panier, recherche dans mon panier si élément existe déjà, ajoute un produit puis enregistre de nouveau le panier
function addBasket(productStorage) {
    let basket = getBasket();
    let foundProduct = basket.find(p => p.id == product.id);
    if (findproduct != undefined) {
        foundProduct.quantity++;
    } else {
        product.quantity = 1;
        basket.push(product);
    }
    saveBasket(basket);
}

//je supprime un produit du panier
function removeFromBasket(product) {
    let basket = getBasket();
    basket = basket.filter(p => p.id != product.id)
    saveBasket(basket);
}

//je modifie la quantité
function changeQuantity(product, quantity) {
    let basket = getBasket();
    let foundProduct = basket.find(p => p.id == product.id);
    if (findproduct != undefined) {
        foundProduct.quantity += quantity;
        if (foundProduct.quantity <= 0) {
            removeFromBasket(foundproduct);
        } else {
            saveBasket(basket);
        }
    }
}

//je determine la quantité de produits dans le panier
function getNumberProduct() {
    let basket = getBasket();
    let number = 0;
    for (let product of basket) {
        number += product.quantity;
    }
    return number;
}

//je determine le prix total du panier
function getNumberProduct() {
    let basket = getBasket();
    let total = 0;
    for (let product of basket) {
        total += product.quantity * product.price;
    }
    return total;
}

//Je déclara la variable "produitEnregistreDansMonLocalStorage"
let produitEnregistreDansMonLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.log(produitEnregistreDansMonLocalStorage);
if (produitEnregistreDansMonLocalStorage) {

} else {
    produitEnregistreDansMonLocalStorage = [];
    produitEnregistreDansMonLocalStorage.push(productStorage);
    console.log(produitEnregistreDansMonLocalStorage);
}