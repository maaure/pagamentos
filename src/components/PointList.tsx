import { Point } from "../fakeApi";
import { PointCard } from "./PointCard";

interface PointListProps {
  points: Point[];
  onEdit: (point: Point) => void;
  onDelete: (id: string) => void;
}

export const PointList = ({ points, onEdit, onDelete }: PointListProps) => {
  return (
    <>
      <div className="flex flex-col p-6 gap-4">
        <h2 className="text-lg font-semibold">Pontos Cadastrados</h2>
        <input
          type="text"
          className="input-rounded"
          placeholder="Pesquise nos seus pagamentos..."
        />
      </div>
      <ul className="space-y-4">
        {points.map((point) => (
          <PointCard
            key={point.id}
            point={point}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </ul>
      <div className="p-6">
        <button className="btn btn-primary" onClick={() => {}}>
          Novo Pagamento
        </button>
      </div>
    </>
  );
};
