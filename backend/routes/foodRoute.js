import express from "express";
import {
  addFood,
  getAllFood,
  removeFood,
} from "../controllers/foodController.js";
import multer from "multer";

const foodRouter = express.Router();

//diskstorage allows you to configure how files will be stored
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
}); //This is a callback function that you need to call once you’ve decided the filename.
//The first argument of the callback cb is an error object. If there’s no error and you’re successfully providing a filename, you pass null to indicate there’s no error.

const upload = multer({ storage: storage });

foodRouter.post("/add", upload.single("image"), addFood); //image will be fieldname
foodRouter.get("/list", getAllFood);
foodRouter.delete("/remove/:id", removeFood);

export default foodRouter;
