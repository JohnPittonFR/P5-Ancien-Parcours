// Définition des variables et récupération de l'id passé dans l'url

const url = 'http://localhost:3000/api/products/'
let pageUrl = new URL(location.href);
let productId = pageUrl.searchParams.get('productId');

// Fonction de remplissage HTML de la fiche produit

const remplirFiche = (product) => {
    let imageClass = document.getElementsByClassName('item__img');
    let imageProduct = document.createElement("img");
    imageClass[0].appendChild(imageProduct);
    imageProduct.src = product.imageUrl;
    imageProduct.alt = product.altTxt;
    let h1Product = document.getElementById('title');
    h1Product.innerHTML = product.name;
    let priceProduct = document.getElementById('price');
    priceProduct.innerHTML = parseInt(product.price);
    let description = document.getElementById('description');
    description.innerHTML = product.description;
    let selectOption = document.getElementById('colors').options;
    for (colors of product.colors) {
        selectOption.add(new Option(colors, colors))
    };
    let quantity = document.getElementById('quantity');
}

// Fonction qui gère l'ajout au panier et tout ce qui en découle

const ajoutAuPanier = (product) => {
    let addProduct = document.getElementById('addToCart');
    addProduct.addEventListener('click', function () {
        // On crée un obje kanap qui contient l'article que l'on veut ajouter au panier
        let tableauKanap = [];
        let kanap = {
            id: productId,
            quantity: parseInt(document.getElementById('quantity').value),
            color: document.getElementById('colors').value
        }
        // On vérifie si une couleur a été choisie et si la quantité choisie est correcte
        if (kanap.color == 0) {
            alert('Merci de sélectionner une teinte.')
            return kanap == undefined;
        } else if (kanap.quantity > 100 ||
            kanap.quantity <= 0 ||
            kanap.quantity != parseInt(kanap.quantity)) {
            alert("Merci de bien vouloir sélectionner une quantité comprise entre 1 et 100.");
            return kanap == undefined;
        }
        // S'il y a déjà un panier dans le local storage, on le stocke dans tableauKanap
        if (localStorage.getItem('listOfProduct')) {
            tableauKanap = JSON.parse(localStorage.getItem('listOfProduct'))
            let foundProduct = tableauKanap.find(el => el.id == kanap.id && el.color == kanap.color);
            // Si un article avec le meme id et la même couleur est déjà présent, on change la quantité
            if (foundProduct != undefined) {
                let finalSelection = (parseInt(foundProduct.quantity) + parseInt(kanap.quantity));
                foundProduct.quantity = finalSelection;
                alert("Ce produit a déjà été ajouté. La quantité sélectionnée a été ajouté");
            }
            // Sinon, on ajoute le produit dans tableauKanap
            else {
                tableauKanap.push(kanap);
                alert("Votre produit a bien été ajouté au panier");
                saveTableauKanap(tableauKanap);
            }
            saveTableauKanap(tableauKanap);
        // S'il n'y a pas de panier dans le localstorage, on ajoute le produit dans tableauKanap
        } else {
            tableauKanap.push(kanap);
            alert("Votre produit a bien été ajouté au panier");
            saveTableauKanap(tableauKanap);
        }
    })
}

// Fonction de sauvegarde du panier en localstorage

const saveTableauKanap = (tableauKanap) => {
    localStorage.setItem('listOfProduct', JSON.stringify(tableauKanap));
}


// Récupération du produit voulu en appelant l'API, et mise en place de la page 

(getDetailsProduit = async () => {
    const response = await fetch(url + productId)
    .catch((error) => { console.log("Erreur : Impossible de se connecter", error); })
    const product = await response.json()
    .catch((error) => { console.log("Erreur : Impossible de récupérer les produits", error) })
    remplirFiche(product)
    ajoutAuPanier(product)
})()

    /**
     * Autre méthode
     */

    // fetch(url + productId)
    //     .catch(function(err){
    //         console.log(err, "probleme de connexion à l'api")
    //     })
    //     .then(function (res) {
    //         if (res.ok) {
    //             console.log('res', res);
    //             return res.json()
    //         }
    //     })
    //     .catch(function(err){
    //         console.log(err, "erreur de récupération des données")
    //     })
    //     .then(function (product) {
    //         remplirFiche(product);
    //     })


