import express from "express";
import { getSickByUserID, createSick, deleteSickByUserID } from "../controllers/sickController.js";

const sickRouter = express.Router();

sickRouter.get("/:user_id", getSickByUserID);
sickRouter.post("/", createSick);
sickRouter.delete("/:id", deleteSickByUserID);

export default sickRouter;