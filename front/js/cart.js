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

            function displayRestProduct(kanap) {
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
                            <p>${kanap.price} €</p>
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

                let price = kanap.price;
                console.log(price);
                console.log(product.quantity);
                let quant = document.querySelector(".itemQuantity").value;

                //J'affiche le prix selon la quantité 
                quant.addEventListener("change", () => {
                    price.innerText = kanap.price * quant.value;
                })

                console.log(product.quantity);
                console.log(quant);

                /* 
                                //J'affiche la quantité totale 
                                quantity.addEventListener("change", (event) => {
                                    event.preventDefault();
                                    document.getElementById("totalQuantity").innerText = Number(product.quantity) + Number(totalQuantity);
                                })
                 */
                /* //J'afffiche le prix total
                price.addEventListener("change", () => {
                    document.getElementById("totalPrice").innerText = Number(totalPrice) + Number(price);
                })*/


                /*  totalQuantity.innerText = parseInt(totalQuantity) + parseInt(product.quantity); //addeventlistener change 
                 console.log(product.quantity);
                 let totalPrice = document.getElementById("totalPrice");
                 totalPrice.innerText = parseInt(product.quantity) * parseInt(product.price); */
            }







            /*   //je supprime un produit du local storage
              let deleteItem = document.getElementsByClassName("deleteItem");
              deleteItem.addEventListener("click", () => {
                  localStorage.removeItem("product");
                  console.log("je suis la");
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