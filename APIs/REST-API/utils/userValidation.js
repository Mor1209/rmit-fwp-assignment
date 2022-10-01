import * as yup from 'yup'
import YupPassword from 'yup-password'

YupPassword(yup)

// yup validation schema for register and login
// uses strong password(1x special char, 1x capital,
// 1x small, 1x digit and an length of 8)
const nameSchema = yup
  .object({
    username: yup.string().min(3).required(),
  })
  .required()

export const loginSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().password().required(),
  })
  .required()

export const registerSchema = loginSchema.concat(nameSchema)

export const mfaSchema = yup
  .object({ token: yup.string().required() })
  .required()

export const updateSchema = yup
  .object({
    username: yup.string().min(3),
    email: yup.string().email(),
  })
  .required()
