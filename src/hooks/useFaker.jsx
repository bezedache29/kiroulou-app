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
      message: faker.lorem.paragraph(),
      is_club: 0,
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
      url: 'https://luehangs.site/pic-chat-app-images/beautiful-blond-blonde-hair-478544.jpg',
      // uri: 'https://i.ytimg.com/vi/xDW6GCD1pxA/maxresdefault.jpg',
    }

    return image
  }

  const createFakeHike = () => {
    const hike = {
      id: faker.datatype.uuid(),
      position: { lat: 48.50044705226551, lng: -4.425040802537101 },
      name: faker.random.words(2),
      address: faker.address.streetAddress(),
      city: faker.address.city(),
      postCode: faker.address.zipCode('####'),
      description: faker.lorem.paragraph(),
      flyer:
        'https://www.ats-sport.com/admin/fichiers_epreuves/FLYER-RandoVTTdesVignes_2021_D_page-0001-2021-11-04-13-51-25.jpg',
      images: [],
      icon: `
      <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.9 1a8.6 8.6 0 00-8.6 8.6c0 4.35 7.2 12.05 8.42 13.33a.24.24 0 00.35 0c1.22-1.27 8.42-9 8.42-13.33A8.6 8.6 0 0011.9 1zm0 11.67A3.07 3.07 0 1115 9.6a3.07 3.07 0 01-3.1 3.07z"/>
      </svg>
      `,
      size: [24, 24],
      publicPrice: 6,
      privatePrice: 4,
      date: new Date('2022', '7', '10'),
      // date: faker.date.birthdate({ min: 2022, max: 2023, mode: 'year' }),
      trips: [
        {
          distance: faker.random.numeric(2),
          heightDifference: faker.random.numeric(3),
          difficulty: +faker.random.numeric(1, {
            bannedDigits: ['0', '5', '6', '7', '8', '9'],
          }),
          supplies: faker.random.numeric(1, {
            bannedDigits: ['0', '4', '5', '6', '7', '8', '9'],
          }),
        },
        {
          distance: faker.random.numeric(2),
          heightDifference: faker.random.numeric(3),
          difficulty: +faker.random.numeric(1, {
            bannedDigits: ['0', '5', '6', '7', '8', '9'],
          }),
          supplies: faker.random.numeric(1, {
            bannedDigits: ['0', '4', '5', '6', '7', '8', '9'],
          }),
        },
      ],
    }

    for (let i = 0; i < 5; i++) {
      hike.images.push(createFakeAlbum())
    }

    return hike
  }

  return {
    getRandom,
    createFakePost,
    createFakeClub,
    createFakeAlbum,
    createFakeUser,
    createFakeBike,
    createFakeHike,
  }
}
