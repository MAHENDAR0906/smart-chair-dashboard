require("dotenv").config()

const express = require("express")
const cors = require("cors")
const db = require("./db")
const startSensorSimulation = require("./simulateSensors")

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Smart Chair Backend Running")
})

app.get("/employees", (req, res) => {
  const sql = `
    SELECT 
      e.*,
      c.chair_id,
      c.status,
      c.current_employee_id,
      c.current_rfid,
      c.left_pressure,
      c.right_pressure,
      c.heart_rate,
      c.temperature,
      c.current_posture_score,
      c.posture_status AS current_posture_status,
      c.current_user_state,
      c.productivity_score,
      c.chair_action
    FROM employees e
    LEFT JOIN chairs c
    ON e.assigned_chair_id = c.chair_id
    ORDER BY e.employee_id
  `

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(results)
  })
})

app.get("/chairs", (req, res) => {
  db.query("SELECT * FROM chairs ORDER BY chair_id", (err, results) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(results)
  })
})

app.post("/employees", (req, res) => {
  const name = req.body.name
  const department = req.body.department
  const chairIdRaw =
    req.body.assigned_chair_id ||
    req.body.chair_id ||
    req.body.chairId ||
    req.body.assignedChairId

  if (!name || !department || !chairIdRaw) {
    return res.status(400).json({
      error: "Name, department and chair ID are required"
    })
  }

  const chairId = String(chairIdRaw).trim().toUpperCase()

  db.query(
    "SELECT * FROM employees WHERE assigned_chair_id = ?",
    [chairId],
    (err, existing) => {
      if (err) return res.status(500).json({ error: err.message })

      if (existing.length > 0) {
        return res.status(400).json({ error: "Chair ID already assigned" })
      }

      db.query("SELECT COUNT(*) AS total FROM employees", (err, countResult) => {
        if (err) return res.status(500).json({ error: err.message })

        const nextNo = countResult[0].total + 1
        const employeeId = `EMP${String(nextNo).padStart(3, "0")}`
        const rfidTag = `RFID${String(nextNo).padStart(3, "0")}`

        const employeeSql = `
          INSERT INTO employees
          (employee_id, name, rfid_tag, department, assigned_chair_id)
          VALUES (?, ?, ?, ?, ?)
        `

        db.query(
          employeeSql,
          [employeeId, name, rfidTag, department, chairId],
          (err) => {
            if (err) return res.status(500).json({ error: err.message })

            const chairSql = `
              INSERT INTO chairs
              (chair_id, status, current_employee_id, current_rfid)
              VALUES (?, 'Assigned', ?, ?)
              ON DUPLICATE KEY UPDATE
                status = 'Assigned',
                current_employee_id = VALUES(current_employee_id),
                current_rfid = VALUES(current_rfid)
            `

            db.query(chairSql, [chairId, employeeId, rfidTag], (err) => {
              if (err) return res.status(500).json({ error: err.message })

              res.json({
                message: "Employee added and chair assigned successfully",
                employee_id: employeeId,
                rfid_tag: rfidTag,
                assigned_chair_id: chairId
              })
            })
          }
        )
      })
    }
  )
})

app.get("/sensor-history/:employeeId", (req, res) => {
  const employeeId = req.params.employeeId

  const sql = `
    SELECT *
    FROM sensor_readings
    WHERE employee_id = ?
    ORDER BY created_at DESC
    LIMIT 20
  `

  db.query(sql, [employeeId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(results.reverse())
  })
})

app.get("/latest-sensor/:employeeId", (req, res) => {
  const employeeId = req.params.employeeId

  const sql = `
    SELECT *
    FROM sensor_readings
    WHERE employee_id = ?
    ORDER BY created_at DESC
    LIMIT 1
  `

  db.query(sql, [employeeId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(results[0] || null)
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  startSensorSimulation()
})