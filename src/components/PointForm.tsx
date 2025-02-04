import { useState, useEffect } from "react";
import { Point } from "../fakeApi";

interface PointFormProps {
  point?: Point;
  onSubmit: (point: Omit<Point, "id">) => void;
}

export const PointForm = ({ point, onSubmit }: PointFormProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState(0);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [badges, setBadges] = useState("");

  useEffect(() => {
    if (point) {
      setName(point.name);
      setDescription(point.description);
      setValue(point.value);
      setLat(point.lat);
      setLng(point.lng);
      setBadges(point.badges.join(", "));
    } else {
      setName("");
      setDescription("");
      setValue(0);
      setLat(0);
      setLng(0);
      setBadges("");
    }
  }, [point]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      description,
      value,
      lat,
      lng,
      badges: badges.split(",").map((b) => b.trim()),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-lg w-100 mx-auto">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nome:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Descrição:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Valor:</label>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          required
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Latitude:</label>
        <input
          type="number"
          value={lat}
          onChange={(e) => setLat(Number(e.target.value))}
          required
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Longitude:</label>
        <input
          type="number"
          value={lng}
          onChange={(e) => setLng(Number(e.target.value))}
          required
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Badges (separados por vírgula):</label>
        <input
          type="text"
          value={badges}
          onChange={(e) => setBadges(e.target.value)}
          required
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
      >
        Salvar
      </button>
    </form>
  );
};
