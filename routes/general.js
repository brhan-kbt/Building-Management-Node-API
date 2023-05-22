import  express  from "express";
import {getAllUser, getUser,loginUser,registerUser} from '../controllers/general.js';


const router=express.Router();
router.get('/users/',getAllUser);
router.post('/users/',registerUser);
router.post('/users/login',loginUser);
router.get('/user/:id',getUser);

export default router;