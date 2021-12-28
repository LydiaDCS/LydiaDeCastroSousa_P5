//Récupération de l'id produit
let urlProduct = new URL("http://localhost:3000/api/products/${productId}");
let params = new URLSearchParams(window.location.search);
let productId = params.get("id");

console.log('id', productId);

let product = [];

let title = document.getElementById("title");
let imageUrl = document.getElementsByClassName("item_img");
let prix = document.getElementById("price");
let description = document.getElementById("description");
let couleurs = document.getElementById("colors");

// Je récupére mes produits depuis mon API
async function fetchApiProduct() {
    await fetch("http://localhost:3000/api/products/${productId}")
        .then((res) => res.json())
        .then((data) => (product = data));
}
fetchApiProduct();

console.log(product);

// Je modifie les elements de la page par rapport au produit sélectionné

const productForm = async() => {
    await fetchApiProduct();

    //Nom du produit
    title.innerHTML = "product.name";

    //Insérer image
    imageUrl.innerHTML = '<img src="${product.imageUrl}" alt="${product.altTxt}"></img>';

    //Prix
    prix.innerHTML = "product.price";

    //Description du produit
    description.innerHTML = "product.description";

    /*//Couleurs
    couleurs.innerHTML = '<option value="vert">vert</option>'
    '<option value="blanc">blanc</option>'*/
}
productForm();