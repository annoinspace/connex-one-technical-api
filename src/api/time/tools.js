import prometheusMiddleware from "express-prometheus-middleware"
import createHttpError from "http-errors"

//middleware to serve Prometheus-format metrics
export const metricsMiddleware = prometheusMiddleware({
  metricsPath: "/metrics",
  collectDefaultMetrics: true,
  requestDurationBuckets: [0.1, 0.5, 1, 1.5]
})

//middleware to check if the authorization header is mysecrettoken
export const checkAuthorizationHeader = (req, res, next) => {
  const token = req.headers.authorization
  if (token !== "mysecrettoken") {
    // using the http-errors package to handle creating errors
    next(createHttpError(403, `Invalid or missing authorization token`))
  } else {
    next()
  }
}
