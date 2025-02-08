import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <>
        <div>
          <label
            className={`relative text-sm text-gray-700 font-medium block pb-2  ${error ? "text-red-500  " : ""}`}
          >
            {label}
          </label>
          <input
            className={`input w-full ${error && "error"}`}
            {...props}
            ref={ref}
          />
          {error && props.name && (
            <span className="text-red-500 text-sm">{error}</span>
          )}
        </div>
      </>
    );
  },
);
