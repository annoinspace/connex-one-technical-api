import express from "express"
import cors from "cors"
// using listEndpoints as an additional package to view available endpoints
import listEndpoints from "express-list-endpoints"
import { forbiddenErrorHandler } from "./errorHandlers.js"
import timeRouter from "./api/time/index.js"

const server = express()
const port = 3001

// ---------------- WHITELIST FOR CORS ------------------
// adding the frontend url to cors to allow access to api
const corsOptions = {
  cors: {
    origin: process.env.FE_URL,

    methods: ["GET"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }
}

server.use(express.json())
server.use(cors(corsOptions))

// server.use(cors())

// ---------------- ENDPOINTS ------------------
//separating endpoints from the main server file so it's a little neater
server.use("/api", timeRouter)

// ---------------- ERROR HANDLER ------------------
server.use(forbiddenErrorHandler) //handling the 403 error

// ---------------- SERVER ------------------
server.listen(port, () => {
  // using console.table to see the available endpoints in terminal for clarity
  console.table(listEndpoints(server))
  console.log("server is running on port:", port)
})
