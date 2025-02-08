import { useState, useEffect } from "react";
import { MapComponent } from "./components/MapComponent";
import { PointForm } from "./components/PointForm";
import { PointList } from "./components/PointList";
import { fetchPoints, Point } from "./fakeApi";
import { Point } from "leaflet";

export const App = () => {
  const [points, setPoints] = useState<Point[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<Point | null>(null);
  const [isFormExpanded, setIsFormExpanded] = useState(false);

  useEffect(() => {
    fetchPoints().then((data) => setPoints(data));
  }, []);

  const handleAddPoint = (point: Omit<Point, "id">) => {
    const newPoint = { ...point, id: Math.random().toString() };
    setPoints([...points, newPoint]);
  };

  const handleEditPoint = (point: Point) => {
    setIsFormExpanded(true);
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
    <aside className="flex flex-row h-screen w-screen">
      <div className="shadow-[8px_0_16px_rgba(0,0,0,0.01)] z-1 min-w-md">
        <PointList
          onDelete={handleDeletePoint}
          onEdit={handleEditPoint}
          points={points}
          onNew={() => {
            setIsFormExpanded(true);
          }}
        />
      </div>
      <div
        className={`overflow-hidden transition-all ease-in-out ${isFormExpanded ? "min-w-md " : "min-w-0 w-0"} bg-white`}
      >
        <PointForm
          onSubmit={() => {}}
          point={selectedPoint}
          onClose={() => setIsFormExpanded(false)}
        />
      </div>
      <div className="w-full h-[100vh]">
        <MapComponent points={points} onMapClick={handleMapClick} />
      </div>
    </aside>
  );
};
