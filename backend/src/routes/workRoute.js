import express from "express";
import { getWorkByUserID, createWork, deleteWorkByUserID } from "../controllers/workController.js";

const workRouter = express.Router();

workRouter.get("/:user_id", getWorkByUserID);
workRouter.post("/", createWork);
workRouter.delete("/:id", deleteWorkByUserID);

export default workRouter;