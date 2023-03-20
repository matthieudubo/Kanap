const items = document.getElementById("items");

// FONCTION QUI PERMET D'AFFICHER TOUS LES PRODUITS SUR LA PAGE D'ACCUEIL

const fetchItems = () => {
  fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => {
      data.map((item) => {
        const itemCard = document.createElement("a");
        const altImg = item.altTxt;
        const imgUrl = item.imageUrl;
        const productName = item.name;
        const productDescription = item.description;
        const idProduct = item._id;

        itemCard.setAttribute("id", idProduct);
        itemCard.setAttribute("class", "item-card");

        itemCard.innerHTML = `<article><img src="${imgUrl}" alt="${altImg}" /><h3 class="productName">${productName}</h3><p class="productDescription">${productDescription}</p></article>`;

        items.appendChild(itemCard);
      });
    })
    .then((data) => {
      const cardBtn = document.querySelectorAll(".item-card");
      cardBtn.forEach((card) =>
        card.addEventListener("click", () => {
          window.location = `product.html?${card.id}`;
        })
      );
    });
};

fetchItems();
