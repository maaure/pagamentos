import { useState, useEffect, useCallback } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const throttledSearch = useCallback(
    (value: string) => {
      if (timer) {
        clearTimeout(timer);
      }
      setTimer(
        setTimeout(() => {
          onSearch(value);
        }, 300),
      );
    },
    [onSearch, timer],
  );

  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    throttledSearch(value);
  };

  return (
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
        value={query}
        onChange={handleChange}
      />
    </label>
  );
};
