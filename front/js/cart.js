//Je récupère mon panier du local storage
let basket = JSON.parse(localStorage.getItem("product"));

//J'affiche mon panier
let basketDisplay = () => {
    // si mon panier est vide alors la quantité et le prix sont 0 et message "Aucun article dans le panier"
    if (basket == null) {
        document.getElementById("totalQuantity").innerText = 0;
        document.getElementById("totalPrice").innerText = 0;
        document.getElementById("cart__items").innerHTML +=
            `<h2 style="text-align:center; margin-bottom:80px;">Vous n'avez aucun article dans votre panier</h2>`
    }
    // Sinon pour chaque produit dans le panier, je récupére l'Id depuis mon API pour ensuite afficher toutes les caractéristiques des produits
    else {
        for (let product of basket) {
            console.log(basket);
            console.log(product);
            console.log(product.id);

            function fetchApiProduct() {
                fetch(`http://localhost:3000/api/products/` + product.id)
                    .then((res) => {
                        if (res.ok) {
                            return res.json();
                        }
                    })
                    .then((data) => {
                        console.log(data);
                        displayRestProduct(data);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
            fetchApiProduct();

            //J'affiche mes produits présents dans le localStorage
            function displayRestProduct(kanap) {

                //Je crée un nouvel objet en récupérant mes informations du local storage et en ajoutant le prix
                let productBasket = {
                    id: product.id,
                    quantity: product.quantity,
                    colors: product.colors,
                    price: kanap.price,
                }
                console.log(productBasket);

                //J'affiche le prix selon la quantité enregistrée dans le local storage
                productBasket.price = kanap.price * product.quantity;
                console.log(productBasket.price);

                let cartItem = document.getElementById("cart__items");

                cartItem.innerHTML +=
                    `<article class="cart__item" data-id="${product.id}" data-color="${product.colors}">
                        <div class="cart__item__img">
                          <img src="${kanap.imageUrl}" alt="${kanap.altText}">
                        </div>
                        <div class="cart__item__content">
                          <div class="cart__item__content__description">
                            <h2>${kanap.name}</h2>
                            <p>${product.colors}</p>
                            <p>${productBasket.price} €</p>
                          </div>
                          <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                              <p>Qté :</p>
                              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productBasket.quantity}">
                            </div>
                            <div class="cart__item__content__settings__delete">
                              <p class="deleteItem">Supprimer</p>
                            </div>
                          </div>
                        </div>
                      </article>`;

                //Si je modifie la quantité, je mets à jour la quantité dans le local storage et j'affiche le nouveaux prix
                console.log(productBasket.quantity);

                let quantity = document.getElementsByClassName("itemQuantity");
                console.log(quantity);


                /* quantity.addEventListener("change", (recal) => {
                    console.log("jesuisla");
                    basket;
                    productBasket.quantity += quantity[i];
                    localStorage.setItem("product", JSON.stringify(basket));


                }) */


                function recal(productBasket) {
                    productBasket.price = productBasket.price * productBasket.quantity;
                }


                document.querySelectorAll(".itemQuantity").forEach(element => {
                    element.addEventListener("change", (recal) => {
                        basket;
                        productBasket.quantity.innerText = product.quantity;
                        localStorage.setItem("product", JSON.stringify(basket));
                    })

                })


                /* //J'affiche la quantité totale 
                 quantity.addEventListener("change", (event) => {
                     event.preventDefault();
                     document.getElementById("totalQuantity").innerText = Number(product.quantity) + Number(totalQuantity);
                     localStorage.setItem("element", JSON.stringify(basket));
                     JSON.parse(localStorage.getItem("product"));
                     console.log("yes");

                 }) */

                /* //J'afffiche le prix total
                price.addEventListener("change", () => {
                    document.getElementById("totalPrice").innerText = Number(totalPrice) + Number(price);
                })*/


                /*  totalQuantity.innerText = parseInt(totalQuantity) + parseInt(product.quantity); //addeventlistener change 
                 console.log(product.quantity);
                 let totalPrice = document.getElementById("totalPrice");
                 totalPrice.innerText = parseInt(product.quantity) * parseInt(product.price); */
            }


            /*   //je supprime un produit du local storage -- utiliser closest ?
                          let deleteItem = document.getElementsByClassName("deleteItem");
                          deleteItem.addEventListener("click", () => {
                              if (quantity.id && quantity.colors){
            localStorage.removeItem("product");
                              console.log("je suis la");
                              }
                              
                          }) */
        }



        /* //Formulaire Utilisateur
        //Je récupère les balises d'input du formulaire
        inputFirstName = document.querySelectorAll(".cart__order__form__question input")[0];
        inputLastName = document.querySelectorAll(".cart__order__form__question input")[1];
        inputAddress = document.querySelectorAll(".cart__order__form__question input")[2];
        inputCity = document.querySelectorAll(".cart__order__form__question input")[3];
        inputEmail = document.querySelectorAll(".cart__order__form__question input")[4];

        //Je récupère les balises contenant les erreurs s'il y en a
        errFirstName = document.querySelectorAll(".cart__order__form__question p")[0];
        errLastName = document.querySelectorAll(".cart__order__form__question p")[1];
        errAddress = document.querySelectorAll(".cart__order__form__question p")[2];
        errCity = document.querySelectorAll(".cart__order__form__question p")[3];
        errEmail = document.querySelectorAll(".cart__order__form__question p")[4];

        //Je récupère le bouton de soumission du formulaire
        submitButton = document.querySelector("#order"); */

    }
}

basketDisplay();