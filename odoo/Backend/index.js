// import express from "express";
// import dotenv from "dotenv";
// dotenv.config({path: ".env"})
// const app = express();
// const PORT = process.env.PORT || 8000;



// app.listen(PORT, ()=>{
//     console.log(`Server started on PORT : ${PORT}`);
// })
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({ path: ".env" });

console.log("Environment Variables Check:");
console.log("CLOUDINARY_CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("CLOUDINARY_API_KEY:", process.env.CLOUDINARY_API_KEY);

connectDB()
  .then(() => {
    // const PORT = process.env.PORT || 8000; 
    const PORT = 5000; 
    app.listen(PORT, () => {
      console.log(`Server started on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });

  app.get("/", (req, res) => {
    res.send("Nice Odoo");
  });