"use client";
import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  useId,
  useState,
} from "react";
import { MdClose } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Alert } from "./Alert";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type TextFieldProps<T extends FieldValues> = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "name"
> & {
  name: Path<T>;
  label: string;
  icon: JSX.Element;
  register: UseFormRegister<T>;
  errors: string | undefined;
};
export const TextField = <T extends FieldValues>({
  name,
  label,
  icon,
  register,
  errors,
  type,
  required,
  ...props
}: TextFieldProps<T>) => {
  const id = useId();
  const [showPassword, setShowPassword] = useState(false);
  const handleOnShowIconClick = () => {
    setShowPassword((p) => !p);
  };
  return (
    <div className="p-0 my-[10px]">
      <div className={`relative w-[90%] text-left`}>
        <div className="absolute bottom-3 left-1 [&_svg]:p-0 [&_svg]:mb-1 [&_svg]:ml-1.1">
          {icon}
        </div>
        <label htmlFor={`input-${id}`} className="ml-[5px]">
          {label}&nbsp;{required && "*"}
        </label>
        <br />
        <input
          id={`input-${id}`}
          type={showPassword ? "text" : type}
          {...register(name)}
          {...props}
          style={{ borderColor: errors ? "#d32f2f" : "#ccc" }}
          className={`py-2 pl-[22px] pr-[32px] my-[5px] border-solid border-[1px] rounded-[5px] w-full box-border outline-none`}
        />
        {(name === "password" || name === "confirmPassword") && (
          <div
            style={{ right: errors ? "35px" : "10px" }}
            className={`absolute bottom-3 [&_svg]:p-0 [&_svg]:mb-[3px] [&_svg]:ml-[5px]`}
          >
            {showPassword ? (
              <FaEye onClick={handleOnShowIconClick} />
            ) : (
              <FaEyeSlash onClick={handleOnShowIconClick} />
            )}
          </div>
        )}
        {errors && (
          <div className="absolute bottom-3 right-[10px] [&_svg]:p-0 [&_svg]:mb-[3px] [&_svg]:ml-[5px] text-[#d32f2f]">
            <MdClose />
          </div>
        )}
      </div>
      {errors && <Alert severity="error">{errors}</Alert>}
    </div>
  );
};
