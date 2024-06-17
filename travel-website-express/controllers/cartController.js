import firebase from "../firebase.js";
import CartItem from "../models/cartItemModel.js";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const db = getFirestore(firebase);

export const addCartItem = async (req, res, next) => {
  try {
    const data = req.body;
    const userDocRef = doc(db, "users", data.userId);

    const cartCollectionRef = collection(userDocRef, "cart");
    const placeholderDocRef = doc(cartCollectionRef, "placeholder");
    const placeholderDocSnap = await getDoc(placeholderDocRef);
    if (placeholderDocSnap.exists()) {
      await deleteDoc(placeholderDocRef);
    }

    await addDoc(collection(userDocRef, "cart"), data);
    res.status(200).send("Item added to cart successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while adding item to cart");
  }
};

export const getCartItems = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const userDocRef = doc(db, "users", userId);
    const cartCollectionRef = collection(userDocRef, "cart");
    const cartItems = await getDocs(cartCollectionRef);
    const cartArray = [];

    if (cartItems.empty) {
      res.status(200).send([]);
    } else {
      cartItems.forEach((doc) => {
        const cartItem = new CartItem(
          doc.id,
          doc.data().heading,
          doc.data().image,
          doc.data().price,
          doc.data().quantity,
          doc.data().totalPrice
        );
        cartArray.push(cartItem);
      });

      res.status(200).send(cartArray);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching cart items");
  }
};

export const updateCartItem = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const cartId = req.params.id;
    const data = req.body;
    const cartItem = doc(db, "users", userId, "cart", cartId);
    await updateDoc(cartItem, data);
    res.status(200).send("cart item updated successfully");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("An error occurred while updating cart items");
  }
};

export const deleteCartItem = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const cartId = req.params.id;
    const cartItem = doc(db, "users", userId, "cart", cartId);
    await deleteDoc(cartItem);
    res.status(200).send("cart item deleted successfully");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("An error occurred while deleting cart item");
  }
};

export const deleteCart = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const userDocRef = doc(db, "users", userId);
    const cartCollectionRef = collection(userDocRef, "cart");
    const cartItems = await getDocs(cartCollectionRef);

    cartItems.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });

    res.status(200).send("cart deleted successfully");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("An error occurred while deleting cart");
  }
};
