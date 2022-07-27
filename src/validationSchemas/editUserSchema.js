import * as yup from 'yup'

const editUserSchema = yup.object().shape({
  email: yup
    .string()
    .email("L'email doit être un email valide")
    .min(5, 'trop petit')
    .max(40, 'trop long!')
    .required("L'email est obligatoire"),
  firstname: yup
    .string()
    .min(3, 'trop petit')
    .max(40, 'trop long!')
    .required('Le prénom est obligatoire'),
  lastname: yup
    .string()
    .min(3, 'trop petit')
    .max(40, 'trop long!')
    .required('Le nom est obligatoire'),
  address: yup
    .string()
    .min(6, 'trop petit')
    .max(30, 'trop long!')
    .required("L'adresse est obligatoire"),
  country: yup
    .string()
    .min(3, 'trop petit')
    .max(30, 'trop long!')
    .required('Le département est obligatoire'),
})

export default editUserSchema
