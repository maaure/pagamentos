import fakeApi, { Point } from "../fakeApi";

class MapService {
  async getAllPoints(): Promise<Point[]> {
    return fakeApi.get();
  }
  async updatePoint(id: string, point: Omit<Point, "id">): Promise<Point> {
    return fakeApi.put(id, point);
  }

  async createPoint(point: Omit<Point, "id">): Promise<Point> {
    return fakeApi.post(point);
  }

  async deletePoint(id: string): Promise<void> {
    return fakeApi.delete(id);
  }
}

export default new MapService();
