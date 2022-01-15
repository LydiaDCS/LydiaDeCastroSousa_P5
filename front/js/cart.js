let addProduct = JSON.parse(localStorage.getItem("product"));


let basketDisplay = async() => {
    if (addProduct) {
        await addProduct;
        console.log(addProduct);

        let cartItem = document.getElementById("cart__items");

        cartItem.innerHTML = addProduct.map((product) =>
            `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                <div class="cart__item__img">
                  <img src="${products.img}" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>Nom du produit</h2>
                    <p>Vert</p>
                    <p>42,00 €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`
        )

        let totalQuantity = document.getElementById("totalQuantity");
        let totalPrice = document.getElementById("totalPrice");


    }




}
basketDisplay();


/* let productStorage = "";
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
} */