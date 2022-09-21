import { Router } from "express";
import { check } from "express-validator";
import { googleSignIn, login } from "../controllers/auth.js";
import { checkEmail } from "../helpers/db-validators.js";
import { validateEntries } from "../middlewares/validateEntries.js";

export const authRouter = Router()

authRouter.post('/login', [
  check('email', 'email is invalid').isEmail(),
  check('password', 'password is required').not().isEmpty(),
  validateEntries
], login)

authRouter.post('/google', [
  check('id_token', 'id_token is required').not().isEmpty(),
  validateEntries
], googleSignIn );