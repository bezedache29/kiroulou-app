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
    const isTrek = getRandom(1, 2) === 1
    const post = {
      id: faker.datatype.uuid(),
      username: faker.internet.userName(),
      trek: isTrek ? faker.company.companyName() : '',
      club: faker.company.companyName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      registeredAt: faker.date.past(),
      description: faker.lorem.paragraph(),
      title: `${i} - ${faker.commerce.product()}`,
    }
    return post
  }

  // Permet de créer un club fake
  const createFakeClub = (i = 1) => {
    const club = {
      id: faker.datatype.uuid(),
      uri: faker.image.avatar(),
      name: `${i} - ${faker.company.companyName()}`,
      city: faker.address.city(),
      members: faker.random.numeric(2),
      posts: faker.random.numeric(3),
    }
    return club
  }

  // Permet de créer une image en relation avec un user fake
  const createFakeAlbum = () => {
    const image = {
      userId: faker.datatype.uuid(),
      uri: faker.image.imageUrl(),
    }

    return image
  }

  return {
    getRandom,
    createFakePost,
    createFakeClub,
    createFakeAlbum,
  }
}
