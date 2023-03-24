const idProduct = new URLSearchParams(window.location.search).get("id");

fetch(`http://localhost:3000/api/products/${idProduct}`)
  .then((res) => res.json())
  .then((data) => fetchDataProduct(data));

const fetchDataProduct = (product) => {
  const { altTxt, colors, description, imageUrl, name, price, _id } = product;

  makeImage(imageUrl, altTxt);
  makeTitle(name);
  makePrice(price);
  makeDescription(description);
  makeColors(colors);
};

const makeImage = (imgUrl, altTxt) => {
  const img = document.createElement("img");
  img.src = imgUrl;
  img.alt = altTxt;

  const parent = document.querySelector(".item__img");

  if (parent !== null) {
    parent.appendChild(img);
  }
};

const makeTitle = (name) => {
  document.querySelector("#title").textContent = name;
};

const makePrice = (price) => {
  document.querySelector("#price").textContent = price;
};

const makeDescription = (description) => {
  document.querySelector("#description").textContent = description;
};

const makeColors = (colors) => {
  const select = document.querySelector("#colors");

  colors.map((color) => {
    const option = document.createElement("option");
    option.value = color;
    option.textContent = color;
    select.appendChild(option);
  });
};

const button = document.querySelector("#addToCart");
button.addEventListener("click", () => {
  const color = document.querySelector("#colors").value;
  const quantity = document.querySelector("#quantity").value;

  if (checkInvalidCart(color, quantity)) return;
  saveOrder(color, quantity);
});

const checkInvalidCart = (color, quantity) => {
  if (color === "" && quantity != 0) {
    alert("Merci de sélectionner une couleur");
    return true;
  } else if (quantity == 0 && color !== "") {
    alert("Merci de sélectionner une quantité");
    return true;
  } else if (color === "" && quantity == 0) {
    alert("Merci de sélectionner une couleur et une quantité");
    return true;
  } else if (quantity > 100) {
    alert("Vous ne pouvez pas commander plus de 100 articles");
    return true;
  }
};

const saveOrder = (color, quantity) => {
  const data = {
    id: idProduct,
    color: color,
    quantity: Number(quantity),
  };

  localStorage.setItem(idProduct, JSON.stringify(data));
};
