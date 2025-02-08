import { fetchPoints, Point } from "../fakeApi";

class MapService {
  async getAllPoints(): Promise<Point[]> {
    return fetchPoints();
  }
}

export default new MapService();
