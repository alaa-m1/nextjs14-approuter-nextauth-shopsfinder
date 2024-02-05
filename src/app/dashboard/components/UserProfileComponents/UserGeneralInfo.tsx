"use client";
import {
  MdBusiness,
  MdOutlinePhoneAndroid,
  MdEmail,
  MdPerson,
} from "react-icons/md";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { BeatLoader } from "react-spinners";
import {
  GenderSelect,
  SubmitButton,
  TextField,
  externalProviders,
} from "@/shared";
import { toast } from "react-toastify";
import validator from "validator";
import { UserInfo } from "@/types";
import { schemaForType } from "@/types/new-types.d";
import { useSession } from "next-auth/react";
import { updateUserInfo } from "@/app/actions/updateUserInfo";

const UserGeneralInfoSchema = schemaForType<
  Omit<UserInfo, "id" | "image" | "provider">
>()(
  z.object({
    userName: z
      .string()
      .min(2, "The user name must be at least 2 characters")
      .max(32, "The user name must be less than 32 characters")
      .regex(
        /^[a-zA-Z]+$/,
        "The user name must not contains any special characters"
      ),
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
  })
);

type UserSchemaType = z.infer<typeof UserGeneralInfoSchema>;

export const UserGeneralInfo = ({ userInfo }: { userInfo: UserInfo }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserSchemaType>({
    defaultValues: {
      userName: userInfo.userName,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      address: userInfo.address,
      mobile: userInfo.mobile,
      gender: userInfo.gender,
    },
    resolver: zodResolver(UserGeneralInfoSchema),
  });
  const { update } = useSession();
  const onSubmit: SubmitHandler<UserSchemaType> = async (formData) => {
    const response = await updateUserInfo({ ...formData, id: userInfo.id });
    if ([400, 500].includes(response.status)) {
      toast.error(response.message);
    } else {
      update({
        userName: formData.userName,
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        mobile: formData.mobile,
        gender: formData.gender,
      });
      toast.success(response.message);
      reset();
    }
  };

  return (
    <fieldset className="fieldset-border">
      <legend>Update user information</legend>
      <form onSubmit={handleSubmit(onSubmit)} style={{ margin: "5px 10px" }}>
        <TextField
          name="userName"
          label="User Name"
          placeholder="User name"
          icon={<MdPerson />}
          register={register}
          errors={errors.userName?.message}
          disabled={
            isSubmitting || externalProviders.includes(userInfo.provider)
          }
          required
        ></TextField>
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
          disabled
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
        <SubmitButton
          isLoading={isSubmitting}
          loadingIndicator={<BeatLoader color="#36d7b7" size={10} />}
          variant="contained"
          label="Save"
        />
      </form>
    </fieldset>
  );
};
