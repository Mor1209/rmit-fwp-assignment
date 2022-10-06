import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import YupPassword from 'yup-password'
YupPassword(yup)

// yup validation schema for register and login
// uses strong password(1x special char, 1x capital,
// 1x small, 1x digit and an length of 8)
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
    username: yup.string().min(3).required(),
  })
  .required()

const registerSchema = loginSchema.concat(nameSchema)

export const updateSchema = yup
  .object({
    username: yup.string().min(3),
    email: yup.string().email(),
  })
  .required()

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

export const useUpdateValidation = onSubmit =>
  useUserValidation(updateSchema, onSubmit)

export const useMfaValidation = onSubmit =>
  useUserValidation(mfaSchema, onSubmit)
