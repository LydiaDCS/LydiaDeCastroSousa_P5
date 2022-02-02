function idAppears() {
    let idProduct = document.querySelector("#orderId");
    console.log(idProduct);
    idProduct.innerText = localStorage.getItem("orderId");
    //Je supprime les informations stockées dans le local storage
    localStorage.clear();
}
idAppears();