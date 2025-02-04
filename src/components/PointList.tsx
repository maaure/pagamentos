import { Point } from '../fakeApi';

interface PointListProps {
  points: Point[];
  onEdit: (point: Point) => void;
  onDelete: (id: string) => void;
}

export const PointList = ({ points, onEdit, onDelete }: PointListProps) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Pontos Cadastrados</h2>
      <ul className="space-y-4">
        {points.map((point) => (
          <li key={point.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <strong className="text-lg font-medium text-gray-900">{point.name}</strong>
            <p className="text-sm text-gray-700 mt-1">{point.description}</p>
            <p className="text-sm text-gray-700 mt-1">Valor: R$ {point.value}</p>
            <p className="text-sm text-gray-700 mt-1">Badges: {point.badges.join(', ')}</p>
            <div className="mt-4 space-x-2">
              <button
                onClick={() => onEdit(point)}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(point.id)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
