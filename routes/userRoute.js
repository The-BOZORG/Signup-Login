import { Router } from "express";
import { login,register,logout,register_get,login_get } from "../controllers/userController.js";



const router  = Router()

router.get('/register', register_get);
router.get('/login', login_get);
router.post('/register',register)
router.post('/login',login)
router.get('/logout',logout)

export default router 