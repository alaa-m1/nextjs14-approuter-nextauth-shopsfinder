"use client";
import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  useId,
  useState,
} from "react";
import { MdClose } from "react-icons/md";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { Alert } from "./Alert";

type TextFieldProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label: string;
  icon: JSX.Element;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any;
};
export const TextField = ({
  name,
  label,
  icon,
  register,
  errors,
  type,
  ...props
}: TextFieldProps) => {
  const id = useId();
  const [showPassword, setShowPassword] = useState(false);
  const handleOnShowIconClick = () => {
    setShowPassword((p) => !p);
  };
  console.log("errors=", errors);
  return (
    <div className="p-0 my-[10px]">
      <div className={`relative w-[90%] text-left`}>
        <div className="absolute bottom-3 left-1 [&_svg]:p-0 [&_svg]:mb-1 [&_svg]:ml-1.1">
          {icon}
        </div>
        <label htmlFor={`input-${id}`} className="ml-[5px]">
          {label}
        </label>
        <br />
        <input
          id={`input-${id}`}
          type={showPassword ? "text" : type}
          name={name}
          {...register(name)}
          {...props}
          className={`py-2 pl-[22px] pr-[32px] my-[5px] border-solid border-[1px] border-[${
            errors ? "#d32f2f" : "#ccc"
          }] rounded-[5px] w-full box-border outline-none`}
        />
        {(name === "password" || name === "confirmPassword") && (
          <div
            className={`absolute bottom-3 right-[${
              errors ? "35px" : "10px"
            }] [&_svg]:p-0 [&_svg]:mb-[3px] [&_svg]:ml-[5px]`}
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
