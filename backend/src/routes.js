import express from "express";
import multer from "multer";
import multerConfig from "./config/multer";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import FileController from "./app/controllers/FileController";
import MeetupController from "./app/controllers/MeetupController";
import RegisterController from "./app/controllers/RegisterController";

import AuthMiddleware from "./app/middlewares/auth";

const routes = express.Router();
const upload = multer(multerConfig);

routes.post("/users", UserController.store);
routes.put("/users/:id", UserController.update);

routes.post("/sessions", SessionController.store);

routes.use(AuthMiddleware);

routes.post("/files", upload.single("banner"), FileController.store);
routes.post("/meetups", MeetupController.store);
routes.get("/meetups", MeetupController.index);
routes.put("/meetups/:id", MeetupController.update);
routes.delete("/meetups/:id", MeetupController.delete);

routes.post("/meetups/register/:id", RegisterController.store);

export default routes;
