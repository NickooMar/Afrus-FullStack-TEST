import { getEvent } from "../controllers/events.controller.js";
import express from "express";

const router = express.Router();

router.get("/", getEvent);

export default router;
