"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScaleLoader } from "react-spinners";
import { toast } from "react-toastify";
import { SubmitButton, TextField } from "@/shared";
import { MdEmail } from "react-icons/md";
import { sendResetPasswordLink } from "@/app/actions/sendResetPasswordLink";
const UserSchema = z.object({
  email: z.string().email("You must enter a valid Email"),
});

type ForgetSchemaType = z.infer<typeof UserSchema>;

const Page = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ForgetSchemaType>({ resolver: zodResolver(UserSchema) });
  const onSubmit: SubmitHandler<ForgetSchemaType> = async (formData) => {
    if (formData.email === process.env.NEXT_PUBLIC_TESTING_EMAIL) {
      alert(
        `Cannot update user password, becuase you are using your a testing account "${process.env.NEXT_PUBLIC_TESTING_EMAIL}"`
      );
    } else {
      const response = await sendResetPasswordLink(formData);
      if ([400, 500].includes(response.status)) {
        toast.error(response.message);
      } else {
        toast.success(response.message);
        reset();
      }
    }
  };

  return (
    <div className="w-full">
      <h4 className="text-gray-800 font-bold text-center">
        Forget your password
      </h4>
      <form onSubmit={handleSubmit(onSubmit)} style={{ margin: "5px 10px" }}>
        <TextField
          name="email"
          label="Email"
          placeholder="Email"
          icon={<MdEmail />}
          register={register}
          errors={errors.email?.message}
          disabled={isSubmitting}
        ></TextField>
        <SubmitButton
          isLoading={isSubmitting}
          loadingIndicator={<ScaleLoader color="#36d7b7" height={20} />}
          variant="contained"
          label="Send reset link"
        />
      </form>
    </div>
  );
};

export default Page;
