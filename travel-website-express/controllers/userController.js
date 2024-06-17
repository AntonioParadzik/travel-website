import firebase from "../firebase.js";

import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
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
