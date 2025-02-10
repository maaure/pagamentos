import { Point } from "../../fakeApi";
import { LoadingSpinner } from "./LoadingSpinner";
import { PointCard } from "./PointCard";
import { SearchBar } from "../fields/SearchBar";
import { FeedbackBar } from "./FeedbackBar";

interface PointListProps {
  points: Point[];
  onEdit: (point: Point) => void;
  onDelete: (id: string) => void;
  onSearch: (search: string) => void;
  onNew: () => void;
  disableNew?: boolean;
  loading?: boolean;
}

export const PointList = ({
  points,
  onEdit,
  onDelete,
  onNew,
  onSearch,
  disableNew,
  loading,
}: PointListProps) => {
  return (
    <div className="h-screen flex flex-col w-md min-w-md z-1000 bg-white">
      <div className="flex flex-col p-6 gap-4 bg-white shadow-[0_8px_16px_rgba(0,0,0,0.04)]">
        <h2 className="text-lg font-semibold">Pontos Cadastrados</h2>
        <SearchBar onSearch={onSearch} />
      </div>
      <FeedbackBar />
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <ul className="space-y-4 flex-1 overflow-y-auto p-6 gap-4 scrollbar-thin">
          {points.map((point) => (
            <PointCard
              key={point.id}
              point={point}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
      <div className="p-6 bg-white shadow-[0_-8px_16px_rgba(0,0,0,0.04)]">
        <button
          className="btn btn-primary w-full"
          onClick={onNew}
          disabled={disableNew}
        >
          Novo Pagamento
        </button>
      </div>
    </div>
  );
};
