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
import zxcvbn from "zxcvbn";
import React, { useEffect, useMemo, useState } from "react";
import { BeatLoader } from "react-spinners";
import { SubmitButton, TextField } from "@/shared";
import { GenderSelect, TermsPanel } from "../components";
import { toast } from "react-toastify";
import validator from "validator";
import { createNewUser } from "@/app/actions";

const UserSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "The first name must be at least 2 characters")
      .max(32, "The first name must be less than 32 characters")
      .regex(
        /^[a-zA-Z]+$/,
        "The first name must not contains any special characters"
      ),
    lastName: z
      .string()
      .min(2, "The last name must be at least 2 characters")
      .max(32, "The last name must be less than 32 characters")
      .regex(
        /^[a-zA-Z]+$/,
        "The last name must not contains any special characters"
      ),
    email: z.string().email("You must enter a valid Email"),
    mobile: z.string().refine(
      (value) => {
        if (value) return validator.isMobilePhone(value);
        return true;
      },
      {
        message: "Please enter a valid phone number",
      }
    ),
    address: z.string(),
    gender: z.union([
      z.literal("male"),
      z.literal("female"),
      z.literal("custom"),
    ]),
    password: z
      .string()
      .min(8, "The password must be at least 8 characters")
      .max(60, "The password must be less than 60 characters"),
    confirmPassword: z.string(),
    accept: z.literal(true, {
      errorMap: () => ({
        message: "You should accept terms and conditions",
      }),
    }),
  })
  .refine((formData) => formData.password === formData.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type UserSchemaType = z.infer<typeof UserSchema>;

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
    const response = await createNewUser(formData);

    if ([400, 500].includes(response.status)) {
      toast.error(response.message);
    } else {
      toast.success(response.message);
      reset();
    }
  };

  const { password } = watch();
  useEffect(() => {
    const calculatePasswordStrengthScore = () => {
      return zxcvbn(password ?? "").score;
    };
    setPasswordScore(calculatePasswordStrengthScore());
  }, [password]);

  const passwordScoreColor = useMemo(() => {
    if (passwordScore <= 2) return "#f00";
    if (passwordScore < 4) return "#ff0";
    return "#0f0";
  }, [passwordScore]);

  const PasswordScoreLabel = useMemo(() => {
    if (passwordScore <= 2)
      return <span className="text-[#f00] font-bold">Weak</span>;
    if (passwordScore < 4)
      return <span className="text-[#ff0] font-bold">Medium</span>;
    return <span className="text-[#0f0] font-bold">Strong</span>;
  }, [passwordScore]);

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
          required
        ></TextField>
        <TextField
          name="lastName"
          label="Last Name"
          placeholder="Last name"
          icon={<MdPerson />}
          register={register}
          errors={errors.lastName?.message}
          disabled={isSubmitting}
          required
        ></TextField>
        <TextField
          name="email"
          label="Email"
          placeholder="Email"
          icon={<MdEmail />}
          register={register}
          errors={errors.email?.message}
          disabled={isSubmitting}
          required
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
          name="address"
          label="Address"
          placeholder="Address"
          icon={<MdBusiness />}
          register={register}
          errors=""
          disabled={isSubmitting}
        ></TextField>
        <GenderSelect label="Gender" register={register} />

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
          required
          defaultValue=""
        ></TextField>
        {watch().password &&
          watch().password.length > 0 &&
          !errors.password?.message && (
            <div className="grid items-center grid-cols-6 mb-[15px] ml-[10px] m-[-10px]">
              <div>{PasswordScoreLabel}</div>
              {Array.from(Array(4).keys()).map((_, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: passwordScoreColor,
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
          required
        ></TextField>
        <br />
        <TermsPanel register={register} error={errors.accept?.message} />
        <SubmitButton
          isLoading={isSubmitting}
          loadingIndicator={<BeatLoader color="#36d7b7" size={10} />}
          variant="contained"
        >
          Sign Up
        </SubmitButton>
      </form>
    </div>
  );
};

export default Page;
