"use client";

import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  placeholder?: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

const SearchInput: React.FC<InputProps> = ({
  placeholder,
  id = "off",
  register,
  required,
  errors,
  type = "search",
  disabled,
}) => {
  return (
    <div>
      <div className="mt-2">
        <input
          id={id}
          type={type}
          autoComplete={id}
          disabled={disabled}
          placeholder={placeholder}
          {...register(id, { required })}
          className={clsx(
            `
            form-input
            block 
            w-full 
            rounded-md 
            border-0 
            text-gray-900 
            shadow-sm 
            ring-1 
            ring-inset 
            ring-gray-300 
            dark:ring-gray-500
            placeholder:text-gray-400 
            dark:placeholder:text-gray-600
            dark:bg-zinc-800
          dark:text-white
            focus:ring-2 
            focus:ring-inset 
            focus:ring-sky-600 
            dark:focus:ring-sky-500
            sm:text-sm 
            sm:leading-6`,
            errors[id] && "focus:ring-rose-500 dark:focus:ring-rose-400",
            disabled && "opacity-50 cursor-default"
          )}
        />
      </div>
    </div>
  );
};

export default SearchInput;
