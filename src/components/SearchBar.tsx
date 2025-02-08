import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [search, setSearch] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(search);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label
        htmlFor="search"
        className="relative text-gray-400 focus-within:text-gray-600 block"
      >
        <button
          className="fa-solid fa-magnifying-glass cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-3"
          type="submit"
          aria-hidden="false"
        />
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Pesquise nos seus pagamentos..."
          className="input w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </label>
    </form>
  );
};
