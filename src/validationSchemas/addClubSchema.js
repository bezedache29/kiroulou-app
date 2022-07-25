import * as yup from 'yup'

const addClubSchema = yup.object().shape({
  name: yup
    .string()
    .min(5, 'trop petit')
    .max(40, 'trop long!')
    .required('Le nom est obligatoire'),
  shortName: yup
    .string()
    .min(6, 'trop petit')
    .max(30, 'trop long!')
    .required('Le nom raccourci est obligatoire'),
  address: yup
    .string()
    .min(6, 'trop petit')
    .max(30, 'trop long!')
    .required("L'adresse est obligatoire"),
  country: yup
    .string()
    .min(6, 'trop petit')
    .max(30, 'trop long!')
    .required('Le département est obligatoire'),
  website: yup.string().min(6, 'trop petit').max(30, 'trop long!'),
})

export default addClubSchema
