import useAxios from './useAxios'

const useServices = () => {
  const { axiosPostWithToken } = useAxios()

  const checkIfAddressExist = async (address) => {
    const response = await axiosPostWithToken(
      'addresses/isAlreadyExist',
      address
    )
    return response
  }

  const createAddress = async (address) => {
    const response = await axiosPostWithToken('addresses/create', address)
    return response
  }

  return {
    checkIfAddressExist,
    createAddress,
  }
}

export default useServices
