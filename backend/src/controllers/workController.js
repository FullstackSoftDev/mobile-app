import { sql } from "../config/db.js";

export async function getWorkByUserID(req, res) {
    try {
        const { user_id } = req.params;
        const result = await sql`SELECT * FROM work WHERE user_id = ${user_id} ORDER BY created_at DESC`;
        res.status(200).json(result);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ error: error.message });
    }

}

export async function createWork(req, res) {
    try {
        const { user_id, first_name, last_name, category, description, date, duration } = req.body;

        if (!user_id || !first_name || !last_name || !category || !description || !date || !duration) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const entrie = await sql`
            INSERT INTO work(user_id, first_name, last_name, category, description, date, duration)
            VALUES (${user_id}, ${first_name}, ${last_name}, ${category}, ${description}, ${date}, ${duration})
            RETURNING *
        `;

        console.log(entrie);
        res.status(201).json(entrie[0]);

    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function deleteWorkByUserID(req, res) {
    try {
        const { id } = req.params;

        if (isNaN(parseInt(id))) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const result = await sql`DELETE FROM work WHERE id = ${id} RETURNING *`;

        if (result.length === 0) {
            return res.status(404).json({ message: "work not found" });
        }
        res.status(200).json({ message: "work deleted" });
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ error: error.message });
    }
}

