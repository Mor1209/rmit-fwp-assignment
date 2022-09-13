import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ES6
import * as yup from 'yup'
import YupPassword from 'yup-password'
YupPassword(yup) // extend yup

const loginSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().password().required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'passwords must match'),
  })
  .required()

const nameSchema = yup
  .object({
    name: yup.string().required(),
  })
  .required()

const registerSchema = loginSchema.concat(nameSchema)

const mfaSchema = yup.object({ token: yup.string().required() }).required()

export const useUserValidation = (schema, onSubmit) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  return { submitHandler: handleSubmit(onSubmit), errors, register }
}

export const useRegisterValidation = onSubmit =>
  useUserValidation(registerSchema, onSubmit)

export const useLoginValidation = onSubmit =>
  useUserValidation(loginSchema, onSubmit)

export const useMfaValidation = onSubmit =>
  useUserValidation(mfaSchema, onSubmit)
