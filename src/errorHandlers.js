//handling the 403 error if authorization is not valid
export const forbiddenErrorHandler = (err, req, res, next) => {
  if (err.status === 403) {
    res.status(403).send({ success: false, message: "Invalid or missing authorization token" })
  } else {
    next(err)
  }
}
