import { faker } from "@faker-js/faker";

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
  const baseLat = -5.79448; // Latitude de Natal, RN
  const baseLng = -35.211; // Longitude de Natal, RN

  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.company.name(),
    description: faker.lorem.sentence(),
    value: faker.number.int({ min: 10, max: 1000 }),
    lat: baseLat + faker.number.float({ min: -0.05, max: 0.05 }),
    lng: baseLng + faker.number.float({ min: -0.05, max: 0.05 }),
    badges: Array.from({ length: 3 }, () => faker.commerce.productAdjective()),
  }));
};
class FakeApi {
  points: Point[] = [];

  constructor() {
    this.points = generatePoints(4);
  }

  async get(): Promise<Point[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(structuredClone(this.points));
      }, 1000);
    });
  }

  async put(id: string, point: Omit<Point, "id">): Promise<Point> {
    this.points = this.points.map((p) => (p.id === id ? { ...point, id } : p));
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(structuredClone({ ...point, id }));
      }, 1000);
    });
  }

  async post(point: Omit<Point, "id">): Promise<Point> {
    const newPoint = { ...point, id: faker.string.uuid() };
    this.points.push(newPoint);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(structuredClone(newPoint));
      }, 1000);
    });
  }

  async delete(id: string): Promise<void> {
    this.points = this.points.filter((p) => p.id !== id);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }
}

export default new FakeApi();
