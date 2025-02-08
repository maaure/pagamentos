import { forwardRef } from "react";
import { FieldErrors } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errors?: FieldErrors;
}
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, errors, ...props }, ref) => {
    const hasErrors = props.name && errors && errors[props.name];

    return (
      <>
        <div>
          <label
            className={`relative text-sm text-gray-700 font-medium block pb-2  ${hasErrors ? "text-red-500" : ""}`}
          >
            {label}
          </label>
          <input
            className={`input-rounded w-full ${hasErrors && "error"}`}
            {...props}
            ref={ref}
          />
          {hasErrors && props.name && (
            <span className="text-red-500 text-sm">
              {errors[props.name]?.message?.toString() || ""}
            </span>
          )}
        </div>
      </>
    );
  },
);
