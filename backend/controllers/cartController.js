import userModel from "../models/userModel.js";

// add items in cart
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({ _id: req.body.userId });
    let cartData = await userData.cartData;
    //if the new product is selected then it will intilaise it with 1
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      //if the product already exists then it will increment its count
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({
      success: true,
      message: " Added to the Cart",
    });
  } catch (error) {
    console.log("error in addTo cart in Cart Controller", error);
    res.json({
      success: false,
      message: error,
    });
  }
};

//remove item from cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({
      success: true,
      message: "Removed from the Cart",
    });
  } catch (error) {
    console.log("error in removeFromCart", error);
    res.json({
      success: false,
      message: "error",
    });
  }
};

//fetch items from cart
const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = userData.cartData;
    res.json({
      success: true,
      cartData,
    });
  } catch (error) {
    console.log("error in getCart", error);
    res.json({
      success: false,
      message: "error",
    });
  }
};

export { addToCart, removeFromCart, getCart };
