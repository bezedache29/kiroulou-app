import * as yup from 'yup'

const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email("L'email doit être un email valide")
    .min(5, 'trop petit')
    .max(40, 'trop long!')
    .required("L'email est obligatoire"),
  password: yup
    .string()
    .min(6, 'trop petit')
    .max(30, 'trop long!')
    .required('Le mot de passe est obligatoire'),
  passwordConfirm: yup
    .string()
    .min(6, 'trop petit')
    .max(30, 'trop long!')
    .required('La confirmation de mot de passe est obligatoire')
    .oneOf(
      [yup.ref('password'), null],
      'Le mot de passe de confirmation ne correspond pas'
    ),
})

export default registerSchema
