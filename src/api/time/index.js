import express from "express"
import { validate } from "jsonschema"
import { timeSchema } from "./model.js" //keeping the schema separate
import prometheusMiddleware from "express-prometheus-middleware"
import createHttpError from "http-errors"

const timeRouter = express.Router()

timeRouter.use(prometheusMiddleware())

//middleware to check if the authorization header is mysecrettoken
const checkAuthorizationHeader = (req, res, next) => {
  const token = req.headers.authorization
  if (token !== "mysecrettoken") {
    // using the http-errors package to handle creating errors
    next(createHttpError(403, `Invalid or missing authorization token`))
  } else {
    next()
  }
}

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

timeRouter.get("/metrics", checkAuthorizationHeader, async (req, res, next) => {
  try {
    // This endpoint will serve Prometheus-format metrics, nothing more to see here
    console.log("Prometheus-format metrics requested")
  } catch (error) {
    next(error)
  }
})

export default timeRouter
