import express from "express";
import cors from "cors";

import {
  getTrips,
  getRandomDestination,
  createUser,
  addCartItem,
  getUsers,
  getCartItems,
  updateCartItem,
  deleteCartItem,
} from "../controllers/productController.js";

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

export default router;
