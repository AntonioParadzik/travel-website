import firebase from "../firebase.js";
import Destination from "../models/destinationModel.js";
import Trip from "../models/tripModel.js";

import { getFirestore, collection, getDocs } from "firebase/firestore";

const db = getFirestore(firebase);

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
