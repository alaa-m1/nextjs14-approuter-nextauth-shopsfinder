"use client";
import React from "react";
import { UserSchemaType } from "../signup/page";
import { UseFormRegister } from "react-hook-form";

type GenderSelectProps = {
  register: UseFormRegister<UserSchemaType>;
  label: string;
  required?: boolean;
};

export const GenderSelect = ({
  label,
  required = false,
  register,
}: GenderSelectProps) => {
  return (
    <div className="p-0 my-[10px]">
      <div className={`relative w-[90%] text-left`}>
        <label htmlFor={"select-gender"} className="ml-[5px]">
          {label}&nbsp;{required && "*"}
        </label>
        <br />
        <select
          id={"select-gender"}
          defaultValue="custom"
          {...register("gender")}
          className={`py-2 pl-1 pr-[32px] my-[5px] border-solid border-[1px] border-[#ccc] rounded-[5px] w-full box-border outline-none [&>option]:block [&>option]:p-[50px]`}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="custom">Custom</option>
        </select>
      </div>
    </div>
  );
};
