import * as yup from 'yup'

const addTripSchema = yup.object().shape({
  distance: yup
    .number('Ce champ doit être un nombre')
    .min(5, 'trop petit')
    .required('La distance est obligatoire'),
  heightDifference: yup.number('Ce champ doit être un nombre'),
  // supplies: yup.number('Ce champ doit être un nombre').min(0, 'trop petit'),
  // difficulty: yup
  //   .boolean()
  //   .required('Vous devez choisir une difficulté de parcours')
  //   .oneOf([0, 1], 'Selectionner une difficulté est obligatoire'),
  difficulty: yup
    .number()
    .required('Selectionner une difficulté est obligatoire'),
})

export default addTripSchema
