import mongoose from "mongoose";

export const connectDb = async () => {
  await mongoose
    .connect(
      "mongodb+srv://sajjadjawaid:sajjad12345@cluster0.emw7sqi.mongodb.net/Food-Delivery"
    )
    .then(() => console.log("DB connected"));
};
