import { useState, useEffect } from "react";
import { MapComponent } from "../components/ui/MapComponent";
import { PointForm } from "../components/forms/PointForm";
import { PointList } from "../components/ui/PointList";
import { Point } from "../fakeApi";
import MapService from "../services/MapService";
import { useFeedback } from "../components/hooks/useFeedback";

export const Pagamentos = () => {
  const [points, setPoints] = useState<Point[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<Point | undefined>(
    undefined,
  );
  const [isFormExpanded, setIsFormExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filteredPoints, setFilteredPoints] = useState<Point[] | undefined>();
  const [shouldRenderForm, setShouldRenderForm] = useState(false);
  const { pushFeedback } = useFeedback();

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
    MapService.createPoint(point)
      .then((newPoint) => {
        pushFeedback("success");
        setPoints((prev) => {
          return [...prev, newPoint];
        });
      })
      .finally(() => {
        handleCloseForm();
        setSelectedPoint(undefined);
      });
  };

  const handleEditPoint = (point: Point) => {
    setSelectedPoint(point);
    handleOpenForm();
  };

  const handleUpdatePoint = (point: Omit<Point, "id">) => {
    if (!selectedPoint || !point) return;

    MapService.updatePoint(selectedPoint?.id, point)
      .then((updatedPoint) => {
        pushFeedback("success");
        setPoints((prev) => [
          ...prev.filter((p) => p.id !== selectedPoint.id),
          updatedPoint,
        ]);
      })
      .finally(() => {
        handleCloseForm();
        setSelectedPoint(undefined);
      });
  };

  const handleDeletePoint = (id: string) => {
    MapService.deletePoint(id)
      .then(() => {
        pushFeedback("success");
        fetchData();
      })
      .finally(() => {
        handleCloseForm();
        setSelectedPoint(undefined);
      });
  };

  const handleMapClick = (lat: number, lng: number) => {
    if (selectedPoint) {
      setSelectedPoint({ ...selectedPoint, lat, lng });
    }
  };

  const handleOpenForm = () => {
    setIsFormExpanded(true);
    setShouldRenderForm(true);
  };

  const handleCloseForm = () => {
    setIsFormExpanded(false);
    setTimeout(() => {
      setShouldRenderForm(false);
      setSelectedPoint(undefined);
    }, 300);
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
        onNew={handleOpenForm}
        disableNew={isFormExpanded}
        loading={loading}
      />

      <button
        className="btn btn-primary"
        onClick={() => {
          pushFeedback("success");
        }}
      >
        asdasasd
      </button>
      <div
        className={`overflow-hidden absolute transition-all duration-300 ease-in-out ${
          isFormExpanded ? "w-md min-w-md" : "w-0 min-w-0"
        } bg-white z-2000`}
      >
        {shouldRenderForm && (
          <PointForm
            onSubmit={selectedPoint ? handleUpdatePoint : handleAddPoint}
            point={selectedPoint}
            onClose={handleCloseForm}
          />
        )}
      </div>
      <MapComponent points={points} onMapClick={handleMapClick} />
    </aside>
  );
};
