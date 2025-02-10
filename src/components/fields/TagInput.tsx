import { useState, KeyboardEvent, ChangeEvent, forwardRef } from "react";

interface TagInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  defaultValue?: string;
}

export const TagInput = forwardRef<HTMLInputElement, TagInputProps>(
  ({ label, placeholder, onChange, value, ...props }, ref) => {
    const [inputValue, setInputValue] = useState<string>("");
    const [tags, setTags] = useState<string[]>(
      value ? (value as string).split(",").map((s) => s.trim()) : [],
    );

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === " " && inputValue.trim() !== "") {
        event.preventDefault();
        setTags((prevTags) => [...prevTags, inputValue.trim()]);
        setInputValue("");
      } else if (event.key === "Backspace" && inputValue === "") {
        const lastTag = tags[tags.length - 1];
        if (lastTag) {
          setTags(tags.slice(0, -1));
          setInputValue(lastTag);
        }
      }
    };

    return (
      <>
        <label
          className={`text-sm text-gray-700 font-medium block`}
          htmlFor={props.name}
        >
          {label}
          <div className="input relative">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <div
                  key={`${tag}-${index}`}
                  className="flex items-center bg-gray-100 border border-gray-300 rounded-lg px-2 py-1 text-sm"
                >
                  {tag}
                </div>
              ))}
              <input
                type="text"
                className="hidden"
                id="tags"
                onChange={onChange}
                value={tags.join(",")}
                ref={ref}
              />
              <input
                id={props.name}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="flex-1 min-w-[50px] outline-none bg-transparent"
                placeholder={placeholder}
                {...props}
              />
            </div>
          </div>
        </label>
      </>
    );
  },
);

TagInput.displayName = "TagInput";
