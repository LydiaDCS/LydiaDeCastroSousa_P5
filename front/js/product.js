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

/*Je récupére mon produit depuis mon API*/
function fetchApiProduct() {
    fetch(`http://localhost:3000/api/products/${productId}`)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
        .then((data) => {
            kanape = data;
            console.log(kanape);
            displayProduct(kanape);
        })
        .catch((err) => {
            console.log(err);
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

        //Je récupère les données saisies par l'utilisateur dont mon Id, la couleur et la quantité
        let selectProduct = {
            id: productId,
            img: product.imageUrl,
            name: product.name,
            price: product.price,
            description: product.description,
            colors: selectColor.value,
            quantity: quantity.value,
        }
        verifyInvalidInput(selectProduct);

        //Fonction qui vérifie s'il manque les indications de couleurs et/ou quantité sinon je récupère le panier, j'ajoute et j'enregistre un produit dans le local storage
        function verifyInvalidInput() {
            if (selectProduct.colors == []) {
                alert('Veuillez choisir une couleur');
            } else if (selectProduct.quantity == 0 || selectProduct.quantity == "" || selectProduct.quantity > 100) {
                alert('Veuillez indiquer une quantité correcte')
            } else {
                //Je récupère mon produit du local storage
                addToLocalStorage(selectProduct);
                //Chargement de la page cart
                //window.location.assign("cart.html");
            }
        }

        //si mon panier est vide, je retourne un tableau vide sinon je recherche si mon produit a le même id et couleur
        function addToLocalStorage(product) {
            let basket = JSON.parse(localStorage.getItem("product"));
            console.log(basket);
            if (basket == null) {
                basket = [];
                basket.push(product);
                console.log(basket);
                localStorage.setItem("product", JSON.stringify(basket));

            } else if (basket) {
                let getProduct = basket.find(
                    (p) =>
                    selectProduct.id == p.id && selectProduct.colors == p.colors);
                if (getProduct) {
                    basket.push(getProduct);
                    getProduct.quantity++;

                    //J'envoie la nouvelle quantité dans le local storage
                    localStorage.setItem("product", JSON.stringify(basket));
                } else {

                    product.quantity;
                    basket.push(product);
                    //J'envoie un nouveau produit dans le local storage
                    localStorage.setItem("produit", JSON.stringify(basket));
                }
            };
        }
    })

}