fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((data) => addProducts(data))
  .catch((err) => console.error(err));

const addProducts = (data) => {
  data.map((product) => {
    const { _id, imageUrl, altTxt, name, description } = product;

    const article = document.createElement("article");

    const anchor = makeAnchor(_id);
    const img = makeImg(imageUrl, altTxt);
    const h3 = makeH3(name, "productName");
    const p = makeParagraph(description, "productDescription");

    article.appendChild(img);
    article.appendChild(h3);
    article.appendChild(p);
    appendArticleToAnchor(anchor, article);
  });
};

const makeAnchor = (id) => {
  const anchor = document.createElement("a");
  anchor.href = `./product.html?id=${id}`;
  return anchor;
};

const appendArticleToAnchor = (anchor, article) => {
  const items = document.querySelector("#items");
  if (items !== null) {
    items.appendChild(anchor);
    anchor.appendChild(article);
  }
};

const makeImg = (imgUrl, altTxt) => {
  const img = document.createElement("img");
  img.src = imgUrl;
  img.alt = altTxt;
  return img;
};

const makeH3 = (name, classProduct) => {
  const h3 = document.createElement("h3");
  h3.textContent = name;
  h3.classList.add(classProduct);
  return h3;
};

const makeParagraph = (content, classProduct) => {
  const p = document.createElement("p");
  p.textContent = content;
  p.classList.add(classProduct);
  return p;
};
