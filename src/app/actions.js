import postgres from "pg"
const { Pool } = postgres

export const pool = new Pool({
  user: process.env.NEXT_PUBLIC_DB_USER,
  database: process.env.NEXT_PUBLIC_DB_NAME,
  password: process.env.NEXT_PUBLIC_DB_PASSWORD,
  host: "localhost",
  port: 5432,
})
