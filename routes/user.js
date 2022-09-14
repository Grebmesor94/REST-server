import { Router } from "express";
import { 
  usersDELETE,
  usersGET,
  usersPATCH,
  usersPUT,
  usersPOST 
} from "../controllers/user.js";

const router = Router()

router.post('/', usersPOST)

router.get('/', usersGET);

router.delete('/', usersDELETE)

router.put('/:id', usersPUT)

router.patch('/', usersPATCH)

export default router;