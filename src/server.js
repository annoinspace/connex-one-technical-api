import express from "express"
// using listEndpoints as an additional package to view available endpoints
import listEndpoints from "express-list-endpoints"

const server = express()
const port = 3001

server.listen(port, () => {
  // using console.table to see the available endpoints in terminal for clarity
  console.table(listEndpoints(server))
  console.log("server is running on port:", port)
})
