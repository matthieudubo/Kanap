const idProduct = window.location.search.split("?").join("");

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
    });
};

fetchDataProduct();
