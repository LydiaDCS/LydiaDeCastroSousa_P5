/* Je récupère mon panier du local storage */
let basket = JSON.parse(localStorage.getItem("product"));

/* J'affiche mon panier */
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

                //Fonction qui récupère les produits depuis l'API grâce à leur Id
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

                    //J'insère les informations de chaque produit dans la page panier
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

                    //Fonction qui permet de modifier la quantité d'un produit 
                    function modifyQuantity() {
                        //Je cible la quantité à modifier
                        quantityProduct = document.querySelectorAll(".itemQuantity");

                        quantityProduct.forEach((item) => {
                            // on attrape la div article englobant le bouton pour modifier la quantité
                            let cart = item.closest("article");
                            console.log(cart);
                            //on récupère l'id et la couleur de l'article grâce au dataset stocké dans cart
                            let idDelete = cart.dataset.id;
                            let colorDelete = cart.dataset.color;

                            //On déclare la variable qui va recevoir la nouvelle quantité
                            let newQuantity = "";
                            //J'écoute item lorsque celui-ci change
                            item.addEventListener("change", (event) => {
                                event.preventDefault();
                                console.log(item);
                                newQuantity = Number(item.value);
                                console.log(newQuantity);

                                //Je crée une boucle pour trouver le produit qui a été ciblé grâce à son id et sa couleur
                                for (let i = 0; i < basket.length; i++) {
                                    if (basket[i].id == idDelete && basket[i].colors == colorDelete) {
                                        basket[i].quantity = newQuantity;
                                    }
                                }
                                //J'appelle la fonction qui calcule le total des quantités et le total des prix
                                getTotals();

                                //Alerte pour avertir que le produit va être ajouté au panier 
                                alert("Votre quantité va être mise à jour");

                                //On enregistre le nouveau panier
                                localStorage.setItem("product", JSON.stringify(basket));
                            })
                        })
                    }
                    modifyQuantity();


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

//Je déclare mon objet contact pour récupérer les informations saisies par l'utilisateur 
let contact = {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    email: "",
};
//Je crée un tableau pour récupérer l'id des produits dans le panier
let products = [];

//Je récupère les balises d'input du formulaire 
let inputFirstName = document.getElementById("firstName");
let inputLastName = document.getElementById("lastName");
let inputAddress = document.getElementById("address");
let inputCity = document.getElementById("city");
let inputEmail = document.getElementById("email");

//Je récupère les balises contenant les erreurs s'il y en a
let errFirstName = document.getElementById("firstNameErrorMsg");
let errLastName = document.getElementById("lastNameErrorMsg");
let errAddress = document.getElementById("addressErrorMsg");
let errCity = document.getElementById("cityErrorMsg");
let errEmail = document.getElementById("emailErrorMsg");

//----------------------------------FIRST NAME---------------------------------------------------
//Je récupère le prénom via un addEventListener
inputFirstName.addEventListener("input", function(e) {
    validFirstName(e.target.value);
    contact.firstName = e.target.value;
});

// Fonction qui vérifie à l'aide d'une regex que le champ prénom soit renseigné correctement
function validFirstName(firstName) {
    let regexFirstName = /^[a-zA-Z\s\-]{2,21}$/g;
    let valid = false;
    let testName = regexFirstName.test(firstName);
    if (testName) {
        errFirstName.innerText = "";
        valid = true;
    } else {
        errFirstName.innerText = "Veuillez entrer un prénom valide";
        valid = false;
    }
    return valid;
}

//--------------------------------Last Name------------------------------------------------------
//Je récupère le nom via un addEventListener
inputLastName.addEventListener("input", function(e) {
    validLastName(e.target.value);
    contact.lastName = e.target.value;
});

// Fonction qui vérifie à l'aide d'une regex que le champ nom soit renseigné correctement
function validLastName(lastName) {
    let regexLastName = /^[a-zA-Z\s\-]{2,25}$/g;
    let valid = false;
    let testLastName = regexLastName.test(lastName);
    if (testLastName) {
        errLastName.innerText = "";
        valid = true;
    } else {
        errLastName.innerText = "Veuillez entrer un nom valide";
        valid = false;
    }
    return valid;
}

//--------------------------------ADDRESS-------------------------------------------------------
//Je récupère l'adresse via un addEventListener
inputAddress.addEventListener("input", function(e) {
    validAddress(e.target.value);
    contact.address = e.target.value;
});

// Fonction qui vérifie à l'aide d'une regex que le champ l'adresse soit renseigné correctement
function validAddress(address) {
    let regexAddress = /^[0-9]{0,10}[a-zA-Z\s\-]{2,30}$/g;
    let valid = false;
    let testAddress = regexAddress.test(address);
    if (testAddress) {
        errAddress.innerText = "";
        valid = true;
    } else {
        errAddress.innerText = "Veuillez entrer une adresse valide";
        valid = false;
    }
    return valid;
}
//--------------------------------City---------------------------------------------------------
//Je récupère la ville via un addEventListener
inputCity.addEventListener("input", function(e) {
    validCity(e.target.value);
    contact.city = e.target.value;
});

// Fonction qui vérifie à l'aide d'une regex que le champ ville soit renseigné correctement
function validCity(city) {
    let regexCity = /^[a-zA-Z\-\s]{2,30}$/g;
    let valid = false;
    let testCity = regexCity.test(city);
    if (testCity) {
        errCity.innerText = "";
        valid = true;
    } else {
        errCity.innerText = "Veuillez entrer une ville valide";
        valid = false;
    }
    return valid;
}

//--------------------------------Email-----------------------------------------------------------
//Je récupère l'email' via un addEventListener
inputEmail.addEventListener("input", function(e) {
    validEmail(e.target.value);
    contact.email = e.target.value;
});

// Fonction qui vérifie à l'aide d'une regex que le champ email soit renseigné correctement
function validEmail(email) {
    let regexEmail = /^[a-zA-Z0-9.!^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/g;
    let valid = false;
    let testEmail = regexEmail.test(email);
    if (testEmail) {
        errEmail.innerText = "";
        valid = true;
    } else {
        errEmail.innerText = "Veuillez entrer une adresse e-mail valide";
        valid = false;
    }
    return valid;
}

//Je cible le bouton de soumission du formulaire
let submitButton = document.getElementById("order");

//AddEventListener qui fonctionne seulement si tous les champs sont correctement remplis
submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    //Je vérifie si tous les champs sont valides
    if (validFirstName(contact.firstName) == false || validLastName(contact.lastName) == false || validCity(contact.city) == false || validAddress(contact.address) == false || validEmail(contact.email) == false) {
        return errAddress || errCity || errEmail || errFirstName || errLastName;
    } else {
        //J'enregistre dans le local storage les informations de l'utilisateur
        localStorage.setItem("contact", JSON.stringify(contact));

        //Je crée une boucle sur tous les produits du panier pour récupérer les id des produits
        for (let i = 0; i < basket.length; i++) {
            products.push(basket[i].id);
        }
        console.log(products);

        //Je crée mon objet pour envoyer mes informations utilisateurs et mes id à l'API
        const order = {
            contact: contact,
            products: products,
        }
        console.log(order);

        //Fonction fetch qui envoie à l'API les données saisies par l'utilisateur et son panier 
        //Option nécessaire à l'Api pour utiliser POST
        const apiId = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        }

        //Envoi des données au serveur
        fetch("https://api-kanap-eu.herokuapp.com/api/products/order", apiId)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((data) => {
                console.log(data);
                let orderId = data.orderId;
                console.log(orderId);
                window.location.assign("confirmation.html?id=" + orderId);
            })
    }
})

basketDisplay()