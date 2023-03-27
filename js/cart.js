let cartGlobal = [];

const getProductsFromLocalStorage = async () => {
  const numberOfProducts = localStorage.length;
  const cart = [];

  for (let i = 0; i < numberOfProducts; i++) {
    const product = JSON.parse(localStorage.getItem(localStorage.key(i)));

    let response = await fetch(
      `http://localhost:3000/api/products/${product.id}`
    );

    if (response.ok) {
      const data = await response.json();
      product.price = data.price;
      product.imageUrl = data.imageUrl;
      product.altTxt = data.altTxt;
      product.name = data.name;
      cart.push(product);
    }
  }
  cart.map((product) => displayProduct(product));
  cartGlobal = cart;
  displayTotalQuantity();
  displayTotalPrice();
};

const displayProduct = (product) => {
  const article = makeArticle(product, "cart__item");
  const div = makeDivImg(product);
  const cartProductContent = makeCartProductContent(product);

  displayArticle(article);
  article.appendChild(div);
  article.appendChild(cartProductContent);
};

const makeArticle = (product, classProduct) => {
  const article = document.createElement("article");
  article.classList.add(classProduct);
  article.dataset.id = product.id;
  article.dataset.color = product.color;
  return article;
};

const makeDivImg = (product) => {
  const div = document.createElement("div");
  div.classList.add("cart__item__img");

  const img = document.createElement("img");
  img.src = product.imageUrl;
  img.alt = product.altTxt;

  div.appendChild(img);
  return div;
};

const makeCartProductContent = (product) => {
  const div = document.createElement("div");
  div.classList.add("cart__item__content");

  makeDescription(product, div);
  makeSettings(product, div);

  return div;
};

const makeDescription = (product, div) => {
  const description = document.createElement("div");
  description.classList.add("cart__item__content__description");

  const h2 = document.createElement("h2");
  h2.textContent = product.name;

  const color = document.createElement("p");
  color.textContent = product.color;

  const price = document.createElement("p");
  price.textContent = `${product.price} €`;

  description.appendChild(h2);
  description.appendChild(color);
  description.appendChild(price);
  div.appendChild(description);
};

const makeSettings = (product, div) => {
  const settings = document.createElement("div");
  settings.classList.add("cart__item__content__settings");

  addQuantityToSeetings(product, settings);
  addDeleteToSettings(settings, product);

  div.appendChild(settings);
};

const addQuantityToSeetings = (product, settings) => {
  const quantity = document.createElement("div");
  const input = document.createElement("input");

  quantity.classList.add("cart__item__content__settings__quantity");
  input.type = "number";
  input.classList.add("itemQuantity");
  input.name = "itemQuantity";
  input.min = "1";
  input.max = "100";
  input.value = product.quantity;

  input.addEventListener("change", () =>
    updatePriceAndQuantity(product, input.value)
  );

  const p = document.createElement("p");
  p.textContent = "Qté : ";

  quantity.appendChild(p);
  quantity.appendChild(input);

  settings.appendChild(quantity);
};

const updatePriceAndQuantity = (product, newQuantity) => {
  const productToUpdate = cartGlobal.find(
    (p) => p.id === product.id && p.color === product.color
  );
  productToUpdate.quantity = Number(newQuantity);

  displayTotalQuantity();
  displayTotalPrice();
  saveNewDataToLocalStorage(productToUpdate);
};

const saveNewDataToLocalStorage = (product) => {
  const key = `${product.id}:${product.color}`;

  const data = {
    id: product.id,
    color: product.color,
    quantity: product.quantity,
  };
  localStorage.setItem(key, JSON.stringify(data));
};

const addDeleteToSettings = (settings, product) => {
  const div = document.createElement("div");
  div.classList.add("cart__item__content__settings__delete");

  const p = document.createElement("p");
  p.classList.add("deleteItem");
  p.textContent = "Supprimer";

  p.addEventListener("click", () => deleteProduct(product));

  div.appendChild(p);
  settings.appendChild(div);
};

const deleteProduct = (product) => {
  const productToDelete = cartGlobal.findIndex(
    (p) => p.id === product.id && p.color === product.color
  );

  cartGlobal.splice(productToDelete, 1);
  displayTotalPrice();
  displayTotalQuantity();
  deleteDataFromLocalStorage(product);
  deleteArticle(product);
};

const deleteArticle = (product) => {
  const articleToDelete = document.querySelector(
    `article[data-id="${product.id}"][data-color="${product.color}"]`
  );
  articleToDelete.remove();
};

const deleteDataFromLocalStorage = (product) => {
  const key = `${product.id}:${product.color}`;
  localStorage.removeItem(key);
};

const displayArticle = (article) => {
  document.querySelector("#cart__items").appendChild(article);
};

const displayTotalQuantity = () => {
  const totalQuantity = document.querySelector("#totalQuantity");
  let total = 0;
  cartGlobal.map((product) => (total += product.quantity));
  totalQuantity.textContent = total;
};

const displayTotalPrice = () => {
  let total = 0;
  const totalPrice = document.querySelector("#totalPrice");
  cartGlobal.map((product) => {
    const totalUnitPrice = product.price * product.quantity;
    total += totalUnitPrice;
  });
  totalPrice.textContent = total;
};

getProductsFromLocalStorage();
