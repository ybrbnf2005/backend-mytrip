import express from "express";
import mongoose from "mongoose";
import {
  reviewCreateValidation,
  registerValidation,
  loginValidation,
  routeCreateValidation,
} from "./validations.js";
import checkAuth from "./utils/checkAuth.js";
import * as RouteController from "./controllers/RouteController.js";
import * as UserController from "./controllers/UserController.js";
import * as ReviewController from "./controllers/ReviewController.js";
import handleValidationErrors from "./utils/handleValidationErrors.js";
import cors from "cors";

mongoose
  .connect(
    "mongodb+srv://20ins05:gfnhbr2013@cluster0.k1mza.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("DB Ok"))
  .catch((err) => console.log("db error", err));

const app = express();
app.use(express.json());
app.use(cors());
app.post(
  "/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
app.post(
  "/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.get("/me", checkAuth, UserController.getMe);

app.post(
  "/reviews",
  reviewCreateValidation,
  checkAuth,
  ReviewController.create
);
app.get("/reviews", ReviewController.getAll);
app.delete("/reviews/:id", checkAuth, ReviewController.remove);

app.get("/", RouteController.getAll);
app.get("/route/:id", checkAuth, RouteController.getOne);
app.post("/", checkAuth, routeCreateValidation, RouteController.create);
app.delete("/route/:id", checkAuth, RouteController.remove);
app.patch("/route/:id", checkAuth, RouteController.update);

app.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server Ok");
});
