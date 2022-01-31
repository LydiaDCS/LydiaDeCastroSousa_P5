//Je récupère mon panier du local storage
let basket = JSON.parse(localStorage.getItem("product"));

//Je récupère les informations saisies par l'utilisateur
let contact = {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    email: "",
};

//Je crée un tableau pour récupérer les id des produits
let arrayId = [];

//J'affiche mon panier
let basketDisplay = () => {
    // si mon panier est vide alors la quantité et le prix sont 0 et message "Aucun article dans le panier"
    if (basket == null || basket == 0) {
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

            //Fonction qui récupère l'Id du produit depuis l'API
            function fetchApiProduct() {
                fetch(`http://localhost:3000/api/products/` + product.id)
                    .then((res) => {
                        if (res.ok) {
                            return res.json();
                        }
                    })
                    .then((data) => {
                        console.log(data);
                        //J'affiche toutes les caractéristiques des produits
                        displayRestProduct(data);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
            fetchApiProduct();

            //J'affiche mes produits présents dans le localStorage
            function displayRestProduct(kanap) {

                //Je crée un nouvel objet en récupérant mes informations du local storage et en ajoutant les autres informations dont le prix
                let productBasket = {
                    id: product.id,
                    name: kanap.name,
                    imageUrl: kanap.imageUrl,
                    altText: kanap.altText,
                    quantity: product.quantity,
                    colors: product.colors,
                    price: kanap.price,
                }
                console.log(productBasket);

                /*  //J'affiche le prix selon la quantité enregistrée dans le local storage
                 productBasket.price = productBasket.price * productBasket.quantity;
                 console.log(productBasket.price); */

                let cartItem = document.getElementById("cart__items");

                cartItem.innerHTML +=
                    `<article class="cart__item" data-id="${productBasket.id}" data-color="${productBasket.colors}">
                        <div class="cart__item__img">
                          <img src="${productBasket.imageUrl}" alt="${productBasket.altText}">
                        </div>
                        <div class="cart__item__content">
                          <div class="cart__item__content__description">
                            <h2>${productBasket.name}</h2>
                            <p>${productBasket.colors}</p>
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

                //Fonction qui calcule le total des quantités et le total des prix
                function getTotals() {
                    //Je crée mes variables en ciblant le texte HTML
                    let quantityProduct = document.getElementsByClassName("itemQuantity");
                    console.log(quantityProduct);
                    let productTotalQuantity = document.getElementById("totalQuantity");
                    let priceDiv = document.querySelectorAll(".cart__item__content__description p:last-child");
                    let productTotalPrice = document.getElementById("totalPrice");

                    //J'initialise mes variables de quantités totales
                    let totalQtt = 0;
                    let totalPrice = 0;

                    //Je crée une boucle qui parcourt chaque quantity de produit
                    for (let i = 0; i < quantityProduct.length; ++i) {
                        let quantity = quantityProduct[i].valueAsNumber;
                        console.log(quantity);
                        let price = priceDiv[i].innerText.replace('€', '');

                        //Je convertis price en nombre
                        let priceNumber = Number(price);
                        console.log(priceNumber);

                        totalQtt += quantity;
                        totalPrice += priceNumber * quantity;
                    }

                    productTotalQuantity.innerText = totalQtt;
                    productTotalPrice.innerText = totalPrice;
                }
                getTotals();

                //Modification d'une quantité d'un produit ------------ Revoir
                function modifyQuantity() {
                    //Je cible la quantité à modifier
                    let quantityProduct = document.querySelectorAll(".itemQuantity");

                    quantityProduct.forEach((item) => {

                        //J'écoute item lorsque celui-ci change
                        item.addEventListener("change", () => {

                            // on attrape la div article englobant le bouton pour modifier la quantité
                            let cart = item.closest("article");
                            console.log(cart);

                            //on récupère l'id et la couleur de l'article grâce au dataset stocké dans cart
                            let idDelete = cart.dataset.id;
                            let colorDelete = cart.dataset.color;

                            //Je trouve mon produit le panier et j'augmente sa quantité si je le trouve
                            const find = basket.find((item) => item.id == idDelete && item.colors == colorDelete);
                            if (find) {
                                let totalQtt = 0;
                                find.quantityProduct = totalQtt;
                            }
                            //On enregistre le nouveau panier
                            localStorage.setItem("product", JSON.stringify(basket));

                            //Appeler la fonction qui calcule le total des quantités et le total des prix
                            getTotals();

                            //Alerte pour avertir que le produit va être ajouté au panier et rechargement de la page 
                            alert("Ce produit va être ajouté à votre panier");

                        })
                    })
                }
                modifyQuantity();

                //Fonction qui supprime un produit 
                function deleteProduct() {
                    //Je cible mes boutons supprimer
                    let deleteButton = document.querySelectorAll(".deleteItem");

                    // boucle sur les boutons supprimer
                    deleteButton.forEach((item) => {

                        // écoute du clic le bouton supprimer ciblé
                        item.addEventListener("click", (event) => {

                            // on attrape la div article englobant le bouton supprimer 
                            let cart = item.closest("article");

                            //  on récupère l'id et la couleur de l'article grâce au dataset stocké dans cart
                            let idDelete = cart.dataset.id;
                            let colorDelete = cart.dataset.color;

                            // on retire l'élément cliqué du tableau basket
                            basket = basket.filter((element) => element.id !== idDelete || element.colors !== colorDelete);

                            //on push basket dans le storage
                            localStorage.setItem("product", JSON.stringify(basket));

                            // on retire la div cart du dom
                            cart.remove();

                            //Appeler la fonction qui calcule le total des quantités et le total des prix
                            getTotals();

                            //Alerte pour avertir que le produit va être supprimé du panier et rechargement de la page 
                            alert("Ce produit va être supprimé de votre panier");
                            location.reload();
                        });
                    });
                }

                deleteProduct();

            }


        }


    }

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
        errLastName.innerHTML = "";
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
//AddEventListener qui fonctionne seulement si tous les champs sont correctement remplis
submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    let message = "";

    //Fonction qui envoie les id de tous les produits dans un tableau products
    function collectDatas() {
        for (let product of basket) {
            arrayId.push(product.id);
        }
    }

    //Fonction qui vérifie si tous les champs sont valides
    function verify() {
        if (validFirstName && validLastName && validCity && validAddress && validEmail) {
            message.innerHTML = "Votre commande est en cours";
            collectDatas();
            sendData();
            window.location.assign("confirmation.html");
        } else {
            message.innerHTML = "Merci de remplir correctement le formulaire pour passer votre commande"
        }
    }

    //Fonction fetch qui envoie à l'API les données saisies par l'utilisateur et son panier 
    async function sendData() {
        await fetch("https://api-kanap-eu.herokuapp.com/api/products/order", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact, arrayId)
        });

    }
    localStorage.setItem("contact", JSON.stringify(contact));
    localStorage.setItem("arrayId", JSON.stringify(arrayId));
})

basketDisplay()