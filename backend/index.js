import express, { request, response } from "express";
import { PORT, MONGOURL } from "./config.js";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
 
const app = express()

app.use(express.json());

mongoose.connect(MONGOURL).then(() => {
    console.log("Connected to the DB");
})
.catch((error) => {
    console.log(error);
})

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
    console.log(`App is listning to port  : ${PORT}`);
})