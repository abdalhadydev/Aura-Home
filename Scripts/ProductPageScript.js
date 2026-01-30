// // import { loadProducts } from "../Scripts/AuraHomeServices.js";
// // await loadProducts();
// // const productsRow = document.getElementById("products-row");

// // async function renderAllProducts() {
// //   try {
// //     const querySnapshot = await loadProducts();

// //     productsRow.innerHTML = "";

// //     querySnapshot.forEach((doc) => {
// //       const product = doc.data();
// //       const productId = doc.id;

// //       const productCard = `
// //         <div class="col-lg-4 col-md-6 mb-4">
// //           <div class="card custom-card shadow-sm">
// //             <div class="img-wrapper">
// //               <img src="${product.Image_URL || "default-image.jpg"}" class="card-img-top" alt="${product.Product_Name}">
// //             </div>
// //             <div class="card-body">
// //               <h5 class="card-title">${product.Product_Name}</h5>
// //               <p class="price">
// //                 ${product.Price}$
// //                 ${product.Discount_Price ? `<span class="old-price">${product.Discount_Price}$</span>` : ""}
// //               </p>
// //               <p class="card-text">${product.Description}</p>
// //               <button class="btn btn-outline-brown" onclick="handleBuy('${productId}')">BUY NOW</button>
// //             </div>
// //           </div>
// //         </div>
// //       `;

// //       productsRow.innerHTML += productCard;
// //     });
// //   } catch (error) {
// //     console.error("Error displaying products:", error);
// //     productsRow.innerHTML = "<p>عفواً، حدث خطأ أثناء تحميل المنتجات.</p>";
// //   }
// // }

// // renderAllProducts();

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// const productsRow = document.getElementById("products-row");

// function getWishlist() {
//   return JSON.parse(localStorage.getItem("wishlist")) || [];
// }

// function toggleWishlist(id) {
//   let wishlist = getWishlist();
//   if (wishlist.includes(id)) {
//     wishlist = wishlist.filter((itemId) => itemId !== id);
//   } else {
//     wishlist.push(id);
//   }
//   localStorage.setItem("wishlist", JSON.stringify(wishlist));
// }

// productsRow.addEventListener("click", function (e) {
//   const btn = e.target.closest(".wishlist-btn");
//   if (btn) {
//     e.preventDefault();

//     const productId = btn.getAttribute("data-id");
//     btn.classList.toggle("active");

//     const icon = btn.querySelector("i");
//     if (btn.classList.contains("active")) {
//       icon.classList.replace("fa-regular", "fa-solid");
//     } else {
//       icon.classList.replace("fa-solid", "fa-regular");
//     }

//     toggleWishlist(productId);
//     console.log("Current Wishlist IDs:", getWishlist());
//   }
// });

// async function fetchAndDisplayProducts() {
//   try {
//     const response = await fetch("https://dummyjson.com/products");
//     const data = await response.json();
//     const products = data.products;
//     const wishlist = getWishlist();

//     productsRow.innerHTML = "";

//     products.forEach((product) => {
//       const oldPrice = (
//         product.price /
//         (1 - product.discountPercentage / 100)
//       ).toFixed(2);

//       const isFavorite = wishlist.includes(product.id.toString());
//       const heartClass = isFavorite ? "fa-solid active" : "fa-regular";
//       const activeClass = isFavorite ? "active" : "";

//       const productCard = `
//                 <div class="col-lg-4 col-md-6 mb-4">
//                     <div class="card custom-card shadow-sm h-100">
//                         <div class="img-wrapper">
//                             <button class="wishlist-btn ${activeClass}" data-id="${product.id}">
//                                 <i class="${heartClass} fa-heart"></i>
//                             </button>
//                             <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
//                         </div>
//                         <div class="card-body d-flex flex-column">
//                             <h5 class="card-title">${product.title}</h5>
//                             <p class="price">
//                                 ${product.price}$
//                                 <span class="old-price">${oldPrice}$</span>
//                             </p>
//                             <p class="card-text">${product.description}</p>
//                             <button class="btn btn-outline-brown mt-auto">BUY NOW</button>
//                         </div>
//                     </div>
//                 </div>
//             `;
//       productsRow.innerHTML += productCard;
//     });
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

// fetchAndDisplayProducts();

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

import { loadProducts } from "../Scripts/AuraHomeServices.js";

const productsRow = document.getElementById("products-row");

function getWishlist() {
  return JSON.parse(localStorage.getItem("wishlist")) || [];
}

function toggleWishlist(id) {
  let wishlist = getWishlist();
  if (wishlist.includes(id)) {
    wishlist = wishlist.filter((itemId) => itemId !== id);
  } else {
    wishlist.push(id);
  }
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

productsRow.addEventListener("click", function (e) {
  const btn = e.target.closest(".wishlist-btn");
  if (btn) {
    e.preventDefault();
    const productId = btn.getAttribute("data-id");
    btn.classList.toggle("active");
    const icon = btn.querySelector("i");
    if (btn.classList.contains("active")) {
      icon.classList.replace("fa-regular", "fa-solid");
    } else {
      icon.classList.replace("fa-solid", "fa-regular");
    }
    toggleWishlist(productId);
  }
});

async function renderAllProducts() {
  try {
    const querySnapshot = await loadProducts();
    const wishlist = getWishlist();
    productsRow.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const product = doc.data();
      const productId = doc.id;

      // تحويل الصور لنص مشفر (Array to String)
      const imgsString = Array.isArray(product.Image_URLs)
        ? product.Image_URLs.join("|")
        : product.Image_URLs;

      // بناء رابط يحتوي على كل البيانات لتقليل الـ Reads في الصفحة التالية
      const params = new URLSearchParams({
        id: productId,
        name: product.Product_Name,
        price: product.Price,
        oldPrice: product.Discount_Price || "",
        desc: product.Description,
        stock: product.Stock_Quantity || 0,
        imgs: imgsString,
      });

      const detailsLink = `ProductDetails.html?${params.toString()}`;
      const isFavorite = wishlist.includes(productId);
      const heartClass = isFavorite ? "fa-solid active" : "fa-regular";

      const productCard = `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card custom-card shadow-sm h-100">
                    <div class="img-wrapper">
                        <button class="wishlist-btn ${isFavorite ? "active" : ""}" data-id="${productId}">
                            <i class="${heartClass} fa-heart"></i>
                        </button>
                        <a href="${detailsLink}">
                            <img src="${Array.isArray(product.Image_URLs) ? product.Image_URLs[0] : product.Image_URLs}" class="card-img-top" alt="${product.Product_Name}">
                        </a>
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">
                            <a href="${detailsLink}" style="text-decoration:none; color:inherit;">${product.Product_Name}</a>
                        </h5>
                        <p class="price">
                            ${product.Price}$
                            ${product.Discount_Price ? `<span class="old-price">${product.Discount_Price}$</span>` : ""}
                        </p>
                        <p class="card-text text-truncate-custom">${product.Description}</p>
                        <button class="btn btn-outline-brown mt-auto" onclick="window.location.href='${detailsLink}'">BUY NOW</button>
                    </div>
                </div>
            </div>`;
      productsRow.innerHTML += productCard;
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

renderAllProducts();