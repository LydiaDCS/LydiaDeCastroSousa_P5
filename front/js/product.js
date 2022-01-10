/*Je récupère l'id produit depuis l'Url*/

let params = (new URL(document.location)).searchParams;
let productId = params.get("id");
console.log(productId);

/*Je crée un Array Kanape pour y mettre mes datas*/
let kanape = [];

/*Je déclare mes variables et fait le lien avec ma page html*/

let title = document.getElementById("title");
let imageUrl = document.querySelector(".item__img");
let prix = document.getElementById("price");
let description = document.getElementById("description");
let selectColor = document.querySelector("colors");
let quantity = document.getElementById("quantity");

/* 
let productStorage = {
    name: "",
    price: "",
    id: "",
    colors: [],
    quantity: 0,
    img: "",
    altTxt: "",
}; */

/*Je récupére mon produit depuis mon API*/
async function fetchApiProduct() {
    await fetch(`http://localhost:3000/api/products/${productId}`)
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function(data) {
            kanape = data;
            console.log(kanape);
            displayProduct(kanape);
        })
        .catch(function(err) {
            console.log('une erreur est survenue, err');
        });
}
fetchApiProduct();

/*Je modifie les éléments de la page par rapport au produit sélectionné*/

function displayProduct(product) {
    //Nom du produit
    title.innerHTML = product.name;

    //Insérer image
    imageUrl.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;

    //Prix
    prix.innerHTML = product.price;

    //Description du produit
    description.innerHTML = product.description;

    //Je crée une boucle pour le choix des Couleurs
    for (let i = 0; i < product.colors.length; i++) {
        selectColor = document.getElementById("colors");
        selectColor.innerHTML += `<option value="${product.colors[i]}">${product.colors[i]}</option>`;
    }

    /*Je déclare ma variable addBasket et fait le lien avec page HTML*/
    let addBasket = document.querySelector("#addToCart");

    //J'écoute le bouton et envoie les données saisies par l'utilisateur
    addBasket.addEventListener("click", (event) => {
        //pour empêcher le lien d'ouvrir un URL
        event.preventDefault();

        //J'envoie la couleur choisie
        product.color[i].addEventListener("click", (e) => {
            selectProduct.color = e.target.value;
        });

        //Je modifie la quantité du produit 
        quantity.addEventListener("change", (e) => {
            if (e.target.value != "" || e.target.value != 0) {
                selectProduct.quantity = e.target.value;
            }
        });

        //Je récupère les données saisies par l'utilisateur dont mon Id, la couleur et la quantité
        let selectProduct = {
            id: productId,
            img: product.imageUrl,
            name: product.name,
            price: product.price,
            description: product.description,
            color: [],
            quantity: "0",
        }

        //J'envoie la couleur choisie
        selectColor.addEventListener("click", (e) => {
            selectProduct.color = e.target.value;
        });

        //Je modifie la quantité du produit 
        quantity.addEventListener("change", (e) => {
            if (e.target.value != "" || e.target.value != 0) {
                selectProduct.quantity = e.target.value;
            }
        });

        //j'ajoute un produit dans le local storage en chaine de caractère
        localStorage.setItem("basket", JSON.stringify(selectProduct));

        //Je récupère mon produit du local storage en objet
        function getLocalStorage() {
            return JSON.parse(localStorage.getItems("basket"));
        }

        //ne fonctionne pas, supp ancien panier
        function addBasket(product) {
            let basket = getLocalStorage();
            basket.push(product);
            localStorage.setItem("product", JSON.stringify(selectProduct));
            //j'ajoute mon produit si celui-ci n'est pas vide
            if (basket) {
                let getProduct = basket.find((p) => p.id == selectProduct.id && p.colors == selectProduct.colors);
            }
            // si produit trouvé on met à jour sa quantité
            if (getProduct) {
                getProduct.quantity += selectProduct.quantity;
            }
            getLocalStorage();
        }
        //Chargement de la page cart
        // window.location.assign("cart.html"); 
    })
    ajouterAuPanier();
}