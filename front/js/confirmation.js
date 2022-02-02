//Je récupère mon panier du local storage
JSON.parse(localStorage.getItem("product"));
//Je récupère mon objet contact du local storage
JSON.parse(localStorage.getItem("contact"));



function idAppears() {
    let id = document.getElementById("orderId");
    id.innerText = localStorage.getItem("orderId");
    console.log(localStorage.setItem("orderId", JSON.stringify(orderId)));
    localStorage.clear();
}
idAppears();