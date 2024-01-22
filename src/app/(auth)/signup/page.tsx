"use client";
import {
  MdLock,
  MdBusiness,
  MdOutlinePhoneAndroid,
  MdEmail,
  MdPerson,
} from "react-icons/md";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import validator from "validator";
import zxcvbn from "zxcvbn";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { ScaleLoader } from "react-spinners";
import { SubmitButton, TextField } from "@/shared";
import { TermsPanel } from "../components";

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
    // address: z
    //   .string()
    //   .min(8, "The address must be at least 8 characters")
    //   .max(100, "The address must be less than 100 characters"),
    email: z.string().email("You must enter a valid Email"),
    // mobile: z.string().refine(validator.isMobilePhone, {
    //   message: "Please enter a valid phone number",
    // }),
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
    console.log("Submit ...");
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
          errors=""
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
          errors=""
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
        {watch().password &&
          watch().password.length > 0 &&
          !errors.password?.message && (
            <div className="grid items-center grid-cols-6 mb-[15px] ml-[10px] m-[-10px]">
              <div>
                {passwordScore <= 2 ? (
                  <span className="text-[#f00] font-bold">Weak</span>
                ) : passwordScore < 4 ? (
                  <span className="text-[#ff0] font-bold">Medium</span>
                ) : (
                  <span className="text-[#0f0] font-bold">Strong</span>
                )}
              </div>
              {Array.from(Array(4).keys()).map((item, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor:
                      passwordScore <= 2
                        ? "#f00"
                        : passwordScore < 4
                        ? "#ff0"
                        : "#0f0",
                  }}
                  className={`h-[8px] rounded-[5px] mx-[5px] box-border`}
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
        <TermsPanel register={register} error={errors.accept?.message} />
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
