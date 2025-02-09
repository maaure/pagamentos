import { useState, useEffect } from "react";
import { MapComponent } from "./components/ui/MapComponent";
import { PointForm } from "./components/forms/PointForm";
import { PointList } from "./components/ui/PointList";
import { Point } from "./fakeApi";
import MapService from "./services/MapService";

export const App = () => {
  const [points, setPoints] = useState<Point[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<Point | undefined>(
    undefined,
  );
  const [isFormExpanded, setIsFormExpanded] = useState(false);
  const [isUpdateFormExpanded, setIsUpdateFormExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filteredPoints, setFilteredPoints] = useState<Point[] | undefined>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    MapService.getAllPoints()
      .then((data) => setPoints(data))
      .finally(() => {
        setLoading(false);
      });
  };

  const handleAddPoint = (point: Omit<Point, "id">) => {
    const newPoint = { ...point, id: Math.random().toString() };
    setPoints([...points, newPoint]);
  };

  const handleEditPoint = (point: Point) => {
    setIsUpdateFormExpanded(true);
    setSelectedPoint(point);
  };

  const handleUpdatePoint = (updatedPoint: Omit<Point, "id">) => {
    setPoints(
      points.map((p) =>
        p.id === selectedPoint?.id ? { ...updatedPoint, id: p.id } : p,
      ),
    );
    setSelectedPoint(undefined);
  };

  const handleDeletePoint = (id: string) => {
    setPoints(points.filter((p) => p.id !== id));
  };

  const handleMapClick = (lat: number, lng: number) => {
    if (selectedPoint) {
      setSelectedPoint({ ...selectedPoint, lat, lng });
    }
  };

  const handleCloseUpdateForm = () => {
    setIsUpdateFormExpanded(false);
    setSelectedPoint(undefined);
  };

  const handleCloseForm = () => {
    setIsFormExpanded(false);
  };

  const handleSearch = (search: string) => {
    if (search && search.length > 0) {
      setFilteredPoints(
        points.filter((p) =>
          p.name.toLowerCase().includes(search.toLowerCase()),
        ),
      );
    } else {
      setFilteredPoints(undefined);
    }
  };

  return (
    <aside className="flex flex-row h-screen w-screen">
      <PointList
        onDelete={handleDeletePoint}
        onEdit={handleEditPoint}
        onSearch={handleSearch}
        points={filteredPoints ?? points}
        onNew={() => {
          setIsFormExpanded(true);
        }}
        disableNew={isFormExpanded}
        loading={loading}
      />
      <div
        className={`overflow-hidden transition-all ease-in-out ${isFormExpanded ? "min-w-md " : "min-w-0 w-0"} bg-white`}
      >
        {isFormExpanded && (
          <PointForm onSubmit={() => {}} onClose={handleCloseForm} />
        )}
      </div>

      <div
        className={`overflow-hidden transition-all ease-in-out ${isUpdateFormExpanded ? "min-w-md " : "min-w-0 w-0"} bg-white`}
      >
        {isUpdateFormExpanded && (
          <PointForm
            onSubmit={() => {}}
            point={selectedPoint}
            onClose={handleCloseUpdateForm}
          />
        )}
      </div>
      <div className="w-full h-[100vh]">
        <MapComponent points={points} onMapClick={handleMapClick} />
      </div>
    </aside>
  );
};
