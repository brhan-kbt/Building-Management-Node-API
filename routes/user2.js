import  express  from "express";
import { createUser, deleteUserById, getAllUsers, getUserById, loginUser, registerUser, updateUserById } from "../controllers/user2.js";
const router = express.Router();

// Get all users
router.get('', getAllUsers);

// Create a new user
router.post('', createUser);


// Get a user by ID
router.get('/:id', getUserById);

// Update a user by ID
router.put('/:id', updateUserById);

// Delete a user by ID
router.delete('/:id', deleteUserById);

router.post('/register',registerUser);
router.post('/login',loginUser);
export default router;