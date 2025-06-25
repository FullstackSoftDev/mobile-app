import { sql } from "../config/db.js";

export async function getSickByUserID(req, res) {
    try {
        const { user_id } = req.params;
        const result = await sql`SELECT * FROM sick WHERE user_id = ${user_id} ORDER BY created_at DESC`;
        res.status(200).json(result);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ error: error.message });
    }
}

export async function createSick(req, res) {
    try {
        const { user_id, first_name, last_name, certificate, note, start_date, end_date } = req.body;

        if (!user_id || !first_name || !last_name || !certificate || !note || !start_date || !end_date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const vacation = await sql`
                INSERT INTO sick(user_id, first_name, last_name, certificate, note, start_date, end_date)
                VALUES (${user_id}, ${first_name}, ${last_name}, ${certificate}, ${note}, ${start_date}, ${end_date})
                RETURNING *
            `;

        console.log(vacation);
        res.status(201).json(vacation[0]);

    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function deleteSickByUserID(req, res) {
    try {
        const { id } = req.params;

        if (isNaN(parseInt(id))) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const result = await sql`DELETE FROM sick WHERE id = ${id} RETURNING *`;

        if (result.length === 0) {
            return res.status(404).json({ message: "sick not found" });
        }
        res.status(200).json({ message: "sick deleted" });
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ error: error.message });
    }
}

