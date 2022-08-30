import * as yup from 'yup'

const editUserSchema = yup.object().shape({
  email: yup
    .string()
    .email("L'email doit être un email valide")
    .min(5, 'trop petit')
    .max(40, 'trop long!')
    .required("L'email est obligatoire"),
  firstname: yup.string().min(3, 'trop petit').max(40, 'trop long!'),
  lastname: yup.string().min(3, 'trop petit').max(40, 'trop long!'),
})

export default editUserSchema
