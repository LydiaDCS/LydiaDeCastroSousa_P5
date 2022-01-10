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
let quantity = document.getElementById("quantity");


let product = [];
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


// Je récupére mon produit depuis mon API
async function fetchApiProduct() {
    await fetch(`http://localhost:3000/api/products/${productId}`)
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function(data) {
            product = data;
            console.log(product);
            displayProduct(product);
        })
        .catch(function(err) {
            console.log('une erreur est survenue, err');
        });

}
fetchApiProduct();


// Je modifie les elements de la page par rapport au produit sélectionné

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
        couleurs = document.getElementById("colors");
        couleurs.innerHTML += `<option value="${product.colors[i]}">${product.colors[i]}</option>`;
    }

    //Je déclare ma variable AjouterAuPanier et fait le lien avec page HTML
    let ajouterAuPanier = document.querySelector("#addToCart");

    //J'écoute le bouton et envoie les données saisies par l'utilisateur
    ajouterAuPanier.addEventListener("click", (event) => {
        //pour empêcher le lien d'ouvrir un URL
        event.preventDefault();

        let selectProduct = {
            id: productId,
            name: product.name,
            price: product.price,
            img: product.imageUrl,
            color: product.colors,
            quantity: product.quantity
        }

        //J'envoie la couleur choisie
        colors.addEventListener("click", (e) => {
            product.colors = e.target.value;
        });

        //Je modifie la quantité du produit 
        quantity.addEventListener("change", (e) => {
            if (e.target.value != "" || e.target.value != 0) {
                productStorage.quantity = e.target.value;
            }
        });

        //j'ajoute un produit dans le local storage en chaine de caractère
        localStorage.setItem("basket", JSON.stringify(productStorage));

        //Je récupère mon produit du local storage en objet
        function getLocalStorage() {
            return JSON.parse(localStorage.getItems("product"));
        }

        //ne fonctionne pas, supp ancien panier
        function addBasket(product) {
            let basket = getLocalStorage();
            basket.push(product);
            localStorage.setItem("product", JSON.stringify(productStorage));
            //j'ajoute mon produit si celui-ci n'est pas vide
            if (basket) {
                let getProduct = basket.find((p) => p.id == productStorage.id && p.colors == productStorage.colors);
            }
            // si produit trouvé on met à jour sa quantité
            if (getProduct) {
                getProduct.quantity += productStorage.quantity;
            }
            getLocalStorage();
        }
        //Chargement de la page cart
        // window.location.assign("cart.html");
    })

    ajouterAuPanier();


}