//Je récupère mon panier du local storage
let basket = JSON.parse(localStorage.getItem("product"));

//J'affiche mon panier
let basketDisplay = async() => {
    if (basket) {
        /*   await basket;
          console.log(basket); */

        for (let product of basket) {
            let cartItem = document.getElementById("cart__items");
            //refaire fetch avec id et recuperer objet avec info
            //Je récupére mon produit depuis mon API
            function fetchApiProduct() {
                fetch(`http://localhost:3000/api/products/${productId}`)
                    .then((res) => {
                        if (res.ok) {
                            return res.json();
                        }
                    })
                    .then((data) => {
                        console.log(data);
                        displayProduct(data);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
            fetchApiProduct();

            cartItem.innerHTML +=
                `<article class="cart__item" data-id="${product.id}" data-color="${product.colors}">
                    <div class="cart__item__img">
                      <img src="${product.img}" alt="${product.description}">
                    </div>
                    <div class="cart__item__content">
                      <div class="cart__item__content__description">
                        <h2>${product.name}</h2>
                        <p>${product.colors}</p>
                        <p>${product.price} €</p>
                      </div>
                      <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                          <p>Qté :</p>
                          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                        </div>
                        <div class="cart__item__content__settings__delete">
                          <p class="deleteItem">Supprimer</p>
                        </div>
                      </div>
                    </div>
                  </article>`;

            //Afficher la quantité et le prix total /*pb ca n'affiche que dernier produit que je mets*/

            let totalQuantity = document.getElementById("totalQuantity");
            totalQuantity.innerText = Number(product.quantity); //addeventlistener change
            let totalPrice = document.getElementById("totalPrice");
            totalPrice.innerText = product.quantity * product.price;

            //Je change la quantité du produit lorsque la quantité est modifiée

            //je supprime un produit du local storage
            /*let deleteItem = document.getElementsByClassName("deleteItem");
            deleteItem.addEventListener("click", () => {
                localStorage.removeItem("product");
                console.log("je suis la");
            })*/

            /*modifier prix et validation formulaire*/
        }
    }
    // si mon panier est vide alors la quantité et le prix sont 0 et message "Aucun article dans le panier"
    if (basket == null) {
        document.getElementById("totalQuantity").innerHTML = 0;
        document.getElementById("totalPrice").innerHTML = 0;
        document.getElementById("cart__items").innerHTML +=
            `<h2 style="text-align:center; margin-bottom:80px;">Vous n'avez aucun article dans votre panier</h2>`
    }
}
basketDisplay(basket);


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