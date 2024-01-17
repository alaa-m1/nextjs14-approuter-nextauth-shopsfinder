"use client";
import React from "react";
import { MdEmail, MdLock } from "react-icons/md";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScaleLoader } from "react-spinners";
import { LinkButton, LoadingButton, TextField } from "@/shared";

const UserSchema = z.object({
  email: z.string().email("You must enter a valid Email"),
  password: z.string(),
});

type UserSchemaType = z.infer<typeof UserSchema>;

const Page = () => {
  const {
    register,
    handleSubmit,
    // watch,
    // reset,
    formState: { errors, isSubmitting },
  } = useForm<UserSchemaType>({ resolver: zodResolver(UserSchema) });
  const onSubmit: SubmitHandler<UserSchemaType> = async () => {
    console.log("Submit ....");
  };

  return (
    <div className="w-full">
      <h4 className="text-gray-800 font-bold text-center">Sign In</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="my-[5px] mx-[10px] w-full"
      >
        <TextField
          name="email"
          label="Email"
          placeholder="Email"
          icon={<MdEmail />}
          register={register}
          errors={errors.email?.message}
          disabled={isSubmitting}
          autoComplete="off"
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
        <LoadingButton
          isLoading={isSubmitting}
          loadingIndicator={<ScaleLoader color="#36d7b7" />}
          variant="contained"
          color="primary"
          type="submit"
          className="w-[50%] mx-auto"
        >
          Sign In
        </LoadingButton>
      </form>
      <div className="[&_a]:no-underline">
        <LinkButton href="/forgetpassword" className="size-[15px]">
          Forget your password
        </LinkButton>
      </div>
    </div>
  );
};

export default Page;
