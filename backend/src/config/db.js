import { neon } from "@neondatabase/serverless";
import "dotenv/config";

export const sql = neon(process.env.DATABASE_URL);

// category z.B. Kundendienst / Baustelle / Beratung usw. (drop down Feld)
export async function initWorkDB() {
    try {
        await sql`CREATE TABLE IF NOT EXISTS work(
            id SERIAL PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            first_Name VARCHAR(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            category VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            date DATE NOT NULL,
            duration DECIMAL(10,2) NOT NULL,
            created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )`;
        console.log("Database initialized successfully");
    } catch (error) {
        console.log("Error init DB", error);
        process.exit(1);
    }
}

// type -> Urlaub / Sonderurlaub / nicht bezahlter Urlaub (drop down Feld)
export async function initVacationDB() {
    try {
        await sql`CREATE TABLE IF NOT EXISTS vacation(
            id SERIAL PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            first_Name VARCHAR(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            type VARCHAR(255) NOT NULL,
            note VARCHAR(255) NOT NULL,
            start_date DATE NOT NULL,
            end_date DATE NOT NULL,
            created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )`;
        console.log("Database initialized successfully");
    } catch (error) {
        console.log("Error init DB", error);
        process.exit(1);
    }
}

export async function initSickDB() {
    try {
        await sql`CREATE TABLE IF NOT EXISTS sick(
            id SERIAL PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            first_Name VARCHAR(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            certificate BOOLEAN NOT NULL,
            note VARCHAR(255) NOT NULL DEFAULT 'Keine Notiz hinterlassen',
            start_date DATE NOT NULL,
            end_date DATE NOT NULL,
            created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )`;
        console.log("Database initialized successfully");
    } catch (error) {
        console.log("Error init DB", error);
        process.exit(1);
    }
}

