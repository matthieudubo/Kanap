const idProduct = window.location.search.split("?").join("");
let price = 0;

const fetchDataProduct = () => {
  fetch(`http://localhost:3000/api/products/${idProduct}`)
    .then((res) => res.json())
    .then((data) => {
      document.querySelector(
        ".item__img"
      ).innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}" />`;
      document.querySelector(
        ".item__content__titlePrice"
      ).innerHTML = `<h1 id="title">${data.name}</h1><p>Prix : <span id="price">${data.price}</span>€</p>`;
      document.querySelector(
        ".item__content__description"
      ).innerHTML = `<p id="description">${data.description}</p>`;
      document.querySelector("#colors").innerHTML = data.colors.map(
        (color) => `<option value="${color}">${color}</option>`
      );
      price = data.price;
    });
};

const button = document.querySelector("#addToCart");
if (button != null) {
  button.addEventListener("click", () => {
    const color = document.querySelector("#colors").value;
    const quantity = document.querySelector("#quantity").value;

    if (color === "" || quantity == 0) {
      alert("Merci de choisir une couleur et une quantité");
    }

    const data = {
      id: idProduct,
      color: color,
      quantity: Number(quantity),
      price: price,
    };

    localStorage.setItem(idProduct, JSON.stringify(data));
  });
}

fetchDataProduct();
