import AppError from '../utils/appError.js'

const handleSequelizeUniqueConstraintError = err => {
  const message = `${err.errors[0].path} already exists!`
  return new AppError(message, 400)
}

// more error information during development
const errorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  })
}

// less error information during production
const errorProd = (err, res) => {
  // Operational error ie. error within the code of this app
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    })
  } else {
    // console error log for errors outside of this code, like used modules
    console.error('ERROR', err)

    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    })
  }
}

export default (err, req, res, next) => {
  const env = process.env.NODE_ENV || 'development'
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  if (env === 'development') {
    errorDev(err, res)
  } else if (env === 'production') {
    let error = { ...err }
    console.log(error)
    if (error.name === 'SequelizeUniqueConstraintError')
      error = handleSequelizeUniqueConstraintError(error)
    errorProd(error, res)
  }
}
