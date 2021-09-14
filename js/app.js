
// fatching api
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
    // Dynamically display product into each div
    const div = document.createElement("div");
    div.classList.add("product");
    // div.style.backgroundColor = '#f2f2f2'
    div.innerHTML = `
    <div class="single-product">
      <div>
        <img class="product-image" src="${product.image}">
      </div>
        <h4 class="product-title">${product.title}</h4>
        <h6>Category: ${product.category}</h6>
        <span class="rating-points">Rating: ${product.rating.rate}</span> </br>
        <span><i class="fas fa-user"> ${product.rating.count}</i></span>
        <h4 class="product-price">Price: $${product.price}</h4>
        <button onclick="addToCart(${product.id}, ${product.price})" id="addToCart-btn" class="buy-now btn btn-warning rounded-pill mx-1">Add to Cart</button>
        <button id="details-btn" class="btn btn-dark rounded-pill">Details</button>
    </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
//number of item & price function calculation
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  //call the function - product price 
  updatePrice("price", price);
  //call the function - tex & delivery charge
  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  //call the function - total price
  updateTotal();
};

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
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
