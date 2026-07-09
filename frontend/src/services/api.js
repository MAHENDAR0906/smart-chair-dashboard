const API_URL ="http://localhost:5000"

async function handleResponse(res) {
  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error || "API request failed")
  }

  return data
}

export async function getEmployees() {
  const res = await fetch(`${API_URL}/employees`)
  return handleResponse(res)
}

export async function getChairs() {
  const res = await fetch(`${API_URL}/chairs`)
  return handleResponse(res)
}

export async function getSensorHistory(employeeId) {
  const res = await fetch(`${API_URL}/sensor-history/${employeeId}`)
  return handleResponse(res)
}

export async function addEmployee(employeeData) {
  const res = await fetch(`${API_URL}/employees`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employeeData)
  })

  return handleResponse(res)
}

export async function assignChair(assignmentData) {
  const res = await fetch(`${API_URL}/assign-chair`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(assignmentData)
  })

  return handleResponse(res)
}