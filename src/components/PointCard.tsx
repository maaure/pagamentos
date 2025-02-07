import { Point } from "../fakeApi";

interface PointCardProps {
  point: Point;
  onEdit: (point: Point) => void;
  onDelete: (id: string) => void;
}

export const PointCard = ({
  point,
  onDelete,
  onEdit,
}: PointCardProps): JSX.Element => {
  const { id, name, description, value, badges } = point;

  return (
    <li className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <strong className="text-lg font-medium text-gray-900">{name}</strong>
      <p className="text-sm text-gray-700 mt-1">{description}</p>
      <p className="text-sm text-gray-700 mt-1">Valor: R$ {value}</p>
      <p className="text-sm text-gray-700 mt-1">Badges: {badges.join(", ")}</p>
      <div className="mt-4 space-x-2">
        <button
          onClick={() => onEdit(point)}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(id)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Excluir
        </button>
      </div>
    </li>
  );
};
