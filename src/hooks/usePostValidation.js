import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const MAX_FILE_SIZE = 55000000
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png']

const imageSchema = yup
  .object({
    image: yup
      .mixed()
      .test(
        'File size',
        'File is to big',
        value => !value[0] || (value && value[0]?.size <= MAX_FILE_SIZE)
      )
      .test(
        'format',
        'format not supported, only jpg, jpeg and png can be uploaded',
        value =>
          !value[0] || (value && SUPPORTED_FORMATS.includes(value[0]?.type))
      ),
  })
  .required()

const titleContentSchema = yup
  .object({
    title: yup.string().min(1).max(20).required(),
    content: yup.string().min(10).max(250).required(),
  })
  .required()

const commentString = yup
  .object({
    comment: yup.string().min(4).max(200).required(),
  })
  .required()

const postSchema = imageSchema.concat(titleContentSchema)
const commentSchema = imageSchema.concat(commentString)

export const useValidation = schema => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  })

  return { submitHandler: handleSubmit, errors, register, reset }
}

export const usePostValidation = () => useValidation(postSchema)

export const useCommentValidation = () => useValidation(commentSchema)
