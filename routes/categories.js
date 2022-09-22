import { Router } from "express";
import { check } from "express-validator";
import { categoriesDELETE, categoriesGET, categoriesPOST, categoryGET } from "../controllers/categories.js";
import { checkCategoryById } from "../helpers/db-validators.js";
import { validateEntries } from "../middlewares/validateEntries.js";
import { validateJWT } from "../middlewares/validateJWT.js";
import { validateAdminRole } from "../middlewares/validateRole.js";


export const categoriesRouter = Router()

//obtener todas las categorias 
categoriesRouter.get('/', categoriesGET)

// obtener una categoria
categoriesRouter.get('/:id', [
  check('id', 'ID submitted is not a valid Mongo ID').isMongoId(),
  check('id').custom( checkCategoryById ),
  validateEntries
], categoryGET)

// crear categoria - privado - cualquier persona con un token 
categoriesRouter.post('/', [
  validateJWT,
  validateAdminRole,
  check('name', 'Name is required').not().isEmpty(),
  validateEntries
], categoriesPOST)

// actualizar una categoria
categoriesRouter.put('/:id', [
  validateJWT,
  validateAdminRole,
  check('name', 'name is required').not().isEmpty(),
  check('id', 'ID is not a Mongo ID').isMongoId(),
  check('id').custom( checkCategoryById ),
  validateEntries
], categoriesGET)

// borrar una categoria - Admin
categoriesRouter.delete('/:id', [
  validateJWT,
  validateAdminRole,
  check('id').isMongoId(),
  check('id').custom( checkCategoryById ),
  validateEntries
], categoriesDELETE)