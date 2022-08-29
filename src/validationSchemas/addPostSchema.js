import * as yup from 'yup'

const addPostSchema = yup.object().shape({
  title: yup
    .string()
    .min(5, 'trop petit')
    .max(40, 'trop long!')
    .required('Le titre est obligatoire'),
  description: yup
    .string()
    .min(6, 'trop petit')
    .max(500, 'trop long!')
    .required('Le message est obligatoire'),
})

export default addPostSchema
