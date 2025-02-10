import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  currency?: string;
  error?: string;
}
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, currency, ...props }, ref) => {
    return (
      <>
        <div>
          <label
            className={`text-sm text-gray-700 font-medium block ${error ? "text-red-500  " : ""}`}
            htmlFor={props.name}
          >
            {label}
          </label>
          <div className="relative">
            {currency && (
              <p className="absolute top-1/2 transform -translate-y-1/2 left-3">
                {currency}
              </p>
            )}
            <input
              id={props.name}
              className={`input w-full ${error && "error"} ${currency && "indent-5"}`}
              {...props}
              ref={ref}
            />
            {error && props.name && (
              <span className="text-red-500 text-sm">{error}</span>
            )}
          </div>
        </div>
      </>
    );
  },
);
