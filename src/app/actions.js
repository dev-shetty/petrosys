import postgres from "pg"
const { Pool } = postgres

export const pool = new Pool({
  user: process.env.NEXT_PUBLIC_DB_USER,
  database: process.env.NEXT_PUBLIC_DB_NAME,
  password: process.env.NEXT_PUBLIC_DB_PASSWORD,
  host: "localhost",
  port: 5432,
})

export async function getBranches() {
  "use server"
  const { rows } = await pool.query("SELECT * FROM branch")
  return rows
}

export async function getBranchById(id) {
  "use server"
  const { rows } = await pool.query("SELECT * FROM branch WHERE id = $1", [id])
  return rows[0]
}

export async function createInvoice({
  branchId,
  customerId,
  quantity,
  total,
  fuel_type,
  fuel_price,
}) {
  "use server"

  const { rows } = await pool.query(
    "INSERT INTO invoice (branch_id, customer_id, quantity, total, fuel_type, fuel_price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [branchId, customerId, quantity, total, fuel_type, fuel_price]
  )

  return rows[0]
}

export async function getInvoices() {
  "use server"
  const { rows } = await pool.query("SELECT * FROM invoice")
  return rows
}

export async function getSalesByDate(date) {
  "use server"
  const { rows } = await pool.query("SELECT * FROM invoice WHERE date = $1", [
    date,
  ])
  return rows
}

export async function getSalesByBranchIdAndDate(id, date) {
  "use server"
  const { rows } = await pool.query(
    "SELECT * FROM invoice WHERE branch_id = $1 AND date = $2",
    [id, date]
  )
  return rows
}

export async function getInvoicesByBranch(id) {
  "use server"
  const { rows } = await pool.query(
    "SELECT * FROM invoice WHERE branch_id = $1",
    [id]
  )
  return rows
}

export async function getInvoiceById(id) {
  "use server"
  const { rows } = await pool.query("SELECT * FROM invoice WHERE id = $1", [id])
  return rows[0]
}

export async function getSalesByBranch(id) {
  "use server"
  const { rows } = await pool.query(
    "SELECT * FROM sales WHERE branch_id = $1",
    [id]
  )
  return rows
}

export async function getEmployeesByBranch(id) {
  "use server"
  const { rows } = await pool.query(
    "SELECT * FROM employee WHERE branch_id = $1",
    [id]
  )
  return rows
}

export async function updateSales(id, date) {
  "use server"
  const { rows } = await pool.query(
    `
  UPDATE SALES
  SET total_sales = total_sales + (
          SELECT SUM(quantity * fuel_price) 
          FROM INVOICE 
          WHERE SALES.branch_id = INVOICE.branch_id 
          AND INVOICE.date = $1
      ),
      total_stock = total_stock + (
          SELECT SUM(quantity) 
          FROM INVOICE 
          WHERE SALES.branch_id = INVOICE.branch_id 
          AND INVOICE.date = $1
      )
  WHERE date = $1 AND branch_id = $2
  `,
    [date, id]
  )
}
