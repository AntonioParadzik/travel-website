import firebase from "../firebase.js";
import Destination from "../models/destinationModel.js";
import Trip from "../models/tripModel.js";
import CartItem from "../models/cartItemModel.js";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import User from "../models/userModel.js";

const db = getFirestore(firebase);

export const createUser = async (req, res, next) => {
  try {
    const data = req.body;
    const userDocRef = doc(collection(db, "users"), data.uid);
    await setDoc(userDocRef, data);

    const cartDocRef = doc(collection(userDocRef, "cart"), "placeholder");
    await setDoc(cartDocRef, {});
    res.status(200).send("User created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while creating the user");
  }
};

export const getTrips = async (req, res, next) => {
  try {
    const trips = await getDocs(collection(db, "trips"));
    const tripArray = [];

    if (trips.empty) {
      res.status(400).send("No Trips found");
    } else {
      trips.forEach((doc) => {
        const trip = new Trip(
          doc.id,
          doc.data().heading,
          doc.data().image,
          doc.data().text,
          doc.data().location1,
          doc.data().location2,
          doc.data().location3,
          doc.data().price
        );
        tripArray.push(trip);
      });

      res.status(200).send(tripArray);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while creating the user");
  }
};

export const getRandomDestination = async (req, res, next) => {
  try {
    const trips = await getDocs(collection(db, "trips"));
    const tripArray = [];

    if (trips.empty) {
      res.status(400).send("No Trips found");
    } else {
      trips.forEach((doc) => {
        const trip = new Trip(
          doc.id,
          doc.data().heading,
          doc.data().image,
          doc.data().text,
          doc.data().location1,
          doc.data().location2,
          doc.data().location3,
          doc.data().price
        );
        tripArray.push(trip);
      });

      let randomIndex1, randomIndex2;
      do {
        randomIndex1 = Math.floor(Math.random() * tripArray.length);
        randomIndex2 = Math.floor(Math.random() * tripArray.length);
      } while (randomIndex1 === randomIndex2 && tripArray.length > 1);

      const randomTrip1 = tripArray[randomIndex1];
      const randomTrip2 = tripArray[randomIndex2];

      const destinations1 = await getDocs(
        collection(db, "trips", randomTrip1.id, "destinations")
      );
      const destinations2 = await getDocs(
        collection(db, "trips", randomTrip2.id, "destinations")
      );

      let destinationData1 = null,
        destinationData2 = null;
      if (!destinations1.empty) {
        const doc = destinations1.docs[0];
        destinationData1 = new Destination(
          doc.id,
          doc.data().heading,
          doc.data().img1,
          doc.data().img2,
          doc.data().text
        );
      }
      if (!destinations2.empty) {
        const doc = destinations2.docs[0];
        destinationData2 = new Destination(
          doc.id,
          doc.data().heading,
          doc.data().img1,
          doc.data().img2,
          doc.data().text
        );
      }

      return res.status(200).send([
        { trip: randomTrip1, destination: destinationData1 },
        { trip: randomTrip2, destination: destinationData2 },
      ]);
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("An error occurred while fetching the trips and destinations");
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await getDocs(collection(db, "users"));
    const usersArray = [];

    if (users.empty) {
      res.status(400).send("No users found");
    } else {
      users.forEach((doc) => {
        const user = new User(doc.id, doc.data().email, doc.data().username);
        userArray.push(user);
      });

      res.status(200).send(usersArray);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while getting users");
  }
};
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
