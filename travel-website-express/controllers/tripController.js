import firebase from "../firebase.js";

import Trip from "../models/tripModel.js";

import { getFirestore, collection, getDocs } from "firebase/firestore";

const db = getFirestore(firebase);

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
