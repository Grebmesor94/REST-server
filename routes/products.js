import { Router } from "express";
import { check } from "express-validator";
import { 
  productGET,
  productsDELETE,
  productsGET,
  productsPOST,
  productsPUT 
} from "../controllers/products.js";
import { checkCategoryById, checkProductById } from "../helpers/db-validators.js";
import { validateEntries } from "../middlewares/validateEntries.js";
import { validateJWT } from "../middlewares/validateJWT.js";
import { validateAdminRole } from "../middlewares/validateRole.js";

export const productsRouter = Router()


productsRouter.get( '/', productsGET )

productsRouter.get( '/:id', [
  check('id', 'ID is not a valid Mongo ID').isMongoId(),
  check('product').custom( checkProductById ),
  validateEntries
],
productGET )

productsRouter.post( '/', [
  validateJWT,
  validateAdminRole,
  check('category', 'Category is required').not().isEmpty(),
  check('name', 'Name is required').not().isEmpty(),
  check('category', 'is not a Mongo ID').isMongoId(),
  check('category').custom( checkCategoryById ),
  validateEntries
], productsPOST )

productsRouter.put( '/:id', [
  validateJWT,
  validateAdminRole,
  check('name', 'name is required').not().isEmpty(),
  check('id', 'ID is not a valid Mongo ID').isMongoId(),
  check('id').custom( checkProductById ),
  validateEntries
],
 productsPUT )

productsRouter.delete( '/:id', [
  validateJWT,
  validateAdminRole,
  check('id').isMongoId(),
  check('id').custom( checkProductById ),
  validateEntries
],
 productsDELETE )