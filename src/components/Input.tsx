import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, ...props }, ref) => {
    return (
      <>
        <div>
          <label className="relative text-sm text-gray-700 font-medium block pb-2">
            {label}
          </label>
          <input className="input-rounded w-full" {...props} ref={ref} />
        </div>
      </>
    );
  },
);
