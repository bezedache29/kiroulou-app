import * as yup from 'yup'

const addHikeSchema = yup.object().shape({
  name: yup
    .string()
    .min(5, 'trop petit')
    .max(29, 'trop long!')
    .required('Le nom est obligatoire'),
  description: yup
    .string()
    .min(6, 'trop petit')
    .max(500, 'trop long!')
    .required('La description est obligatoire'),
  publicPrice: yup.string().required('Le prix public est obligatoire'),
  privatePrice: yup.string().nullable(),
})

export default addHikeSchema
