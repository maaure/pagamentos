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
  const { name, description, value, badges } = point;

  return (
    <li className="bg-white py-5 px-4 rounded-[15px] flex flex-col gap-2 border border-gray-300">
      {/* Título, descrição e dropdown */}
      <div className="flex flex-col gap-0">
        <div className="flex justify-between">
          <h2 className="text-lg font-medium text-gray-900">{name}</h2>
          <i className="fa-solid fa-ellipsis" />
        </div>
        <p className="text-xs text-normal text-gray-500">{description}</p>
      </div>
      {/* Valor e badges */}
      <p className="text-sm text-emerald-600">
        <i className="fa-solid fa-coins" /> R$ {value}
        <span className="text-sm text-gray-500">
          {` • ${badges.join(" • ")}`}
        </span>
      </p>
    </li>
  );
};
