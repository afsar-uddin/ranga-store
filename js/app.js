// fetch for product load 
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div class="product-col">
      <img class="product-image" src=${image} />
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <p class="rating">User Rating: ${product.rating.rate} <span class="glyphicon glyphicon-star"></span></p>
      <p class="rating">Average Rating: ${product.rating.count} <span class="glyphicon glyphicon-user"></span></p>
      <h4>Price: $ ${product.price}</h4>
      </div>
      <div class="btns">
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="align-self-end buy-now">add to cart</button>
      <button id="details-btn" onclick="loadDetail(${product.id})" class="align-self-end">Details</button>
      </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
// product item count and addto cart
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

// input value target and get value
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = parseFloat(total).toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(value).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", parseFloat(priceConverted * 0.2).toFixed(2));
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", parseFloat(priceConverted * 0.3).toFixed(2));
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", parseFloat(priceConverted * 0.4).toFixed(2));
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal = getInputValue("price") + getInputValue("delivery-charge") + getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);

  return grandTotal;
}
updateTotal();

// fetch for product Detail 
const loadDetail = id => {
  // Product detail fetch
  const url = `https://fakestoreapi.com/products/${id}`
  fetch(url)
    .then(response => response.json())
    .then(data => showDetail(data))
}
// product detail display UI
const showDetail = product => {
  const loadDetail = document.getElementById('load-detail');
  loadDetail.textContent = '';
  const div = document.createElement('div');
  div.classList.add('product-detail');
  div.innerHTML = `
    <img src="${product.image}" />
    <h3>${product.title}</h3>
    <p>$${product.price}</p>
    <p>${product.description}<p>
    <p>Category: ${product.category}</p>
    <p class="rating">User rating: ${product.rating.rate} <span class="glyphicon glyphicon-star"></span></p>
    <p class="rating">Average rating: ${product.rating.count} <span class="glyphicon glyphicon-user"></span></p>
  `;
  loadDetail.appendChild(div);
}