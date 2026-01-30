const sofaIcon = document.getElementById("sofa-icon");

sofaIcon.addEventListener("mouseenter", () => {
  if (sofaIcon.bouncing != true) {
    sofaIcon.classList.add("fa-bounce");
    sofaIcon.bouncing = true;
  }
});

sofaIcon.addEventListener("mouseleave", () => {
  sofaIcon.classList.remove("fa-bounce");
  sofaIcon.bouncing = false;
});

document.querySelectorAll(".navbar-icon").forEach((icon) => {
  icon.addEventListener("mouseenter", () => {
    icon.classList.add("navbar-icon-hover");
  });

  icon.addEventListener("mouseleave", () => {
    icon.classList.remove("navbar-icon-hover");
  });
});
function changeImage(element) {
  document.getElementById("mainImg").src = element.src;
  document
    .querySelectorAll(".thumb")
    .forEach((t) => t.classList.remove("active"));
  element.classList.add("active");
}

function changeImage(element) {
  const mainImg = document.getElementById("mainImg");
  mainImg.style.opacity = "0";

  setTimeout(() => {
    mainImg.src = element.src;
    mainImg.style.opacity = "1";
  }, 200);

  document
    .querySelectorAll(".thumb")
    .forEach((t) => t.classList.remove("active"));
  element.classList.add("active");
}

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const container = document.getElementById("details-container");

  const product = {
    name: urlParams.get("name") || "Product Name",
    price: urlParams.get("price") || "0",
    oldPrice: urlParams.get("oldPrice") || "",
    desc: urlParams.get("desc") || "No description available.",
    stock: urlParams.get("stock") || "0",
    imgs: urlParams.get("imgs") ? urlParams.get("imgs").split("|") : [],
  };

  const imagesHtml = product.imgs
    .map(
      (img, index) =>
        `<img src="${img}" class="thumb ${index === 0 ? "active" : ""}" onclick="updateMainImage(this)">`,
    )
    .join("");

  const detailsTemplate = `
        <div class="main-wrapper">
            <div class="gallery-section">
                <div class="main-image">
                    <img src="${product.imgs[0] || "../Resources/Images/default.jpg"}"  alt="${product.name}" id="mainImg">
                </div>
                <div class="thumbnails">
                    ${imagesHtml}
                </div>
            </div>

            <div class="info-section">
                <div class="info-content">
                    <h1 class="product-name">${product.name}</h1>
                    
                    <div class="pricing">
                        <span class="price-now">${product.price}$</span>
                        ${product.oldPrice ? `<span class="price-before">${product.oldPrice}$</span>` : ""}
                    </div>

                    <div class="stock-status">
                        <i class="fa-solid fa-layer-group"></i>
                        <span>Availability: </span>
                        <span class="stock-count">${product.stock} Items in Stock</span>
                    </div>

                    <p class="short-desc">${product.desc}</p>

                    <ul class="specs-list">
                        <li><i class="fa-solid fa-circle-check"></i> Premium Quality Material</li>
                        <li><i class="fa-solid fa-circle-check"></i> Modern Architectural Design</li>
                        <li><i class="fa-solid fa-circle-check"></i> Aura Home Certified</li>
                    </ul>

                    <div class="purchase-zone">
                        <div class="qty-field">
                            <span class="label">Select Quantity</span>
                            <div class="qty-selector">
                                <button type="button" id="minus-btn">-</button>
                                <input type="number" value="1" id="qty-input" readonly>
                                <button type="button" id="plus-btn">+</button>
                            </div>
                        </div>

                        <div class="btns-group">
                            <button class="btn-action btn-add button-y">ADD TO CART</button>
                            <button class="btn-wish"><i class="fa-regular fa-heart"></i></button>
                            <button class="btn-action btn-buy button-y">BUY NOW</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <section class="related-section">
        <h2 class="sub-title">Related Products</h2>
        <div class="related-grid">
            <div class="item-card">
                <div class="item-img">
                    <button class="wish-tab"><i class="fa-regular fa-heart"></i></button>
                    <img src="../Resources/Images/61pBMc4mlPL._AC_UF894,1000_QL80_.jpg" alt="Related">
                </div>
            </div>
            <div class="item-card">
                <div class="item-img">
                    <button class="wish-tab"><i class="fa-regular fa-heart"></i></button>
                    <img src="../Resources/Images/61pBMc4mlPL._AC_UF894,1000_QL80_.jpg" alt="Related">
                </div>
            </div>
            <div class="item-card">
                <div class="item-img">
                    <button class="wish-tab"><i class="fa-regular fa-heart"></i></button>
                    <img src="../Resources/Images/61pBMc4mlPL._AC_UF894,1000_QL80_.jpg" alt="Related">
                </div>
            </div>
            <div class="item-card">
                <div class="item-img">
                    <button class="wish-tab"><i class="fa-regular fa-heart"></i></button>
                    <img src="../Resources/Images/61pBMc4mlPL._AC_UF894,1000_QL80_.jpg" alt="Related">
                </div>
            </div>
        </div>
    </section>
    `;

  
  container.innerHTML = detailsTemplate;

  setupInteractions(product.stock);
});

window.updateMainImage = function (element) {
  const mainImg = document.getElementById("mainImg");
  mainImg.src = element.src;
  document
    .querySelectorAll(".thumb")
    .forEach((t) => t.classList.remove("active"));
  element.classList.add("active");
};

function setupInteractions(maxStock) {
  const qtyInput = document.getElementById("qty-input");
  const minusBtn = document.getElementById("minus-btn");
  const plusBtn = document.getElementById("plus-btn");
  const stockLimit = parseInt(maxStock) || 1;

  plusBtn.onclick = () => {
    if (parseInt(qtyInput.value) < stockLimit) {
      qtyInput.value = parseInt(qtyInput.value) + 1;
    }
  };

  minusBtn.onclick = () => {
    if (parseInt(qtyInput.value) > 1) {
      qtyInput.value = parseInt(qtyInput.value) - 1;
    }
  };
}