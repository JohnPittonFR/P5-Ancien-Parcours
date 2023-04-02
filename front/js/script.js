// Définition des variables
const url = 'http://localhost:3000/api/products';

// Fonction d'affichage des produits
let afficheProduits =(products) => {
    const sectionElt = document.getElementById("items");
    for (let product of products){
        let linkElt = document.createElement("a"); 
        linkElt.href = "./product.html?productId="+ product._id;
        sectionElt.appendChild(linkElt); 
        let articleElt = document.createElement('article'); 
        linkElt.appendChild(articleElt);

        let imageElt = document.createElement('img');
        imageElt.setAttribute ("src", product.imageUrl);
        imageElt.setAttribute ("alt", product.altTxt);
        articleElt.appendChild(imageElt); 

   
        let h3Elt = document.createElement('h3'); 
        h3Elt.innerHTML = product.name;
        articleElt.appendChild(h3Elt); 
        let pElt = document.createElement('p');
        pElt.innerHTML = product.description;
        articleElt.appendChild(pElt); 
        
    };
};

// Appel à l'API pour récupérer la liste des produits

(getProduits = async () => {
    const response = await fetch(url)
    .catch((error) => { console.log("Erreur : Impossible de se connecter", error); })
    const products = await response.json()
    .catch((error) => { console.log("Erreur : Impossible de récupérer les produits", error) })
    afficheProduits(products)
})()

    /**
     * Autre méthode
     */
    
    // fetch(url)
    // .catch(function(err){
    //     console.log(err, "probleme de connexion à l'api")
    // })
    // .then(function(res){        
    //     if (res.ok){
    //         return res.json()
    //     }
    // })
    // .catch(function(err){
    //     console.log(err, "erreur de récupération des données")
    // })
    // .then(function(products){
    //     afficheProduits(products)
    // })