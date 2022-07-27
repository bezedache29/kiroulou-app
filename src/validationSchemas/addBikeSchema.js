import * as yup from 'yup'

const addBikeSchema = yup.object().shape({
  name: yup
    .string()
    .min(5, 'trop petit')
    .max(40, 'trop long!')
    .required('Le nom est obligatoire'),
  brand: yup
    .string()
    .min(6, 'trop petit')
    .max(30, 'trop long!')
    .required('La marque est obligatoire'),
  model: yup
    .string()
    .min(6, 'trop petit')
    .max(30, 'trop long!')
    .required('Le modèle est obligatoire'),
  type: yup
    .string()
    .min(6, 'trop petit')
    .max(30, 'trop long!')
    .required('Le type est obligatoire'),
  year: yup
    .number()
    .min(4, 'trop petit')
    .max(4, 'trop long!')
    .required("L'année est obligatoire"),
  weight: yup
    .number()
    .min(1, 'trop petit')
    .max(10, 'trop long!')
    .transform((_value, originalValue) =>
      Number(originalValue.replace(/,/, '.'))
    ),
})

export default addBikeSchema
