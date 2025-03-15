import express, { request, response } from "express";
import { PORT, MONGOURL } from "./config.js";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import massageRoutes from "./routes/massageRoutes.js";
 import cors from "cors";

const app = express()
app.use(cors({ origin: '*' })); 

app.use(express.json());

mongoose.connect(MONGOURL).then(() => {
    console.log("Connected to the DB");
})
.catch((error) => {
    console.log(error);
})

app.use("/api/users", userRoutes);
app.use("/api/mg", massageRoutes);

app.listen(PORT, () => {
    console.log(`App is listning to port  : ${PORT}`);
})