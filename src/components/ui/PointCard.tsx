import { useState } from "react";
import { Point } from "../../fakeApi";

interface PointCardProps {
  point: Point;
  onEdit?: (point: Point) => void;
  onDelete?: (id: string) => void;
}

export const PointCard = ({
  point,
  onDelete,
  onEdit,
}: PointCardProps): JSX.Element => {
  const { name, description, value, badges } = point;

  const handleDelete = () => {
    onDelete?.(point.id);
  };

  const handleEdit = () => {
    onEdit?.(point);
  };

  return (
    <li className="bg-white py-5 px-4 rounded-[15px] flex flex-col gap-2 border border-gray-300">
      {/* Título, descrição e dropdown */}
      <div className="flex flex-col gap-0">
        <div className="flex justify-between">
          <h2 className="text-lg font-medium self-center text-gray-900">
            {name}
          </h2>
          {(onEdit || onDelete) && (
            <Dropdown onDelete={handleDelete} onEdit={handleEdit} />
          )}
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

interface DropdownProps {
  onEdit: () => void;
  onDelete: () => void;
}

const Dropdown = ({ onEdit, onDelete }: DropdownProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="dropdown"
      onMouseOver={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="btn btn-circle btn-ghost">
        <i className="fa-solid fa-ellipsis" />
      </button>

      <div
        className={`absolute bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44  transistion-all ease-in-out duration-100 ${open ? "max-h-96" : "max-h-0"} overflow-hidden`}
      >
        <ul className="text-sm text-gray-700">
          {onEdit && (
            <li>
              <a
                className="block px-4 py-4 hover:bg-gray-100 cursor-pointer"
                onClick={onEdit}
              >
                <i className="fa-solid fa-pencil pe-2" />
                Editar
              </a>
            </li>
          )}

          {onDelete && (
            <li>
              <a
                className="block px-4 py-4 text-red-400 hover:bg-gray-100 cursor-pointer"
                onClick={onDelete}
              >
                <i className="fa-solid fa-trash pe-2" />
                Excluir
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
