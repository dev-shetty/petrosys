"use server"

import { pool } from "./db"

export async function getBranches() {
  const { rows } = await pool.query("SELECT * FROM branch")
  return rows
}

export async function getBranchById(id) {
  const { rows } = await pool.query("SELECT * FROM branch WHERE id = $1", [id])
  return rows[0]
}

export async function createInvoice({
  id,
  branch_id,
  quantity,
  customer_phone,
  fuel_type,
  fuel_price,
  total,
  method,
}) {
  const date = new Date().toISOString().split("T")[0]
  const { rows } = await pool.query(
    "INSERT INTO invoice (id, branch_id, customer_phone, quantity, fuel_type, fuel_price, total, method, date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
    [
      id,
      branch_id,
      customer_phone,
      quantity,
      fuel_type,
      fuel_price,
      total,
      method,
      date,
    ]
  )

  await updateSales(branch_id, date)

  return rows[0]
}

export async function getInvoices() {
  const { rows } = await pool.query("SELECT * FROM invoice")
  return rows
}

export async function getSalesByDate(date) {
  const { rows } = await pool.query("SELECT * FROM invoice WHERE date = $1", [
    date,
  ])
  return rows
}

export async function getSalesByBranchIdAndDate(id, date) {
  const { rows } = await pool.query(
    "SELECT * FROM invoice WHERE branch_id = $1 AND date = $2",
    [id, date]
  )
  return rows
}

export async function getInvoicesByBranch(id) {
  const { rows } = await pool.query(
    "SELECT * FROM invoice WHERE branch_id = $1",
    [id]
  )
  return rows
}

export async function getInvoiceById(id) {
  const { rows } = await pool.query("SELECT * FROM invoice WHERE id = $1", [id])
  return rows[0]
}

export async function getSalesByBranch(id) {
  const { rows } = await pool.query(
    "SELECT * FROM sales WHERE branch_id = $1",
    [id]
  )
  return rows
}

export async function getEmployeesByBranch(id) {
  const { rows } = await pool.query(
    "SELECT * FROM employee WHERE branch_id = $1",
    [id]
  )
  return rows
}

export async function updateSales(id, date) {
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
