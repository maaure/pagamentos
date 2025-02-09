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

class FakeApi {
  points: Point[] = [];

  constructor() {
    this.points = generatePoints(4);
  }

  async get(): Promise<Point[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.points);
      }, 1000);
    });
  }

  async put(id: string, point: Omit<Point, "id">): Promise<Point> {
    this.points = this.points.map((p) => (p.id === id ? { ...point, id } : p));
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...point, id });
      }, 1000);
    });
  }

  async post(point: Omit<Point, "id">): Promise<Point> {
    const newPoint = { ...point, id: faker.string.uuid() };
    this.points.push(newPoint);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(newPoint);
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
