// import { auth } from "../Scripts/AuraHomeServices";
// import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";


//  export function showAuthModal() {
//   if (document.getElementById("auth-modal-overlay")) return;

//   const modalHtml = `
//         <div id="auth-modal-overlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 10000; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(4px);">
//             <div style="background: white; padding: 40px; border-radius: 0; max-width: 400px; width: 90%; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.1); border: 1px solid #eee;">
//                 <div style="color: #025048; font-size: 3rem; margin-bottom: 20px;">
//                     <i class="fas fa-user-circle"></i>
//                 </div>
//                 <h3 style="font-family: 'Poppins', sans-serif; color: #025048; margin-bottom: 15px; font-weight: 600;">Sign Up Required</h3>
//                 <p style="font-family: 'workSans', sans-serif; color: #8E8E93; margin-bottom: 30px; line-height: 1.6;">To access this feature and manage your orders, please sign up or log in to your account.</p>
//                 <button id="auth-modal-btn" style="background: #025048; color: white; border: none; padding: 12px 40px; border-radius: 50px; font-family: 'workSans', sans-serif; font-weight: bold; cursor: pointer; transition: all 0.3s ease; width: 100%;">
//                     Sign Up Now
//                 </button>
//             </div>
//         </div>
//     `;

//   document.body.insertAdjacentHTML("beforeend", modalHtml);

//   const btn = document.getElementById("auth-modal-btn");
//   btn.onmouseover = () => (btn.style.transform = "translateY(-2px)");
//   btn.onmouseout = () => (btn.style.transform = "translateY(0)");

//   btn.onclick = () => {
//     window.location.href = "login.html";
//   };
// }

// /**
//  * 
//  * @param {boolean} protectedPage 
//  */
// export function checkAuth(protectedPage = true) {
//   return new Promise((resolve) => {
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         resolve(user);
//       } else {
//         if (protectedPage) {
//           showAuthModal();
//         }
//         resolve(null);
//       }
//     });
//   });
// }


// export function getCurrentUser() {
//   return new Promise((resolve) => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       unsubscribe();
//       resolve(user);
//     });
//   });
// }
