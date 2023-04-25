import express from "express"
import { validate } from "jsonschema"
import { timeSchema } from "./model.js" //keeping the schema separate
import { checkAuthorizationHeader, metricsMiddleware } from "./tools.js" // importing middleware

const timeRouter = express.Router()

timeRouter.get("/time", checkAuthorizationHeader, async (req, res, next) => {
  try {
    const now = Math.floor(Date.now() / 1000) // current time in epoch seconds
    const response = { epoch: now } //creating an object to match schema type
    const validationResult = validate(response, timeSchema)
    if (validationResult.valid) {
      res.json(response)
    } else {
      res.status(500).json({ error: "Invalid response schema" })
    }
  } catch (error) {
    next(error)
  }
})

timeRouter.get("/metrics", checkAuthorizationHeader, metricsMiddleware, async (req, res, next) => {
  try {
    //nothing more to see here as the express-prometheus-middleware does all the work
    console.log("Prometheus-format metrics requested")
  } catch (error) {
    next(error)
  }
})

export default timeRouter
