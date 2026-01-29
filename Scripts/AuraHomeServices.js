<<<<<<< HEAD
import { db, auth } from "../Scripts/firebase.js";
import { collection, doc, addDoc, getDocs, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
=======
import { db } from "../Scripts/firebase.js";
<<<<<<< HEAD
import {
  collection,
  doc,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
=======
import { collection, doc, addDoc, getDocs, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";


>>>>>>> ba4d08d78d65508f6f95bb7c213330122873e779
>>>>>>> b2c167ac3638215abbb8538ff921e0551d05db4f

export async function loadProducts() {
  const querySnapshot = await getDocs(collection(db, "Product"));

  querySnapshot.forEach((doc) => {
    console.log(doc.id, doc.data());
  });

  return querySnapshot;
}
loadProducts();

export async function getProductById(productId) {
  try {
    const docRef = doc(db, "Product", productId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Product:", docSnap.data());
      return docSnap.data();
    } else {
      console.log("No such product!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function createProduct(product) {
  try {
    const docRef = await addDoc(collection(db, "Product"), {
      Product_Name: product.Product_Name,
      Description: product.Description ?? "No Discription",
      Category: product.Category ?? "Uncategorized",
      Image_URL: product.Image_URL ?? "",
      Price: Number(product.Price),
      Discount_Price: Number(product.Discount_Price) || null,
      Stock_Quantity: Number(product.Stock_Quantity) || 0,
      CreatedAt: Date.now(),
    });
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
}

export async function updateProduct(productId, updates) {
  try {
    const productRef = doc(db, "Product", productId);

    await updateDoc(productRef, updates);

    console.log("Product updated:", productId);
    return true;
  } catch (error) {
    console.error("Update failed:", error);
    return false;
  }
}

export async function deleteProduct(productId) {
<<<<<<< HEAD
  try {
    await deleteDoc(doc(db, "Product", productId));
    console.log("Product deleted:", productId);
    return true;
  } catch (e) {
    console.error("Error deleting product:", e);
    return false;
  }
}
=======
    try {
        await deleteDoc(doc(db, "Product", productId));
        console.log("Product deleted:", productId);
        return true;
    } catch (e) {
        console.error("Error deleting product:", e);
        return false;
    }
}



export async function laodCategories() {
    const querySnapshot = await getDocs(collection(db, "Category"));

    querySnapshot.forEach((doc) => {
        console.log(doc.id, doc.data());
    });

    return querySnapshot;
}


export async function crateCategory(category) {
    try {
        const docRef = await addDoc(collection(db, "Category"), {
            Name: category.Name
        });
        return true;
    } catch (e) {
        console.error("Error adding document: ", e);
        return false;
    }
}



export async function updateCategory(categoryId, updates) {
    try {
        const categoryRef = doc(db, "Category", categoryId);

        await updateDoc(categoryRef, updates);

        console.log("Category updated:", categoryId);
        return true;

    } catch (error) {
        console.error("Update failed:", error);
        return false;
    }
}


export async function deleteCategory(categoryId) {
    try {
        await deleteDoc(doc(db, "Category", categoryId));
        console.log("Category deleted:", categoryId);
        return true;
    } catch (e) {
        console.error("Error deleting category:", e);
        return false;
    }
}





export async function registerUser(email, password) {
    try {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        console.log("User registered:", userCred.user.uid);
        return userCred.user;
    } catch (error) {
        console.error("Register failed:", error.message);
        return null;
    }
}



export async function loginUser(email, password) {
    try {
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        console.log("User logged in:", userCred.user.uid);
        return userCred.user;
    } catch (error) {
        console.error("Login failed:", error.message);
        return null;
    }
}


export async function logoutUser() {
    await signOut(auth);
    console.log("User logged out");
}

export async function forgotPassword(email) {
    try {
        await sendPasswordResetEmail(auth, email);
        console.log("Password reset email sent");
        return true;
    } catch (error) {
        console.error("Reset failed:", error.message);
        return false;
    }
}








>>>>>>> ba4d08d78d65508f6f95bb7c213330122873e779
