// Définition des variables 

const url = 'http://localhost:3000/api/products/';
let tableauKanap = JSON.parse(localStorage.getItem('listOfProduct'));
let itemsQuantityInput= document.getElementsByClassName('itemQuantity');
let totalPrice = 0;

// Fonction pour générer le code HTML

const creerHTML = (product, kanap) => {
    let cartSection = document.getElementById('cart__items');
    let cartArticle = document.createElement('article');

    cartSection.appendChild(cartArticle);
    cartArticle.className = 'cart__item';
    cartArticle.setAttribute('data-id', product._id);
    cartArticle.setAttribute('data-color', kanap.color);

    let divImage = document.createElement('div');
    divImage.className = 'cart__item__img';
    cartArticle.appendChild(divImage);

    let imageElt = document.createElement('img');
    imageElt.src = product.imageUrl;
    imageElt.alt = product.altTxt;
    divImage.appendChild(imageElt);

    let divContent = document.createElement('div');
    divContent.className = 'cart__item__content';
    cartArticle.appendChild(divContent);

    let description = document.createElement('div');
    description.className = 'cart__item__content__description';
    divContent.appendChild(description);

    let h2Elt = document.createElement('h2');
    h2Elt.innerHTML = product.name;
    description.appendChild(h2Elt);

    let pColor = document.createElement('p');
    pColor.textContent = kanap.color;
    description.appendChild(pColor);

    let pPrice = document.createElement('p');
    let pPriceValue = (parseFloat(product.price) * parseInt(kanap.quantity));
    pPrice.innerHTML = pPriceValue + ",00 €";
    description.appendChild(pPrice);

    let settings = document.createElement('div');
    settings.className = 'cart__item__content__settings';
    divContent.appendChild(settings);

    let settingsQuantity = document.createElement('div');
    settingsQuantity.className = 'cart__item__content__settings__quantity';
    settings.appendChild(settingsQuantity);

    let pQuantity = document.createElement('p');
    settingsQuantity.appendChild(pQuantity);
    pQuantity.innerHTML = "Qté : ";

    let inputQuantity = document.createElement('input');
    inputQuantity.type = 'number';
    inputQuantity.className = 'itemQuantity';
    inputQuantity.name = 'itemQuantity';
    inputQuantity.setAttribute('min', '1');
    inputQuantity.max = '100';
    inputQuantity.value = kanap.quantity;
    settingsQuantity.appendChild(inputQuantity);

    let settingsDelete = document.createElement('div');
    settingsDelete.className = 'cart__item__content__settings__delete';
    settings.appendChild(settingsDelete);

    let pDelete = document.createElement('p');
    pDelete.className = 'deleteItem';
    settingsDelete.appendChild(pDelete);
    pDelete.innerHTML = "Supprimer";
}

// Fonction pour calculer le prix total

const calcTotalPrice = (product, kanap) => {
    let findId = tableauKanap.find(el => product._id === el.id);
    let totalPriceCalc = (parseInt(product.price) * parseInt(kanap.quantity));
    totalPrice += totalPriceCalc;
    let idTotalPrice = document.getElementById("totalPrice");
    idTotalPrice.innerHTML = totalPrice;
}

// Fonction pour gérer le changement de quantité

const changementQuantity = (kanap) => {
    for (let i = 0; i < itemsQuantityInput.length; i++) {
        let itemQuantityInput = itemsQuantityInput[i]
        itemQuantityInput.addEventListener('change', () => {
            let IdOfQuantitysArticle = itemQuantityInput.closest('article').getAttribute('data-id');
            let ColorOfQuantitysArticle = itemQuantityInput.closest('article').getAttribute('data-color');
            let changedQuantity = itemQuantityInput.valueAsNumber;
            let findProduct = tableauKanap.find((kanap) => kanap.id==IdOfQuantitysArticle && kanap.originalQuantity !== changedQuantity && kanap.color==ColorOfQuantitysArticle);
            findProduct.quantity = changedQuantity;
            
            originalQuantity = changedQuantity;
            if (changedQuantity> 100 || changedQuantity <= 0 || changedQuantity != parseInt(changedQuantity)) {
                alert("Merci de bien vouloir sélectionner une quantité comprise entre 1 et 100.");
                return changedQuantity == undefined;
            } 
            localStorage.setItem('listOfProduct', JSON.stringify(tableauKanap));
            window.location.reload()
        })
    }
}

// Fonction pour gérer la suppression d'un canapé

function supprimerKanap() {
    const deleteSelectors = document.querySelectorAll('.deleteItem');
    for (let i = 0; i < deleteSelectors.length; i++) {
        let deleteSelector = deleteSelectors[i];
        deleteSelector.addEventListener("click", () => {
            let deleteId = deleteSelector.closest('article').getAttribute('data-id');
            let deleteColor = deleteSelector.closest('article').getAttribute('data-color');
            filterProduct = tableauKanap.filter((kanap) => (deleteId != kanap.id, deleteColor != kanap.color));
            tableauKanap = filterProduct;
            localStorage.setItem('listOfProduct', JSON.stringify(tableauKanap));
            alert('Votre article a bien été supprimé.');
            window.location.reload();
        })
    }
}

/**
* FORMULAIRE
*/

// Fonction pour vérifier la validité du formulaire

verifierFormulaire = () => {

    let otherRegExp = new RegExp("^[-a-zA-Z ]{1,30}[^0-9]$");
    let emailRegExp = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
    let addressRegExp = new RegExp("^['0-9 A-Za-z-]{2,50}$");
  
    let firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");
    let lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");
    let addressErrorMsg = document.querySelector("#addressErrorMsg");
    let cityErrorMsg = document.querySelector("#cityErrorMsg");
    let emailErrorMsg = document.querySelector("#emailErrorMsg");
  
    document.getElementById("firstName").addEventListener("change", () => {
        if ((otherRegExp.test(firstName.value)) == true) {
            firstNameErrorMsg.innerHTML = "";
        } else {
            firstNameErrorMsg.innerHTML = "Veuillez vérifier l'exactitude de votre saisie";
            return firstName.value = " ";
        }
    })
    document.getElementById("lastName").addEventListener("change", () => {
        if ((otherRegExp.test(lastName.value)) == true) {
            lastNameErrorMsg.innerHTML = "";
        } else {
            lastNameErrorMsg.innerHTML = "Veuillez vérifier l'exactitude de votre saisie";
            return lastName.value = " ";
        }
    })
    document.getElementById("address").addEventListener("change", () => {
        if (addressRegExp.test(address.value) == true) {
            addressErrorMsg.innerHTML = "";
        } else {
            addressErrorMsg.innerHTML = "Veuillez préciser le numéro, type de voie et nom de voie";
            return address.value = " ";
        }
    })
    document.getElementById("city").addEventListener("change", () => {
        if (otherRegExp.test(city.value) == true) {
            cityErrorMsg.innerHTML = "";
        } else {
            cityErrorMsg.innerHTML = "Veuillez vérifier l'exactitude de votre saisie";
            return city.value = " ";
        }
    })
    document.getElementById("email").addEventListener("change", () => {
        if (emailRegExp.test(email.value) == true) {
            emailErrorMsg.innerHTML = "";
        } else {
            emailErrorMsg.innerHTML = "Veuillez noter une adresse email valide";
            return email.value = " ";
        }
    })
}

// Fonction pour envoyer le formulaire

envoiFormulaire = () => {
    let form = document.querySelector(".cart__order__form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (tableauKanap != null) {
            // On crée un tableau de produits
            let products = [];
            for (let listOfProduct of tableauKanap) {
                products.push(listOfProduct.id)
            }
            // On crée un objet avec les champs saisis dans le formulaire
            let contact = {
                'firstName': document.getElementById('firstName').value,
                'lastName': document.getElementById('lastName').value,
                'address': document.getElementById('address').value,
                'city': document.getElementById('city').value,
                'email': document.getElementById('email').value,
            };
            // On crée un objet qui contient le contact et la liste de produits du panier
            let order = JSON.stringify({
                contact: contact,
                products: products,
            });
            
            fetch(url + "order", {
                method: 'POST',
                body: order,
                headers: {
                'Accept': 'application/json',
                'content-type': 'application/json',
                },
            })
            .then(res =>
                res.json()
            )
            .then((data) => {
                localStorage.clear();
                let orderId = data.orderId;
                document.location.href = "./confirmation.html?order=" + orderId;
            })
            .catch(error => console.log('error', error));
        } else {
            alert("Erreur lors de la commande. Merci de vérifier votre panier.");
            return
        }
    })
}

// Fonction pour afficher toute la page

(affichagePanier = async () => {
    // Si le panier est vide
    if (!tableauKanap || tableauKanap == 0) {
        let subtitle1 = document.createElement('h1');
        subtitle1.setAttribute('style', 'text-align:center');
        subtitle1.innerHTML = "est vide."
        cart__items.appendChild(subtitle1);
      
        let subtitle2 = document.createElement('h2');
        subtitle2.setAttribute('style', 'text-align:center');
        subtitle2.innerHTML = "Avez-vous vu notre page d'accueil ?"
        cart__items.appendChild(subtitle2);
    // Si le panier n'est pas vide
    } else {
        for (let kanap of tableauKanap) {
            const response = await fetch(url + kanap.id)
            .catch((error) => { console.log("Erreur : Impossible de se connecter", error); })
            const product = await response.json()
            .catch((error) => { console.log("Erreur : Impossible de récupérer les produits", error) })
            creerHTML(product, kanap)
            calcTotalPrice(product, kanap)
            changementQuantity(kanap)
            supprimerKanap()
            verifierFormulaire()
            envoiFormulaire()
        }
    } 
})()




