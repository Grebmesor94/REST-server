import { Router } from "express";
import { check } from "express-validator";

import { validateEntries } from "../middlewares/validateEntries.js";
import { validateJWT } from "../middlewares/validateJWT.js";
import { validateAdminRole, validateRoles } from "../middlewares/validateRole.js";
import { checkEmail, checkRole, checkUserById } from "../helpers/db-validators.js";

import { 
  usersDELETE,
  usersGET,
  usersPATCH,
  usersPUT,
  usersPOST 
} from "../controllers/user.js";

const router = Router()

router.post('/', [
  //? express validator middlewares: no actuan inmediatamente pero preparan los errores 
  //? que son enviados en la request
  check('email').custom( checkEmail ), 
  check('name', 'Name is required').not().isEmpty(), 
  check('password', 'Password is required and must have 6 or more letters').isLength({min: 6}),
  // check('role', 'not a valid role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check('role').custom( checkRole ),
  validateEntries
], usersPOST)

router.get('/', usersGET);

router.delete('/:id', [
  validateJWT,
  validateAdminRole,
  validateRoles('ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE'),
  check('id', 'ID is not valid').isMongoId(),
  check('id').custom( checkUserById ),
  validateEntries
], usersDELETE)

router.put('/:id', [
  check('id', 'ID is not valid').isMongoId(),
  check('id').custom( checkUserById ),
  check('role').custom( checkRole ),
  validateEntries
], usersPUT)

export default router;