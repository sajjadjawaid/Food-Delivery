import foodModel from "../models/foodModel.js";
import fs from "fs";

//add foot item

const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;
  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });
  try {
    await food.save();
    res.json({
      success: true,
      message: "Food Added",
    });
  } catch (error) {
    console.log("error in addFood", error);
    res.json({
      success: false,
      message: "error",
    });
  }
};

const getAllFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({
      success: true,
      data: foods,
    });
  } catch (error) {
    console.log("error in getAllFood: ", error);
    res.json({
      success: false,
      message: "error",
    });
  }
};

const removeFood = async (req, res) => {
  try {
    const foodId = req.params.id;
    console.log("remove food", foodId);
    const food = await foodModel.findById(foodId);
    fs.unlink(`uploads/${food.image}`, () => {});
    await foodModel.findByIdAndDelete(foodId);
    res.json({
      success: true,
      message: "food removed",
    });
  } catch (error) {
    console.log("error in removeFood", error);
    res.json({
      success: false,
      message: "error",
    });
  }
};

export { addFood, getAllFood, removeFood };
