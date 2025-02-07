import { useState, useEffect } from "react";
import { MapComponent } from "./components/MapComponent";
import { PointForm } from "./components/PointForm";
import { PointList } from "./components/PointList";
import { fetchPoints, Point } from "./fakeApi";

export const App = () => {
  const [points, setPoints] = useState<Point[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<Point | null>(null);

  useEffect(() => {
    fetchPoints().then((data) => setPoints(data));
  }, []);

  const handleAddPoint = (point: Omit<Point, "id">) => {
    const newPoint = { ...point, id: Math.random().toString() };
    setPoints([...points, newPoint]);
  };

  const handleEditPoint = (point: Point) => {
    console.log(point);
    setSelectedPoint(point);
  };

  const handleUpdatePoint = (updatedPoint: Omit<Point, "id">) => {
    setPoints(
      points.map((p) =>
        p.id === selectedPoint?.id ? { ...updatedPoint, id: p.id } : p,
      ),
    );
    setSelectedPoint(null);
  };

  const handleDeletePoint = (id: string) => {
    setPoints(points.filter((p) => p.id !== id));
  };

  const handleMapClick = (lat: number, lng: number) => {
    if (selectedPoint) {
      setSelectedPoint({ ...selectedPoint, lat, lng });
    }
  };

  return (
    <div className="flex flex-row h-screen w-screen">
      <div className="shadow-lg min-w-md">
        <PointList
          onDelete={handleDeletePoint}
          onEdit={handleEditPoint}
          points={points}
        />
      </div>
      <div className="w-full h-[100vh]">
        <MapComponent points={points} onMapClick={handleMapClick} />
      </div>
    </div>
  );
};
