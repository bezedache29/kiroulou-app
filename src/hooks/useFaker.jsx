/**
 * Hook pour avoir des fakes datas.
 * Utile pour les tests et l'intégration
 */
import { faker } from '@faker-js/faker/locale/fr'

export default function useFaker() {
  // Récupère un nombre aléatoire entre 2 nombres
  const getRandom = (min, max) => Math.random() * (max - min) + min

  // Permet de créer un post fake
  const createFakePost = (i = 1) => {
    const isHike = getRandom(1, 2) === 1
    const post = {
      id: faker.datatype.uuid(),
      username: faker.internet.userName(),
      hike: isHike ? faker.company.companyName() : '',
      club: faker.company.companyName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      registeredAt: faker.date.past(),
      description: faker.lorem.paragraph(),
      title: `${i} - ${faker.commerce.product()}`,
      likes: faker.random.numeric(2),
      comments: faker.random.numeric(),
      hypes: faker.random.numeric(2),
    }
    return post
  }

  // Permet de créer un club fake
  const createFakeClub = (i = 1) => {
    const club = {
      id: faker.datatype.uuid(),
      avatar: faker.image.avatar(),
      name: `${i} - ${faker.company.companyName()}`,
      city: faker.address.city(),
      members: faker.random.numeric(2),
      posts: faker.random.numeric(3),
      dateHike: faker.date.birthdate({ min: 2022, max: 2023, mode: 'year' }),
    }
    return club
  }

  // Permet de créer un user fake
  const createFakeUser = () => {
    const user = {
      id: faker.datatype.uuid(),
      avatar: faker.internet.avatar(),
      email: faker.internet.email(),
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      address: faker.address.city(),
      country: faker.address.county(),
      club: faker.company.companyName(),
      posts: faker.random.numeric(),
      dateMember: faker.date.birthdate({ min: 1990, max: 2022, mode: 'year' }),
    }
    return user
  }

  // Permet de créer un bike fake
  const createFakeBike = () => {
    const bike = {
      id: faker.datatype.uuid(),
      name: faker.random.words(2),
      brand: faker.random.words(1),
      model: faker.random.words(1),
      date: faker.date.birthdate({ min: 1970, max: 2022, mode: 'year' }),
      type: faker.random.words(1),
      weight: faker.random.numeric(2),
      image: faker.image.sports(),
    }
    return bike
  }

  // Permet de créer une image en relation avec un user fake
  const createFakeAlbum = () => {
    const image = {
      id: faker.datatype.uuid(),
      userId: faker.datatype.uuid(),
      // uri: faker.image.imageUrl(),
      // uri: faker.image.imageUrl(1234, 2345),
      uri: 'https://luehangs.site/pic-chat-app-images/beautiful-blond-blonde-hair-478544.jpg',
    }

    return image
  }

  return {
    getRandom,
    createFakePost,
    createFakeClub,
    createFakeAlbum,
    createFakeUser,
    createFakeBike,
  }
}
