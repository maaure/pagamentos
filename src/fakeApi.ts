import { faker } from '@faker-js/faker';

export interface Point {
  id: string;
  name: string;
  description: string;
  value: number;
  lat: number;
  lng: number;
  badges: string[];
}

export const generatePoints = (count: number): Point[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.company.name(),
    description: faker.lorem.sentence(),
    value: faker.number.int({ min: 10, max: 1000 }),
    lat: +faker.location.latitude(),
    lng: +faker.location.longitude(),
    badges: Array.from({ length: 3 }, () => faker.commerce.productAdjective()),
  }));
};

export const fetchPoints = async (): Promise<Point[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generatePoints(2));
    }, 1000);
  });
};