"use client";
import React from "react";
import { MdEmail, MdLock } from "react-icons/md";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BeatLoader } from "react-spinners";
import { LinkButton, SubmitButton, TextField } from "@/shared";
import { toast } from "react-toastify";
import { SignInResponse, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const UserSchema = z.object({
  email: z.string().email("You must enter a valid Email"),
  password: z.string(),
});

type UserSignInSchemaType = z.infer<typeof UserSchema>;

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserSignInSchemaType>({ resolver: zodResolver(UserSchema) });

  const router = useRouter();
  const onSubmit: SubmitHandler<UserSignInSchemaType> = async (formData) => {
    const res: SignInResponse | undefined = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });
    if (res?.error) {
      toast.error(res.error);
    } else {
      return router.push("/");
    }
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
        <SubmitButton
          isLoading={isSubmitting}
          loadingIndicator={<BeatLoader color="#36d7b7" size={10} />}
          variant="contained"
          label="Sign In"
          
        />
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
