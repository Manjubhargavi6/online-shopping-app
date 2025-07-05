//elements references
const productsContainer = document.getElementById("productsContainer");
const cartContainer = document.getElementById("cartContainer");
const feedbackElement = document.getElementById("feedback");
const totalPrice = document.getElementById("totalPrice");
const clearBtn = document.getElementById("clearBtn");
const sortBtn = document.getElementById("sortBtn");

//default produts
const products = [
  {
    id: 1,
    name: "Laptop",
    price: 50000,
  },
  {
    id: 2,
    name: "phone",
    price: 20000,
  },
  {
    id: 3,
    name: "Tablet",
    price: 50000,
  },
  {
    id: 4,
    name: "smartwatch",
    price: 1000,
  },
  {
    id: 5,
    name: "laptop",
    price: 500,
  },
];

//empty cart
const cart = [];

//used to reset the timer
let timeId;

clearBtn.addEventListener("click", clearCart);
sortBtn.addEventListener("click", sortCart);

function clearCart() {
  if (cart.length == 0) {
    updateUserFeedback(`There is no product in cart`, "error");
    return;
  }
  cart.length = 0;
  updateUserFeedback(`cart is cleared`, "clear");
  renderCartDetails();
}

function sortCart() {
  if (cart.length == 0) {
    updateUserFeedback(`There is no product to sort`, "error");
    return;
  }
  cart.sort((item1, item2) => {
    return item1.price - item2.price;
  });
  updateUserFeedback(`cart is sorted according to price`, "success");
  renderCartDetails();
}

function renderProductDetails() {
  products.forEach(function (product) {
    //   const productRow = `
    //     <div class="product-row">
    //         <p>${product.name} -Rs. ${product.price}</p>
    //         <button>Add to cart</button>
    //         </div>
    //         `;
    //   productsContainer.insertAdjacentHTML("beforeend", productRow);

    // const { id, name, price } = products;
    const divElement = document.createElement("div");
    divElement.className = "product-row";
    divElement.innerHTML = `
     <p>${product.name} -Rs. ${product.price}</p>
     <button onclick="addToCart(${product.id})">Add to cart</button>
    `;
    productsContainer.appendChild(divElement);
  });
}

function renderCartDetails() {
  cartContainer.innerHTML = "";
  cart.forEach(function (product) {
    const { id, name, price } = product;
    const cartItemRow = `
      <div class="product-row">
          <p>${name} -Rs. ${price}</p>
          <button onclick="removeFromcart(${id})"">Remove</button>
          </div>
          `;
    cartContainer.insertAdjacentHTML("beforeend", cartItemRow);
  });
  //   let total = 0;
  //   for (let i = 0; i < cart.length; i++) {
  //     total = total + cart[i].price;
  //   }
  //   totalPrice.textContent = `Rs. ${total}`;

  const total = cart.reduce((acc, currproduct) => {
    return acc + currproduct.price;
  }, 0);
  totalPrice.textContent = `Rs. ${total}`;
}
// add to cart
function addToCart(id) {
  // console.log("Add to cart clicked", id);

  //check if the product is alredy avaliable in the cart

  const isproductAvailable = cart.some((product) => product.id === id);
  if (isproductAvailable) {
    const productToAdd = products.find((product) => product.id === id);
    // feedbackElement.textContent = `${productToAdd.name} already added to the cart`;
    updateUserFeedback(
      `${productToAdd.name} already added to the cart`,
      "error"
    );
    return;
  }
  const productToAdd = products.find((product) => product.id === id);
  // console.log(productToAdd);
  cart.push(productToAdd);
  console.log(cart);
  renderCartDetails();
  // feedbackElement.textContent = `${name} is added to the cart`;
  updateUserFeedback(`${productToAdd.name} is added to the cart`, "success");
}
function removeFromcart(id) {
  console.log(id);
  const product = cart.find((product) => product.id == id);
  // const idFilter = cart.filter((product) => {
  //   return product.id !== id;
  // });

  const productIndex = cart.findIndex((product) => product.id == id);
  cart.splice(productIndex, 1);
  // console.log(idFilter);

  updateUserFeedback(`${product.name} is removed from the cart`, "error");
  renderCartDetails();
}

function updateUserFeedback(msg, type) {
  clearTimeout(timeId);
  feedbackElement.style.display = "block";
  if (type == "success") {
    feedbackElement.style.background = "green";
    feedbackElement.style.color = "white";
  }
  if (type == "error") {
    feedbackElement.style.background = "red";
    feedbackElement.style.color = "white";
  }
  if (type == "clear") {
    feedbackElement.style.background = "violet";
    feedbackElement.style.color = "white";
  }
  feedbackElement.textContent = msg;

  timeId = setTimeout(function () {
    feedbackElement.style.display = "none";
  }, 3000);
}

//rendering products
renderProductDetails();
