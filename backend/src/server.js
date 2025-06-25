import express from "express";
import dotenv from "dotenv";
import { initWorkDB, initVacationDB, initSickDB, sql } from "./config/db.js";

import ratelimiter from "./middleware/rateLimiter.js";

import workRoute from "./routes/workRoute.js";
import vacationRoute from "./routes/vacationRoute.js";
import sickRoute from "./routes/sickRoute.js";

dotenv.config();
const app = express();

// middleware
app.use(ratelimiter);
app.use(express.json());

app.use("/api/work", workRoute);
app.use("/api/vacation", vacationRoute);
app.use("/api/sick", sickRoute);

const PORT = process.env.PORT || 5002;
const DB_URL = process.env.DATABASE_URL;

// Old school style
app.get("/api/summary/:user_id", async (req, res) => {
    try {
        const { user_id } = req.params;

        const work = await sql`SELECT COALESCE(SUM(duration), 0) as Work_Total FROM work WHERE user_id = ${user_id}`;
        const vacation = await sql`SELECT SUM(AGE(end_date, start_date)) as Vocation_Total FROM vacation WHERE user_id = ${user_id}`;
        const sick = await sql`SELECT SUM(AGE(end_date, start_date)) as Sick_Total FROM sick WHERE user_id = ${user_id}`;

        const summary = {
            "work": work,
            "vacation": vacation,
            "sick": sick
        }

        res.status(200).json(summary);

    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/health", (req, res) => {
    res.send("Server is working!");
});

app.listen(PORT, () => {
    console.log("Server ist running on port: " + PORT);
});

// initWorkDB();
// initVacationDB();
// initSickDB();