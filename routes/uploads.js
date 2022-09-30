import { Router } from "express";
import { check } from "express-validator";
import { fileUpload, showImage, updateImage, updateImageCloudinary } from "../controllers/uploads.js";
import { allowedCollections } from "../helpers/db-validators.js";
import { validateEntries } from "../middlewares/validateEntries.js";
import { validateFiles } from "../middlewares/validateFiles.js";

export const uploadsRouter = Router()

uploadsRouter.post('/', validateFiles, fileUpload )

uploadsRouter.put('/:collection/:id', [
  validateFiles,
  check('id', 'ID is not a Mongo ID').isMongoId(),
  check('colecction').custom( c => allowedCollections( c, ['users', 'products'] ) ),
  validateEntries
], updateImageCloudinary )

uploadsRouter.get('/:collection/:id', [
  check('id', 'ID is not a Mongo ID').isMongoId(),
  check('colecction').custom( c => allowedCollections( c, ['users', 'products'] ) ),
  validateEntries
], showImage)