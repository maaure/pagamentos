import { Point } from "../fakeApi";
import { PointCard } from "./PointCard";
import { SearchBar } from "./SearchBar";

interface PointListProps {
  points: Point[];
  onEdit: (point: Point) => void;
  onDelete: (id: string) => void;
}

export const PointList = ({ points, onEdit, onDelete }: PointListProps) => {
  return (
    <div className="h-screen flex flex-col">
      <div
        className="flex flex-col p-6 gap-4 bg-white"
        style={{ boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.04)" }}
      >
        <h2 className="text-lg font-semibold">Pontos Cadastrados</h2>
        <SearchBar
          onSearch={(s) => {
            console.log(s);
          }}
        />
      </div>
      <ul className="flex flex-col flex-1 overflow-y-auto p-6 gap-4">
        {points.map((point) => (
          <PointCard
            key={point.id}
            point={point}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </ul>
      <div
        className="p-6 bg-white shadow-md-up"
        style={{ boxShadow: "0px -8px 16px rgba(0, 0, 0, 0.04)" }}
      >
        <button className="btn btn-primary" onClick={() => {}}>
          Novo Pagamento
        </button>
      </div>
    </div>
  );
};
