"use client";

import { InputHTMLAttributes, forwardRef } from "react";
import { FieldError } from "react-hook-form";
import clsx from "clsx";

type InputProps = {
  label?: string;
  error?: FieldError;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div>
        {label && (
          <label className="block mb-1 text-sm font-medium">{label}</label>
        )}
        <input
          ref={ref}
          {...props}
          className={clsx(
            "w-full p-2 border rounded",
            error ? "border-red-500" : "border-gray-300",
            className
          )}
        />
        <div className="h-4">
          {error && <p className="text-red-500 text-xs">{error.message}</p>}
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
