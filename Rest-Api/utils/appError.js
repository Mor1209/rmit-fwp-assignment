'use strict'

export default class AppError extends Error {
  constructor(message, statusCode) {
    super()

    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
    this.message = message
    this.isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }
}
