import  express  from "express";
import { getProducts, getUsers } from "../controllers/client.js";

const router=express.Router();

router.get("/products", getProducts);
router.get("/users", getUsers);

export default router;