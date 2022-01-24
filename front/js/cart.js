//Je récupère mon panier du local storage
let basket = [];
basket = JSON.parse(localStorage.getItem("product"));

//Je récupère les informations saisies par l'utilisateur
let contact = {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    email: "",
};

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

                /*  //Si je modifie la quantité, je mets à jour la quantité dans le local storage et j'affiche le nouveaux prix
                function modifieQuantity() {
                    let quantityModif = document.querySelectorAll(".itemQuantity");
                    for (let k = 0; k < quantityModif.lengh; k++) {
                        quantityModif[k].addEventListener("change", (event) => {
                            event.preventDefault();

                            //Sélection de l'élément à modif selon id et couleur
                            let qtModif = basket[k].product.quantity;
                            console.log(qtModif);
                            let quantityModifValue = parseInt(quantityModif[k]);
                            console.log(quantityModifValue);

                            let findresult = basket.find((el) => el.quantityModifValue !== qtModif);
                            findresult.quan

                        })
                    }
                }
                modifieQuantity();

                let quantity = productBasket.quantity;
                console.log(quantity);

                function recal(productBasket) {
                    productBasket.price = productBasket.price * productBasket.quantity;
                }

                document.querySelectorAll(".itemQuantity").forEach(element => {
                    element.addEventListener("change", (recal) => {
                        console.log("jesuisla");
                        basket;
                        productBasket.quantity.innerText = product.quantity;
                        localStorage.setItem("product", JSON.stringify(basket));
                    })

                })

                //Je définie la quantité total de produits dans le panier
                let totalQuantity = 0;
                for (let i = 0; i < quantity.lengh; i++) {
                    totalQuantity += parseInt(quantity[i]);
                }

                let productTotalQuantity = document.getElementById("totalQuantity");
                productTotalQuantity.innerHTML = totalQuantity;
                console.log(totalQuantity);


 */
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

            /* 
                        //Je supprime un produit du local storage
                        function deleteProduct() {
                            let deleteButton = document.getElementsByClassName("deleteItem");

                            for (let j = 0; j < deleteButton.length; j++) {
                                deleteButton[j].addEventListener("click", (event) => {
                                    event.preventDefault();

                                    //Sélection de l'élément à supprimer en fonction de son id et de sa couleur
                                    let idDelete = basket[j].product.id;
                                    console.log(idDelete);
                                    let colorDelete = basket[j].product.colors;

                                    basket = basket.filter(el => el.product.id !== idDelete || el.product.colors !== colorDelete);

                                    localStorage.setItem("product", JSON.stringify(basket));

                                    //Alerte produit supprimé et actualisé
                                    alert("Ce produit a bien été supprimé du panier");
                                    window.location();

                                })
                            }

                        }
                        deleteProduct(); */

        }



        //-------------------------------Formulaire Utilisateur--------------------------------------
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


        //----------------------------------FIRST NAME--------------------------------------
        //Je récupère le prénom via un addEventListener
        inputFirstName.addEventListener("input", function(e) {
            validFirstName(e.target.value);
            contact.firstName = e.target.value;
        });

        // Fonction qui vérifie à l'aide d'une regex que le champ prénom soit renseigné correctement
        function validFirstName(firstName) {
            if (firstName.lengh == 0) {
                errFirstName.innerHTML = "Votre prénom n'est pas renseigné!";
            } else if (/[0-9]/.test(firstName)) {
                errFirstName.innerHTML = "Votre prénom ne peut pas contenir de chiffre";
            } else {
                errFirstName.innerHTML = "";
                return /^[a-zA-Z\-]+$/.test(firstName);

            }
        }

        //--------------------------------Last Name-----------------------------------------
        //Je récupère le nom via un addEventListener
        inputLastName.addEventListener("input", function(e) {
            validLastName(e.target.value);
            contact.lastName = e.target.value;
        });

        // Fonction qui vérifie à l'aide d'une regex que le champ nom soit renseigné correctement
        function validLastName(lastName) {
            if (lastName.lengh == 0) {
                errLastName.innerHTML = "Votre nom n'est pas renseigné!";
            } else if (/[0-9]/.test(lastName)) {
                errLastName.innerHTML = "Votre nom ne peut pas contenir de chiffre";
            } else {
                errlastName.innerHTML = "";
                return /^[a-zA-Z\-]+$/.test(lastName);

            }
        }

        //--------------------------------ADDRESS-----------------------------------------
        //Je récupère l'adresse via un addEventListener
        inputAddress.addEventListener("input", function(e) {
            validAddress(e.target.value);
            contact.address = e.target.value;
        });

        // Fonction qui vérifie à l'aide d'une regex que le champ l'adresse soit renseigné correctement
        function validAddress(address) {
            if (address.lengh == 0) {
                errAddress.innerHTML = "Votre adresse n'est pas renseignée!";
            } else {
                errAddress.innerHTML = "";
                return /^[a-zA-Z\-]+$/.test(address);
            }
        }

        //--------------------------------City-----------------------------------------
        //Je récupère la ville via un addEventListener
        inputCity.addEventListener("input", function(e) {
            validCity(e.target.value);
            contact.city = e.target.value;
        });

        // Fonction qui vérifie à l'aide d'une regex que le champ ville soit renseigné correctement
        function validCity(city) {
            if (city.lengh == 0) {
                errCity.innerHTML = "Votre ville n'est pas renseignée!";
            } else if (/[0-9]/.test(city)) {
                errCity.innerHTML = "Votre ville ne peut pas contenir de chiffre";
            } else {
                errCity.innerHTML = "";
                return /^[a-zA-Z\-]+$/.test(city);
            }
        }

        //--------------------------------Email-----------------------------------------
        //Je récupère l'email' via un addEventListener
        inputEmail.addEventListener("input", function(e) {
            validEmail(e.target.value);
            contact.email = e.target.value;
        });

        // Fonction qui vérifie à l'aide d'une regex que le champ email soit renseigné correctement
        function validEmail(email) {
            let emailRegExp = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
            if (email.lengh == 0) {
                errEmail.innerHTML = "Votre email n'est pas renseignée!";
            } else if (emailRegExp.test(email)) {
                errEmail.innerHTML = "";
            } else {
                errEmail.innerHTML = "Votre email n'est pas valide!";
            }
        }

        //Je récupère le bouton de soumission du formulaire
        submitButton = document.querySelector("#order");
        //AddEventListener qui fonction seulement si tous les champs sont correctement remplis
        submitButton.addEventListener("click", (e) => {
            e.preventDefault();

            //Fonction fetch qui envoie à l'API les données saisies par l'utilisateur et son panier 
            async function sendData() {
                await fetch("https://api-kanap-eu.herokuapp.com/api/products/order", {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(contact, basket)
                });

            }


        })
        sendData();

    }
}

basketDisplay()