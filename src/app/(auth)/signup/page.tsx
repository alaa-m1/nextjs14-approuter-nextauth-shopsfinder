"use client";
import { MdLock, MdBusiness, MdOutlinePhoneAndroid, MdEmail, MdPerson } from "react-icons/md";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import validator from "validator";
import zxcvbn from "zxcvbn";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { ScaleLoader } from "react-spinners";
import Link from "next/link";
import { Alert, SubmitButton, TextField } from "@/shared";

const UserSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "The first name must be at least 2 characters")
      .max(32, "The first name must be less than 32 characters")
      .regex(
        new RegExp("^[a-zA-Z]+$"),
        "The first name must not contains any special characters"
      ),
    lastName: z
      .string()
      .min(2, "The last name must be at least 2 characters")
      .max(32, "The last name must be less than 32 characters")
      .regex(
        new RegExp("^[a-zA-Z]+$"),
        "The last name must not contains any special characters"
      ),
    address: z
      .string()
      .min(8, "The address must be at least 8 characters")
      .max(100, "The address must be less than 100 characters"),
    email: z.string().email("You must enter a valid Email"),
    mobile: z.string().refine(validator.isMobilePhone, {
      message: "Please enter a valid phone number",
    }),
    password: z
      .string()
      .min(8, "The password must be at least 8 characters")
      .max(60, "The password must be less than 60 characters"),
    confirmPassword: z.string(),
    accept: z.literal(true, {
      errorMap: () => ({
        message: "You should accept terms and conditions before continuing",
      }),
    }),
  })
  .refine((formData) => formData.password === formData.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type UserSchemaType = z.infer<typeof UserSchema>;

const Page = () => {
  const [passwordScore, setPasswordScore] = useState(0);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserSchemaType>({ resolver: zodResolver(UserSchema) });
  const onSubmit: SubmitHandler<UserSchemaType> = async (formData) => {
    console.log('Submit ...')
    try {
      const { data } = await axios.post("/api/auth/signup", {
        ...formData,
      });
      reset();
      toast.success(data.message);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const { password } = watch();
  useEffect(() => {
    const calculatePasswordStrengthScore = () => {
      return zxcvbn(password ? password : "").score;
    };
    setPasswordScore(calculatePasswordStrengthScore());
  }, [password]);
  return (
    <div className="w-full">
      <h4 className="text-gray-800 font-bold text-center">Sign Up</h4>
      <form onSubmit={handleSubmit(onSubmit)} style={{ margin: "5px 10px" }}>
        <TextField
          name="firstName"
          label="First Name"
          placeholder="First name"
          icon={<MdPerson />}
          register={register}
          errors={errors.firstName?.message}
          disabled={isSubmitting}
        ></TextField>
        <TextField
          name="lastName"
          label="Last Name"
          placeholder="Last name"
          icon={<MdPerson />}
          register={register}
          errors={errors.lastName?.message}
          disabled={isSubmitting}
        ></TextField>
        <TextField
          name="address"
          label="Address"
          placeholder="Address"
          icon={<MdBusiness />}
          register={register}
          errors={errors.address?.message}
          disabled={isSubmitting}
        ></TextField>
        <TextField
          name="email"
          label="Email"
          placeholder="Email"
          icon={<MdEmail />}
          register={register}
          errors={errors.email?.message}
          disabled={isSubmitting}
        ></TextField>
        <TextField
          name="mobile"
          label="Mobile number"
          placeholder="Mobile number"
          icon={<MdOutlinePhoneAndroid />}
          register={register}
          errors={errors.mobile?.message}
          disabled={isSubmitting}
        ></TextField>
        <TextField
          name="password"
          label="Password"
          placeholder=""
          icon={<MdLock />}
          type="password"
          register={register}
          errors={errors.password?.message}
          disabled={isSubmitting}
          autoComplete="off"
          defaultValue=""
        ></TextField>
        {watch().password && watch().password.length > 0 && (
          <div className="grid grid-cols-6 mb-[15px] ml-[10px]">
            {Array.from(Array(5).keys()).map((item, index) => (
              <div
                key={index}
                className={`bg-[${
                  passwordScore <= 2
                    ? "#f00"
                    : passwordScore < 4
                    ? "#ff0"
                    : "#0f0"
                }] h-[8px] rounded-[5px] mx-[5px] box-border`}
              ></div>
            ))}
          </div>
        )}
        <TextField
          name="confirmPassword"
          label="Confirm Password"
          placeholder=""
          icon={<MdLock />}
          type="password"
          register={register}
          errors={errors.confirmPassword?.message}
          disabled={isSubmitting}
          autoComplete="off"
        ></TextField>
        <br />
        <div className="text-left mb-[20px]">
          <input type="checkbox" id="accept" {...register("accept")} />
          <label htmlFor="id">
            I accept &nbsp;
            <Link href="/terms" className="no-underline">
              terms and conditions
            </Link>
          </label>
          {errors.accept && (
            <Alert severity="error" className="mt-[2px]">
              {errors.accept?.message}
            </Alert>
          )}
        </div>
        <SubmitButton
          isLoading={isSubmitting}
          loadingIndicator={<ScaleLoader color="#36d7b7" />}
          variant="contained"
          color="primary"
          type="submit"
          className="w-[50%] mx-auto"
        >
          Sign Up
        </SubmitButton>
      </form>
    </div>
  );
};

export default Page;
