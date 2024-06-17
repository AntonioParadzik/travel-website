import express from "express";
import cors from "cors";

import { createUser, getUsers } from "../controllers/userController.js";

import { getTrips } from "../controllers/tripController.js";

import {
  addCartItem,
  getCartItems,
  updateCartItem,
  deleteCartItem,
  deleteCart,
} from "../controllers/cartController.js";

import { getRandomDestination } from "../controllers/destinationController.js";

const router = express.Router();

router.options("/new", cors());

router.get("/", getTrips);
router.get("/users", getUsers);
router.get("/users/:userId/cart", getCartItems);
router.post("/users/:userId/newCartItem", addCartItem);
router.get("/randomDestination", getRandomDestination);
router.post("/newUser", createUser);
router.put("/users/:userId/update/:id", updateCartItem);
router.delete("/users/:userId/cart/delete/:id", deleteCartItem);
router.delete("/users/:userId/cart/deleteAll", deleteCart);

export default router;
