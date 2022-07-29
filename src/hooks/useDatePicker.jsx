/**
 * Permet d'ouvrir / fermer le datePicker
 */
import { useState } from 'react'

const useDatePicker = () => {
  const [datePickerVisibility, setDatePickerVisibility] = useState(false)

  // Permet d'ouvrir la modal DatePicker
  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  // Permet de fermer la modal DatePicker
  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  return {
    datePickerVisibility,
    setDatePickerVisibility,
    showDatePicker,
    hideDatePicker,
  }
}

export default useDatePicker
